import {Router} from 'express'
import foodRouter from './food.route'

const router=Router()

router.use('/food',foodRouter)

export default router