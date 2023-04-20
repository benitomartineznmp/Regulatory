import LOG from '../../commons/logger'
import Rabbit from '../../commons/rabbit'

const RabbitDAO = class {
  constructor(rabbitDto) {
    this._rabbitDto = rabbitDto
  }

  async createConnection() {
    if (!this._rbconnection) {
      this._rbconnection = new Rabbit(this._rabbitDto)
      await this._rbconnection.createConnection()
    }
  }

  async publishMessage(message) {
    const messageOut = JSON.stringify(message)
    await this.createConnection()
    this._rbconnection.publisher.sendToQueue(
      this._rbconnection._queueOut,
      Buffer.from(messageOut)
    )
    LOG.debugJSON('Mensaje publicado en Queue', message)
  }

  // region dealy
  async publishMessageDelay(message, milliseconds = 900000) {
    const messageOut = JSON.stringify(message)
    await this.createConnection()
    this._rbconnection.publisher.sendToQueue(
      this._rbconnection._queueOut,
      Buffer.from(messageOut),
      { expiration: milliseconds }
    )

    LOG.debugJSON('Mensaje con delay publicado en Queue', message)
  }
  // EndRegion Delay

  ackMessage(message) {
    LOG.debug('AcknowledgeMessage')
    this._rbconnection.consumer.ack(message)
  }

  nackMessage(message) {
    LOG.debug('NacknowledgeMessage')
    this._rbconnection.consumer.nack(message, false)
  }

  async consumeMessage(callback) {
    LOG.debug(`Inicia configuración: ${this._rabbitDto._queueIn}`)
    await this.createConnection()
    this._rbconnection.consumer.consume(this._rabbitDto._queueIn, async msg => {
      if (msg) {
        await callback(msg, this._rabbitDto._queueIn)
      }
    })
  }
}

module.exports = {
  RabbitDAO
}
