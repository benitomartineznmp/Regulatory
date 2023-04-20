import amqp from 'amqp-connection-manager'
import LOG from './logger'

class Rabbit {
  constructor(rabbitDto) {
    this._url = rabbitDto.url
    this._exchange = rabbitDto.exchange
    this._options = rabbitDto.optionsRabbit
    this._queueIn = rabbitDto.queueIn
    this._queueOut = rabbitDto.queueOut
    this._queueType = rabbitDto.queueType || 'direct'
  }

  async createConnection() {
    if (!this._connection) {
      this._connection = await amqp.connect(this._url, this._options)
      await this.createConsumer()
      await this.createPublisher()
    }
  }

  async createConsumer() {
    if (!this._consumer) {
      const channel = await this._connection.createChannel()
      channel.assertExchange(this._exchange, this._queueType, {
        durable: true
      })
      channel.assertQueue(this._queueIn)
      LOG.info(`Consumer: ${this._queueIn} creado`)
      this._consumer = channel
    }
  }

  async createPublisher() {
    if (!this._publisher) {
      const channel = await this._connection.createChannel()
      channel.assertQueue(this._queueOut)
      this._publisher = channel
      LOG.info(`Publisher: ${this._queueOut} creado`)
    }
  }

  get publisher() {
    return this._publisher
  }

  set publisher(publisher) {
    this._publisher = publisher
  }

  get consumer() {
    return this._consumer
  }

  set consumer(consumer) {
    this._consumer = consumer
  }

  get connection() {
    return this._connection
  }

  set connection(connection) {
    this._connection = connection
  }
}

module.exports = Rabbit
