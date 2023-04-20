export const {
  env: { CONTEXT_NAME, CONTEXT_VERSION, CERTIFICATE }
} = process

export const {
  env: { TZ = 'America/Mexico_City' }
} = process
// ELASTIC
export const {
  env: { ELASTIC_HOST, ELASTIC_USER, ELASTIC_PASS }
} = process
// RABIT MQ
export const {
  env: {
    AMQP_URI,
    AMQP_USER,
    AMQP_PASSWORD,
    AMQP_CERTIFICATE,
    AMQP_HAS_CERTIFICATE,
    AMQP_MESSAGES_TIMEOUT,
    AMQP_PP_MESSAGES_REPORTE_EXCHANGE,
    AMQP_PP_MESSAGES_REPORTE_QUEUE,
    AMQP_IS_RABBIT_SERVICE,
    AMQP_PP_MESSAGES_REPORTE_QUEUE_ESCUCHA
  }
} = process

// Operation Status
export const CREATED = 'CREATED'
export const SUCCESS = 'SUCCESS'
export const NOT_FOUND = 'NOT FOUND'
export const BAD_REQUEST = 'BAD REQUEST'
export const CONFLICT = 'CONFLICT'
export const INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR'
export const BAD_GATEWAY = 'BAD GATEWAY'
// Operation Code
export const CODE_SUCCESS = 'NMP.REPORTES.200'
export const CODE_CREATED = 'NMP.REPORTES.201'
export const CODE_BAD_REQUEST = 'NMP.REPORTES.400'
export const CODE_NOT_FOUND = 'NMP.REPORTES.404'
export const CODE_CONFLICT = 'NMP.REPORTES.409'
export const CODE_INTERNAL_SERVER_ERROR = 'NMP.REPORTES.500'
export const CODE_INTERNAL_BAD_GETAWAY = 'NMP.REPORTES.502'

export default null
