import { RabbitDAOService } from './rabbit-dao.service'
import { rabbitCliente } from './rabbit-queuesender.service'

const initQueue = async () => {
  await RabbitDAOService.inputReport.consumeMessage(
    rabbitCliente.consumeQueueReporte
  )
}

export const RabbitQueueCliente = { initQueue }

export default null
