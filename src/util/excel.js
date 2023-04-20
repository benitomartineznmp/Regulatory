const ExcelJS = require('exceljs')
import LOG from '../commons/logger'

export const createExcel = async () => {
  LOG.info('SERVICE: Starting createExcel method')
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('My Sheet')
    // creacion de columnas
    worksheet.columns = [{ header: 'Name', key: 'id', width: 30 }]
    const data = [{ id: 'mi nombre' }, { id: 'mi nombre' }, { id: 'mi nombre' }]
    // llenar data
    worksheet.addRows(data)
    // almacenamos el excel
    await workbook.xlsx.writeFile('./csv/prueba2.csv')
    // almacenar especificamente

    LOG.info('SERVICE: End createExcel method')
  } catch (error) {
    LOG.error('ERROR: End createExcel method ', error)
  }
}
export default null
