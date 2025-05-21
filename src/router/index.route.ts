import {Router} from 'express'
import foodRouter from './food.route'

const router=Router()

router.use('/food',foodRouter),
router.get('/',(req,res)=>{
    res.json({msg:'sa'})
})

export default router