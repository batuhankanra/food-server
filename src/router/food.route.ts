import {Router} from 'express'
import upload from '../middleware/multer';
import foodController from '../controllers/food.controller'


const router=Router()

router.get('/',foodController.GetItem)
router.post('/add',upload.single('file'),foodController.CreatedItem)
router.put('/update/:id',upload.single('file'),foodController.updatedItem)
router.delete('/delete/:id',foodController.DeletedItem)
router.get('/:id',foodController.FindById)



export default router