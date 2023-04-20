import LOG from '../commons/logger'
import { CODE_INTERNAL_SERVER_ERROR } from '../commons/constants'
import { get } from '../dao/elastic/ealasticSearch'
import {
  InternalServerException,
  createMessageError
} from '../commons/exceptions'

const getBPByEncoded = async data => {
  LOG.info('SERVICE: Starting getBPByEncoded method', data)
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            term: {
              encodedKey: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('mng_buscar_cliente', body)
    LOG.infoJSON(
      'SERVICE: Starting getBPByEncoded method',
      response.hits[0]._source
    )
    return response.hits[0]._source
  } catch (error) {
    LOG.error('ERROR: End getBPByEncoded method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const getBPByData = async data => {
  LOG.info('SERVICE: Starting getBPByData method', data)
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            term: {
              _id: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('md_sap_clientes', body)
    LOG.infoJSON(
      'SERVICE: Starting getBPByData method',
      response.hits[0]._source
    )
    //return response.hits[0]._source
    const xd = {
      DatosCliente: {
        ApellidoPaterno: 'CARRASCO',
        ActividadEconomica: 'INDUSTRIA DEL PAPEL',
        NegocioPropio: 'No',
        Municipio: 'ALVARO OBREGON',
        NumInterior: '343',
        SueldoMensual: 50000,
        Sexo: 'H',
        Calle: 'CALLE 2',
        EstadoCivil: 'Soltero/a',
        Sector: 'COMERCIO AL POR MENOR',
        EntreCalle2Ofi: 'CALLE 4',
        Curp: 'MAOB990318HMCRSN04',
        EntreCalle1: 'CALLE 3',
        LotePila: '10',
        ApellidoMaterno: 'LOPE',
        TipoVivienda: 'Propia',
        Localidad: 'DISTRITO FEDERAL, DF',
        TiempoViviendoDomicilioActual: '20100101',
        CalleNeg: '345345345',
        Telefono: '5554236666',
        SegundoNombre: 'EDUARDO',
        Pais: 'México',
        Ocupacion: 'Empleado o Asalariado',
        Nombre: 'EDUARDO',
        NumExt: '305',
        Rfc: 'MAOB9903183',
        Colonia: 'LOMAS DE TARANGO',
        PiRiesgo: '30.00000',
        FechaNacimiento: '1999-03-18',
        Extension: '345',
        Cp: '01620',
        EntreCalle1Ofi: 'CALLE 2',
        CapacidadPago: 1000,
        NumInt: '513',
        CorreoElectronico: 'ecarrasco.pv@hotmail.com',
        EntreCalle2: 'CALLE 3',
        RecursosProcedenciaLegal: 'No',
        ParentescoPpe: 'No',
        PaisNacimiento: 'MX',
        EntidadNacimiento: 'DF',
        ActuaPorCuentaPropia: 'No',
        StatusKo: 'N/A',
        NombreNegocio: 'CHELAS BAR',
        Estado: 'Ciudad de México',
        Ppe: 'No',
        NumBp: '7999991033',
        FechaIngreso: '2010-01-01T06:00:00.000Z',
        ManzanaPila: '5',
        Escolaridad: 'Licenciatura',
        Email: 'ecarrasco.pv@hotmail.com',
        DependientesEconomicos: 0,
        Cliente: 'EDUARDO EDUARDO CARRASCO LOPE',
        Nacionalidad: 'MX',
        Celular: '5588773399',
        TelefonoRecados: '883388838',
        Siva: '1'
      },
      EstadosFinancierosContratos: {
        DeudasBuroCredito: 0,
        Sueldos: 0,
        TotalIngresos: 30000,
        ServiciosPublicos: 0,
        UtilidadBruta: 0,
        OtrosGastos: 0,
        GastosOperativos: 0,
        Compras: 0,
        Estatus: 'Activo',
        Inventario: 0,
        PagosYaRealizados: 0,
        Educacion: 0,
        TotalOtrosIngresos: 0,
        GastosFamiliares: 0,
        VentasMensuales: 0,
        Excedente: 0,
        IngresosMensuales: 30000,
        DeudasNegocio: 0,
        Vestido: 0,
        Renta: 0,
        ImpuestosRetencion: 0,
        Ocupacion: 'Empleado o Asalariado',
        TotalGastos: 0,
        Alimentacion: 0
      },
      '@timestamp': '2020-10-19T05:00:00.000Z',
      '@version': '1'
    }
    return xd
  } catch (error) {
    LOG.error('ERROR: End getBPByData method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const getNacionalidad = async data => {
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            match: {
              clave_de_pais: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('mng_catalogo_nacionalidad', body)
    return response
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const getActividadEconomica = async data => {
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            match: {
              descripcion: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('mng_catalogo_giro', body)
    return response.hits[0]._source
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const getColonia = async data => {
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            match: {
              codigo_postal: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('mng_catalogo_colonias', body)
    return response.hits[0]._source
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}
const getLocalidad = async data => {
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            match: {
              clave_de_pais: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('mng_catalogo_nacionalidad', body)
    return response
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

const getMunicipio = async data => {
  try {
    let response = ''
    // preparamos la query
    const body = {
      query: {
        bool: {
          must: {
            match: {
              clave_de_pais: data
            }
          }
        }
      }
    }
    // consultamos a elastic
    response = await get('mng_catalogo_nacionalidad', body)
    return response
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

export const catalogoServices = {
  getNacionalidad,
  getActividadEconomica,
  getLocalidad,
  getMunicipio,
  getColonia,
  getBPByEncoded,
  getBPByData
}

export default null
