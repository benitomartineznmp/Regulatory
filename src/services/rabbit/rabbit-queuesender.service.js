import LOG from '../../commons/logger'
import { reportesServices } from '../reportes.services'
import { RabbitDAOService } from './rabbit-dao.service'

const consumeQueueReporte = async msg => {
  LOG.info('SERVICE: Starting consumeQueueReporte method')
  try {
    const message = JSON.parse(msg.content.toString())
    await reportesServices.reportesPrimero(message, '', false)
    RabbitDAOService.inputReport.ackMessage(msg)
    LOG.info('SERVICE: Ending consumeQueueReporte method')
  } catch (e) {
    LOG.error('ERROR en la method consumeQueueReporte: ', e)
  }
}

export const rabbitCliente = {
  consumeQueueReporte
}

export default null
