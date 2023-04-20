import { reportesServices } from '../services/reportes.services'
import { Response } from '../commons/response'

import LOG from '../commons/logger'

const reporteX = async (req, res) => {
  try {
    const { body } = req
    const data = await reportesServices.reportesPrimero(body)
    const response = Response.Ok(res, { data })
    return response
  } catch (err) {
    LOG.error(err)
  }
}

export const reportes = {
  reporteX
}

export default null
