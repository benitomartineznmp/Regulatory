import moment from 'moment'
import LOG from '../commons/logger'
import { bitacoraServices } from '../services/bitacora.services'

export const RULES = {
  RFC: value => {
    LOG.info('SERVICE: Starting RFC method', value)
    if (value.length === 10) value = `${value}333`
    if (value.length < 13 || value.length > 13) {
      LOG.error(`Se encontro un error en el RFC ${value}`)
      bitacoraServices.registroBitacora(
        'RFC',
        `Se encontro un error en el RFC ${value}`
      )
    }
    LOG.info('SERVICE: End RFC method', value)
    return value
  },
  CURP: value => {
    LOG.info('SERVICE: Starting CURP method', value)
    LOG.info('SERVICE: End CURP method', value)
    return value
  },
  NOMBRE: value => {
    LOG.info('SERVICE: Starting NOMBRE method', value)
    value = value.toUpperCase()
    LOG.info('SERVICE: End NOMBRE method', value)
    return value
  },
  SEGUNDONOMBRE: value => {
    LOG.info('SERVICE: Starting SEGUNDONOMBRE method', value)
    if (value.length <= 0) value = ''
    value = value.toUpperCase()
    LOG.info('SERVICE: End SEGUNDONOMBRE method', value)
    return value
  },
  APELLIDOPATERNO: value => {
    LOG.info('SERVICE: Starting APELLIDOPATERNO method', value)
    value = value.toUpperCase()
    LOG.info('SERVICE: End APELLIDOPATERNO method', value)
    return value
  },
  APELLIDOMATERNO: value => {
    LOG.info('SERVICE: Starting APELLIDOMATERNO method', value)
    if (value.length <= 0) value = 'XXXXX'
    value = value.toUpperCase()
    LOG.info('SERVICE: End APELLIDOMATERNO method', value)
    return value
  },
  FECHANACIMIENTO: value => {
    LOG.info('SERVICE: Starting FECHANACIMIENTO method', value)
    const formato = 'YYYYMMDD'
    value = moment(value).format(formato)
    LOG.info('SERVICE: End FECHANACIMIENTO method', value)
    return value
  },
  SEXO: value => {
    LOG.info('SERVICE: Starting SEXO method', value)
    if (value === 'H') {
      value = 2
    } else if (value === 'M') {
      value = 1
    } else {
      value = 0
    }
    LOG.info('SERVICE: End SEXO method', value)
    return value
  },
  ACTIVIDADECONOMICA: value => {
    LOG.info('SERVICE: Starting ACTIVIDADECONOMICA method', value)
    LOG.info('SERVICE: End ACTIVIDADECONOMICA method', value)
    return value
  },
  PAISNACIMIENTO: value => {
    LOG.info('SERVICE: Starting PAISNACIMIENTO method', value)
    LOG.info('SERVICE: End PAISNACIMIENTO method', value)
    return value
  },
  CALLE: value => {
    LOG.info('SERVICE: Starting CALLE method', value)
    value = value.toUpperCase()
    LOG.info('SERVICE: End CALLE method', value)
    return value
  },
  NUMINTERIOR: value => {
    LOG.info('SERVICE: Starting NUMINTERIOR method', value)
    LOG.info('SERVICE: End NUMINTERIOR method', value)
    return value
  },
  NUMEXT: value => {
    LOG.info('SERVICE: Starting NUMEXT method', value)
    LOG.info('SERVICE: End NUMEXT method', value)
    return value
  },
  COLONIA: value => {
    LOG.info('SERVICE: Starting COLONIA method', value)
    LOG.info('SERVICE: End COLONIA method', value)
    return value
  },
  CP: value => {
    LOG.info('SERVICE: Starting CP method', value)
    if (value.length !== 5) {
      const ceros = 5 - value.length
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ceros; i++) {
        value = `0${value}`
      }
    }
    LOG.info('SERVICE: End CP method', value)
    return value
  },
  LOCALIDAD: value => {
    LOG.info('SERVICE: Starting LOCALIDAD method', value)
    LOG.info('SERVICE: End LOCALIDAD method', value)
    return value
  },
  NACIONALIDAD: value => {
    LOG.info('SERVICE: Starting NACIONALIDAD method', value)
    LOG.info('SERVICE: End NACIONALIDAD method', value)
    return value
  },
  TOTALINGRESOS: value => {
    LOG.info('SERVICE: Starting TOTALINGRESOS method', value)
    LOG.info('SERVICE: End TOTALINGRESOS method', value)
    return value
  }
}

export default null
