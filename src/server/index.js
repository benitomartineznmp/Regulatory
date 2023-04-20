import express from 'express'
import bodyParser from 'body-parser'

import cors from 'cors'
import cfenv from 'cfenv'
import LOG from '../commons/logger'
import router from '../routes/index'
import { CONTEXT_NAME, CONTEXT_VERSION } from '../commons/constants'
import { RabbitQueueCliente } from '../services/rabbit/rabbit-dispatch.service'

const appEnv = cfenv.getAppEnv()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

const corsOptionsDelegate = (req, callback) => {
  const regex = new RegExp('(http|https)://[A-Za-z0-9-.]+.nmp.com.mx')
  const corsOptions = regex.test(req.header('Origin'))
    ? { origin: true }
    : { origin: false }
  callback(null, corsOptions)
}
app.use(cors(corsOptionsDelegate))
app.use(`/${CONTEXT_NAME}/${CONTEXT_VERSION}`, router)

app.listen(PORT, () => {
  LOG.info(`server running on ${appEnv.url}/${CONTEXT_NAME}/${CONTEXT_VERSION}`)
})

RabbitQueueCliente.initQueue()

module.exports = app
