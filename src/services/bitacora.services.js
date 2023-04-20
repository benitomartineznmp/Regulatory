import moment from 'moment'
import LOG from '../commons/logger'
import {
  InternalServerException,
  createMessageError
} from '../commons/exceptions'
import { CODE_INTERNAL_SERVER_ERROR } from '../commons/constants'

const registroBitacora = (campo, msg) => {
  LOG.info('SERVICE: Starting registroBitacora method', campo, msg)
  try {
    let response = ''
    const dataBitacora = {
      fecha: moment().format(),
      campo,
      error: msg
    }
    console.log('##############ERROR PARA BITACORA#################3')
    console.log('##################################################3')
    console.log('##################################################3')
    console.log('##################################################3')
    console.log(dataBitacora)
    console.log('##################################################3')
    console.log('##################################################3')
    console.log('##################################################3')
    response = dataBitacora
    return response
  } catch (error) {
    LOG.error('ERROR: End registroBitacora method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}

export const bitacoraServices = {
  registroBitacora
}

export default null
