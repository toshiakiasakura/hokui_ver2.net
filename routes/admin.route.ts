import express, { Request, Response} from 'express'
const router = express.Router()
import { AdminController } from '../api/controllers/admin.controller'

router.get('/user', AdminController.UserBoard)
router.get('/user/:id', AdminController.UserDetail)
router.get('/approve/:id', AdminController.changeApproveStatus)
router.get('/delete/:id', AdminController.deleteUser)
router.get('/change-admin/:id', AdminController.changeAdminStatus)

router.get('*', (req:Request, res:Response) => {
  res.json({status:404})
})
export { router as adminRouter }
