import LOG from '../commons/logger'
import { CODE_INTERNAL_SERVER_ERROR } from '../commons/constants'
import { get } from '../dao/elastic/ealasticSearch'
import {
  InternalServerException,
  createMessageError
} from '../commons/exceptions'

export const savePeople = async data => {
  try {
    let response = ''
    return response
  } catch (error) {
    LOG.error('ERROR: End reportesPrimero method ', error)
    throw new InternalServerException(
      createMessageError(CODE_INTERNAL_SERVER_ERROR, { text: error.message })
    )
  }
}
export const catalogoServices = {
  savePeople
}

export default null
