import {
  CODE_SUCCESS,
  CODE_CREATED,
  CODE_NOT_FOUND,
  CODE_BAD_REQUEST,
  CODE_INTERNAL_SERVER_ERROR,
  CODE_INTERNAL_BAD_GETAWAY
} from './constants'
import { MESSAGES } from './messages'
import LOG from './logger'

const createResponse = (res, statusCode, data = {}, code = '') => {
  let info = null
  if (code !== '') {
    const { template: status, description: message } = MESSAGES[code]
    info = { code, status, message }
  }
  const result = info ? { ...data, info } : data
  return res.status(statusCode).send(result)
}

const createResponseForCodeError = (res, statusCode, data = {}, code = '') => {
  let info = null
  if (code !== '') {
    const { description: message } = MESSAGES[code]
    info = { code, message }
  }
  const result = info ? { ...data, error: info } : data
  LOG.debugJSON('result', result)
  return res.status(statusCode).send(result)
}
const createResponseHandlerError = (res, statusCode, data = {}) => {
  const result = { error: data }
  LOG.debugJSON('result', result)
  return res.status(statusCode).send(result)
}

const Ok = (res, data) => {
  const statusCode = 200
  return createResponse(res, statusCode, data, CODE_SUCCESS)
}

const Created = (res, data) => {
  const statusCode = 201
  return createResponse(res, statusCode, data, CODE_CREATED)
}

const BadRequest = (res, data) => {
  const statusCode = 400
  return createResponseForCodeError(res, statusCode, data, CODE_BAD_REQUEST)
}

const NotFound = (res, data) => {
  const statusCode = 404
  return createResponseForCodeError(res, statusCode, data, CODE_NOT_FOUND)
}

const InernalError = (res, data) => {
  const statusCode = 500
  return createResponse(res, statusCode, data, CODE_INTERNAL_SERVER_ERROR)
}

const InernalBadGetaway = (res, data) => {
  const statusCode = 502
  return createResponse(res, statusCode, data, CODE_INTERNAL_BAD_GETAWAY)
}

export const Response = {
  Ok,
  Created,
  BadRequest,
  NotFound,
  InernalError,
  InernalBadGetaway,
  createResponse,
  createResponseHandlerError
}

export default null
