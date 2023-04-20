import { Router } from 'express'
import { reportes } from '../controller/reportes.controller'

const router = Router()

router.route('/reportex').get(reportes.reporteX)

export default router
