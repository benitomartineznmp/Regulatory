import LOG from '../../commons/logger'
import { RabbitDAOService } from './rabbit-dao.service'

const consumeQueuReporte = async body => {
  LOG.info('SERVICE: Starting consumeQueuReporte method')
  try {
    // debemos escribir el credito en la cola
    await RabbitDAOService.inputReport.publishMessage(body)
    LOG.info('SERVICE: Ending consumeQueuReporte method')
  } catch (e) {
    LOG.error('ERROR en la method consumeQueuReporte: ', e)
  }
}

export const rabbitMangosta = {
  consumeQueuReporte
}

export default null
