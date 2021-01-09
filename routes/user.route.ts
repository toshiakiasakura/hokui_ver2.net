/** 
 * Functions after loggin in are placed here.
 */
import express from 'express'
const router = express.Router()
import { UserController } from '../api/controllers/users.controller'

router.get('/profile', UserController.ProfileBoard)
router.post('/profile/edit', UserController.EditProfile)
router.get('/multiple/semester', UserController.SemesterBoard)
router.get('/multiple/file/:title_en/:kind', UserController.FileBoard)
router.post('/upload/file', UserController.UploadFile)
router.get('/delete/file/:id', UserController.DeleteFile)
router.get('/file/:id', UserController.DownloadFile)
router.get('/multiple/notification', UserController.NotificationBoard )
router.get('/multiple/subject', UserController.SubjectBoard)

export { router as userRouter }
