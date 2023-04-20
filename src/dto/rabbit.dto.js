import cfenv from 'cfenv'
import LOG from '../commons/logger'
import {
  AMQP_URI,
  AMQP_CERTIFICATE,
  AMQP_HAS_CERTIFICATE,
  AMQP_IS_RABBIT_SERVICE,
  AMQP_PP_MESSAGES_REPORTE_EXCHANGE,
  AMQP_PP_MESSAGES_REPORTE_QUEUE,
  AMQP_PP_MESSAGES_REPORTE_QUEUE_ESCUCHA
} from '../commons/constants'

const appEnv = cfenv.getAppEnv()

const RabbitConfiguration = class {
  constructor(
    url,
    exchange,
    queueIn,
    queueOut,
    queueType,
    services,
    optionsRabbit,
    isRabbitService
  ) {
    this._url = url
    this._exchange = exchange
    this._queueIn = queueIn
    this._queueOut = queueOut
    this._queueType = queueType
    this._optionsRabbit = optionsRabbit
    this._rabbitService = isRabbitService
    this.getUrl(services)
  }

  getUrl(services) {
    if (this._rabbitService === true) {
      // eslint-disable-next-line prefer-destructuring
      const rabbitServices = services['p.rabbitmq']
      if (rabbitServices !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        const credentials = rabbitServices[0].credentials.protocols.amqp
        LOG.info(`CredentialsRabbit: ${credentials.uri}`)
        this._url = credentials.uri
      }
    }
  }

  get url() {
    return this._url
  }

  set url(url) {
    this._url = url
  }

  get exchange() {
    return this._exchange
  }

  set exchange(exchange) {
    this._exchange = exchange
  }

  get queueIn() {
    return this._queueIn
  }

  set queueIn(queueIn) {
    this._queueIn = queueIn
  }

  get queueOut() {
    return this._queueOut
  }

  set queueOut(queueOut) {
    this._queueOut = queueOut
  }

  get queueType() {
    return this._queueType
  }

  set queueType(queueType) {
    this._queueType = queueType
  }

  get optionsRabbit() {
    return this._optionsRabbit
  }

  set optionsRabbit(optionsRabbit) {
    this._optionsRabbit = optionsRabbit
  }

  get rabbitService() {
    return this._rabbitService
  }

  set rabbitService(rabbitService) {
    this._rabbitService = rabbitService
  }
}

const getRabbitOptions = (isRabbitCertificate, certificate) => {
  if (isRabbitCertificate === true || isRabbitCertificate === 'true') {
    return {
      ca: [Buffer.from(certificate, 'base64')]
    }
  }
  return {}
}

// MEtodos de Queeu
const inputReport = () => {
  LOG.debug(`Configuration: ${AMQP_PP_MESSAGES_REPORTE_QUEUE}`)
  const rabbitOpts = getRabbitOptions(AMQP_HAS_CERTIFICATE, AMQP_CERTIFICATE)
  const rabbitConfig = new RabbitConfiguration(
    AMQP_URI,
    AMQP_PP_MESSAGES_REPORTE_EXCHANGE,
    AMQP_PP_MESSAGES_REPORTE_QUEUE,
    AMQP_PP_MESSAGES_REPORTE_QUEUE,
    'direct',
    appEnv.services,
    rabbitOpts,
    AMQP_IS_RABBIT_SERVICE
  )
  return rabbitConfig
}
const inputReportEscucha = () => {
  LOG.debug(`Configuration: ${AMQP_PP_MESSAGES_REPORTE_QUEUE}`)
  const rabbitOpts = getRabbitOptions(AMQP_HAS_CERTIFICATE, AMQP_CERTIFICATE)
  const rabbitConfig = new RabbitConfiguration(
    AMQP_URI,
    AMQP_PP_MESSAGES_REPORTE_EXCHANGE,
    AMQP_PP_MESSAGES_REPORTE_QUEUE_ESCUCHA,
    AMQP_PP_MESSAGES_REPORTE_QUEUE_ESCUCHA,
    'direct',
    appEnv.services,
    rabbitOpts,
    AMQP_IS_RABBIT_SERVICE
  )
  return rabbitConfig
}

const rabbitReporte = inputReport()
const rabbitReporteEscucha = inputReportEscucha()

Object.freeze(rabbitReporte)
Object.freeze(rabbitReporteEscucha)

module.exports = {
  rabbitReporte,
  rabbitReporteEscucha
}
