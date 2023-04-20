import log4JS from 'log4js'
import httpContext from 'express-http-context'
import { createLogger, format, transports } from 'winston'
import newrelicFormatter from '@newrelic/winston-enricher'

const timezoned = () =>
  new Date().toLocaleString('es-MX', {
    timeZone: process.env.TZ
  })

const logger = createLogger({
  level: process.env.LOG_LEVEL.toLowerCase() || 'debug',
  maxsize: 5242880, // 5MB
  format: format.combine(
    newrelicFormatter(),
    format.timestamp({ format: timezoned }),
    format.prettyPrint()
  ),
  transports: [new transports.Console()]
})

log4JS.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d{ISO8601}] [%x{id}]%] [%[%-4.5p%]] - [%[%-10c%]] %m',
        tokens: {
          id: () => httpContext.get('reqId') || ''
        }
      }
    },
    reportes: {
      type: 'file',
      filename: './logs/api.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{ISO8601}] [%x{id}]%] [%[%-4.5p%]] - [%[%-10c%]] %m',
        tokens: {
          id: () => httpContext.get('reqId') || ''
        }
      }
    }
  },
  categories: {
    default: {
      appenders: ['out', 'reportes'],
      level: process.env.LOG_LEVEL || 'debug'
    }
  }
})

const LOG = log4JS.getLogger('reportes')
LOG.level = process.env.LOG_LEVEL || 'debug'
LOG.traceJSON = (message, json) => {
  if (LOG.isDebugEnabled()) {
    LOG.trace(`${message}: ${JSON.stringify(json)}`)
    logger.debug(`${message}: ${JSON.stringify(json)}`)
  }
}

LOG.debugJSON = (message, json) => {
  if (LOG.isDebugEnabled()) {
    LOG.debug(`${message}: ${JSON.stringify(json)}`)
    logger.debug(`${message}: ${JSON.stringify(json)}`)
  }
}

LOG.infoJSON = (message, json) => {
  if (LOG.isInfoEnabled()) {
    LOG.info(`${message}: ${JSON.stringify(json)}`)
    logger.info(`${message}: ${JSON.stringify(json)}`)
  }
}

module.exports = LOG
