/* eslint-disable camelcase */
import moment from 'moment'
import LOG from '../commons/logger'
import { CODE_INTERNAL_SERVER_ERROR } from '../commons/constants'
import { get } from '../dao/elastic/ealasticSearch'
import { rabbitMangosta } from './rabbit/rabbit.services'
import { Reportes } from '../models/persona'
import { RULES } from '../validator/rules_client_data'
import {
  InternalServerException,
  createMessageError,
  BadRequestException
} from '../commons/exceptions'
import { catalogoServices } from './catalogos.services'
import { bitacoraServices } from './bitacora.services'

const reportesPrimero = async data => {
  LOG.info('SERVICE: Starting reportesPrimero method', data)
  try {
    const { encodedKey } = data
    // consultar a elastic al mng_buscar clientes
    const numeroBP = await catalogoServices.getBPByEncoded(encodedKey)
    // obtener el numero de BP
    //const { id } = numeroBP
    const id = '7999991033'
    // segunda consulta BP informacion
    const dataBP = await catalogoServices.getBPByData(id)

    // transformar la data BP
    await transformarRegistroBP(dataBP, id)
    /**
     *transformar data credito
     */
    LOG.info('SERVICE: End reportesPrimero method')
    return dataBP
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const transformarRegistroBP = async (data, id) => {
  LOG.info('SERVICE: Starting transformarBP method', data)
  try {
    let response = ''
    // validar reglas genericas
    const transformation = transformarBP(data)
    const persona = await obtenerPersona(transformation, id)
    // validar Campos layout
    // traducir campos
    // Transformar campos
    console.log(
      '###############################################################################3'
    )
    console.log(
      '###############################################################################3'
    )
    console.log(persona)
    console.log(
      '###############################################################################3'
    )
    console.log(
      '###############################################################################3'
    )
    /**
     *Almacenar en elastic la persona
     */
    response = persona
    LOG.infoJSON('SERVICE: Starting getBPByData method', response)
  } catch (error) {
    LOG.error('ERROR: End transformarRegistroBP method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const transformarBP = data => {
  LOG.info('SERVICE: Starting transformarBP method', data)
  try {
    let response = []
    // comensando a trnasformar data
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in data.DatosCliente) {
      const dataFormat = {
        nombre: '',
        value: ''
      }
      // console.log(key)
      const key1 = key.toUpperCase()
      // eslint-disable-next-line no-prototype-builtins
      if (RULES.hasOwnProperty(key1)) {
        const regla = RULES[key1](data.DatosCliente[key])
        dataFormat.nombre = key1
        dataFormat.value = regla
        response.push(dataFormat)
      }
    }
    // ingresos
    const dataIngresos = {
      nombre: 'TOTALINGRESOS',
      value: data.EstadosFinancierosContratos.TotalIngresos
    }
    response.push(dataIngresos)
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    LOG.infoJSON('SERVICE: End transformarBP method', response)
    return response
  } catch (error) {
    LOG.error('ERROR: End transformarBP method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}
const obtenerPersona = async (data, id) => {
  LOG.info('SERVICE: Starting obtenerPersona method', data)
  const persona = new Reportes.People()
  const valores = [
    'RFC',
    'CURP',
    'NOMBRE',
    'SEGUNDONOMBRE',
    'APELLIDOPATERNO',
    'APELLIDOMATERNO',
    'FECHANACIMIENTO',
    'SEXO',
    'ACTIVIDADECONOMICA',
    'PAISNACIMIENTO',
    'CALLE',
    'NUMINTERIOR',
    'NUMEXT',
    'COLONIA',
    'CP',
    'LOCALIDAD',
    'NACIONALIDAD'
  ]
  const segNombre = valorSimple(data, 'SEGUNDONOMBRE')
  const segundoNombre = segNombre ? ` ${segNombre}` : ''
  persona.NOMBRE_PARTNER = `${valorSimple(data, 'NOMBRE')}${segundoNombre}`
  persona.APELLIDO_PATERNO = valorSimple(data, 'APELLIDOPATERNO')
  persona.APELLIDO_MATERNO = valorSimple(data, 'APELLIDOMATERNO')
  persona.RFC = valorSimple(data, 'RFC')
  persona.TIPO_CLIENTE = 2
  persona.GENERO_ACRED = valorSimple(data, 'SEXO')
  //VALIDAR CONTRA CURP Y gENERO
  const { curp, fechaNac } = validarCurpNaci(
    valorSimple(data, 'CURP'),
    persona.RFC,
    persona.GENERO_ACRED,
    valorSimple(data, 'FECHANACIMIENTO')
  )
  persona.CURP = curp
  persona.FECHA_NACIMIENTO = fechaNac

  const { act_banxico } = await catalogoServices.getActividadEconomica(
    valorSimple(data, 'ACTIVIDADECONOMICA')
  )
  persona.ACT_ECONOMICA = act_banxico
  persona.TIPO_ACRED_REL = 1
  persona.PERS_JURIDICA = 2 //validar con Efra si es por nacionalidad
  persona.GRP_RIESGO_COM = `${persona.NOMBRE_PARTNER} ${persona.APELLIDO_PATERNO} ${persona.APELLIDO_MATERNO}`
  persona.CALLE = ajustarCadena(valorSimple(data, 'CALLE'))

  persona.NUM_EXT = ajustarCadena(
    `${valorSimple(data, 'NUMINTERIOR')} ${valorSimple(data, 'NUMEXT')}`
  )

  persona.COLONIA = ajustarCadena(valorSimple(data, 'COLONIA')) // como va
  persona.CODIGO_POSTAL = valorSimple(data, 'CP') //validar con Efra completar con 0 al inicio
  const { localidad } = await catalogoServices.getColonia(persona.CODIGO_POSTAL)
  persona.LOCALIDAD = localidad

  const nat = await catalogoServices.getNacionalidad(
    valorSimple(data, 'NACIONALIDAD')
  )
  const {
    _source: { codigo_iso_numerico }
  } = nat.hits[0]
  persona.NACIONALIDAD = codigo_iso_numerico
  persona.HITSIC = 2
  persona.NUM_TRABAJADORES = 0
  persona.TIPO_ZONA = 1
  persona.INGRESO_MENSUAL = valorSimple(data, 'TOTALINGRESOS')
  persona.MANDT = 330
  persona.FECHA_EJEC = moment().format('DDMMYYYY')
  persona.PARTNER = id
  persona.MUNICIPIO = 'Ecatepec'

  const response = persona
  LOG.infoJSON('SERVICE: End obtenerPersona method', response)
  return response
}

const valorSimple = (data, campo) => {
  LOG.info('SERVICE: Starting valorSimple method', data)
  // eslint-disable-next-line prefer-destructuring
  const response = data.find(e => e.nombre === campo).value
  LOG.infoJSON('SERVICE: End valorSimple method', response)
  return response
}

const ajustarCadena = data => {
  LOG.info('SERVICE: Starting ajustarCadena method', data)
  let response = ''
  data = data.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const pattern = /[\^*@!"#$%&/()=?¡!¿'\\|°¬~_{},.´+<>:;]/gi
  response = data.replace(pattern, '')
  LOG.infoJSON('SERVICE: End ajustarCadena method', response)
  return response
}

const validarCurpNaci = async (curp, rfc, sexo, fechaNac) => {
  LOG.info(
    'SERVICE: Starting validarCurpNaci method',
    curp,
    rfc,
    sexo,
    fechaNac
  )
  rfc = rfc.slice(0, 10)
  const curpRFC = curp.slice(0, 10)
  const curpSexo = RULES['SEXO'](curp[10])
  // validando curp
  if (rfc !== curpRFC || sexo !== curpSexo) {
    LOG.error(
      `Se encontraron errores en la CURP, rfc: ${rfc}, curp: ${curpRFC}, sexo: ${curpSexo}`
    )
    bitacoraServices.registroBitacora(
      'CURP',
      `Se encontraron errores en la CURP, rfc: ${rfc}, curp: ${curpRFC}, sexo: ${curpSexo}`
    )
  }
  // fechanacimiento contra curp y rfc
  const fechaCurp = curp.slice(4, 10)
  const fechaRFC = rfc.slice(4, 10)

  const fechaN = fechaNac.slice(2, fechaNac.length)
  if (fechaCurp !== fechaN || fechaRFC !== fechaN) {
    LOG.error(
      `Se encontraron errores en la fecha de nacimiento: ${fechaNac}, ${rfc}, curp: ${curp} `
    )
    bitacoraServices.registroBitacora(
      'FECHA_NACIMIENTO',
      `Se encontraron errores en la fecha de nacimiento: ${fechaNac}, ${rfc}, curp: ${curp} `
    )
  }
  LOG.infoJSON('SERVICE: End validarCurpNaci method', curp, fechaNac)
  return { curp, fechaNac }
}

/*
const reportesPrimero = async data => {
  LOG.info('SERVICE: Starting reportesPrimero method', data)
  try {
    await rabbitMangosta.consumeQueuReporte({ id: '123' })
    
    const body = {
      query: {
        match_all: {}
      }
    }
    const elastic = await get('md_sap_clientes', body)

    console.log('####')

    for (var key in elastic.hits.hits[0]._source.DatosCliente) {
      //console.log(key)
      const key1 = key.toUpperCase()
      if (RULES.hasOwnProperty(key1)) {
        const regla = RULES[key1](elastic.hits.hits[0]._source.DatosCliente[key])
      }
    }

    console.log('####')

    // obtenemos el tamaño del arregloa
    const tamano = elastic.hits.total
    console.log(tamano)
    
    // formatear el documento
    const arregloPersonar = []

    LOG.info('SERVICE: End reportesPrimero method')
    return arregloPersonar
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}
*/

export const reportesServices = {
  reportesPrimero
}

export default null
