import _ from 'lodash'
import LOG from '../commons/logger'
import { Response } from '../commons/response'
import { CODE_INTERNAL_SERVER_ERROR } from '../commons/constants'
import {
  BadRequestException,
  ConflictException,
  InternalServerException,
  CommonException
} from '../commons/exceptions'
import { MESSAGES } from '../commons/messages'

module.exports = (res, e) => {
  LOG.info('Starting handlerError. method')
  LOG.error(`error: ${JSON.stringify(e)}`)
  let statusCode = 500
  let message
  if (e instanceof CommonException) {
    message = e.message
    LOG.debug(`StatusCode: ${statusCode}`)
    LOG.error(`message: ${message}`)
    return Response.createResponse(
      res,
      statusCode,
      '',
      CODE_INTERNAL_SERVER_ERROR
    )
  }

  if (e instanceof BadRequestException) statusCode = 400
  if (e instanceof ConflictException) statusCode = 409
  if (e instanceof InternalServerException) statusCode = 500

  const { code, mergeVariables } = e
  LOG.debug(`code: ${code}`)
  LOG.debug(`mergeVariables: ${mergeVariables}`)
  const { template, description } = MESSAGES[code]
  const compiled = _.template(template)

  LOG.debug(`mergeVariables: ${mergeVariables}`)
  message = compiled(mergeVariables)
  LOG.debug(`message: ${message}`)
  LOG.debug(`description: ${description}`)

  LOG.info('Ending handlerError. method')
  return Response.createResponseHandlerError(res, statusCode, {
    code,
    message,
    description
  })
}
