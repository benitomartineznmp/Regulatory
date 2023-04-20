import fetch from 'node-fetch'
import https from 'https'
import LOG from '../commons/logger'

import {
  InternalServerException,
  CommonException,
  createMessageError
} from '../commons/exceptions'

const agent = new https.Agent({ rejectUnauthorized: false })

const parseResponse = res => {
  const { status } = res
  if (status && status === 204) return res
  const responseJson = res
    .json()
    .then(responseBody => ({
      responseBody,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers.raw()
    }))
    .catch(() => ({
      responseBody: {},
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers.raw()
    }))
  return responseJson
}

export const HttpMethod = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const sendRequest = async ({
  url,
  method,
  body = null,
  headers = {},
  isHttps = true,
  showBody = true
}) => {
  LOG.debug('SERVICE: Starting sendRequest method')

  LOG.debug(`URL: ${url}`)
  LOG.debug(`Method: ${method}`)
  LOG.debugJSON('Headers', headers)

  if (showBody) {
    LOG.debugJSON('Body', body)
  } else {
    LOG.debug('Body: { ... }')
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  if (
    (method === HttpMethod.POST ||
      method === HttpMethod.PUT ||
      method === HttpMethod.PATCH) &&
    options.headers['Content-Type'] === 'application/json'
  ) {
    options.body = JSON.stringify(body || {})
  } else options.body = body

  if (isHttps) options.agent = agent
  try {
    const { responseBody, ok, status } = await fetch(url, options).then(
      parseResponse
    )
    if (!ok || showBody) {
      LOG.debugJSON('Response', responseBody)
    } else {
      LOG.debug('Response: { ... }')
    }

    if (!ok) {
      throw new CommonException(
        createMessageError(null, null, status, responseBody)
      )
    }
    return responseBody
  } catch (err) {
    LOG.error(`JsonError: ${JSON.stringify(err)}`)
    if (err instanceof CommonException) {
      throw err
    } else if (err instanceof InternalServerException) {
      throw new InternalServerException(
        createMessageError('NMP.CRD.500', { text: err.message })
      )
    } else {
      throw new CommonException(
        createMessageError(null, null, err, 'Error al invocar servicio')
      )
    }
  } finally {
    LOG.debug('SERVICE: Ending sendRequest method')
  }
}
