import LOG from '../../commons/logger'
import {
  ELASTIC_HOST,
  ELASTIC_USER,
  ELASTIC_PASS
} from '../../commons/constants'

const { Client } = require('@elastic/elasticsearch')

const esUrl = ELASTIC_HOST

const client = new Client({
  node: esUrl,
  auth: {
    username: ELASTIC_USER,
    password: ELASTIC_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})
const infElastic = async () => {
  LOG.info('SERVICE: Starting infElastic method')
  client
    .info()
    .then(response => console.log(response))
    .catch(error => console.error(error))
}

export const get = async (index, data, size = 10) => {
  LOG.info('SERVICE: Starting elastic method')
  try {
    const { body } = await client.search({
      index,
      size,
      body: data
    })
    LOG.info('End elastic method total de data obtenida: ', body.hits.total)
    return body.hits
  } catch (error) {
    LOG.error('ERROR elastic method: ', error)
  }
}

export default null
