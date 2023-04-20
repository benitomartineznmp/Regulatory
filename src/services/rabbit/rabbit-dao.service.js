const { RabbitDAO } = require('../../dao/rabbit/rabbit.dao')

const { rabbitReporte, rabbitReporteEscucha } = require('../../dto/rabbit.dto')

const inputReport = new RabbitDAO(rabbitReporte)
const inputReportEscucha = new RabbitDAO(rabbitReporteEscucha)

export const RabbitDAOService = {
  inputReport,
  inputReportEscucha
}

export default null
