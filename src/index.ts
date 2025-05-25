import express from 'express'
import logger from './lib/logger'
import { db } from './lib/db'
import { routeNotFound } from './middleware/routeNotFound'
import router from './router/index.route'
import { config } from './config'
import cors from 'cors'


export const app=express()

app.use(cors({origin: true,credentials: true}));

logger.info('------------------------------------------')
logger.info('Initializing Api')
logger.info('------------------------------------------')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
logger.info('------------------------------------------')
logger.info('Mongo datebase')
logger.info('------------------------------------------')
db()
logger.info('------------------------------------------')
logger.info('Loggin & configuration')
logger.info('------------------------------------------')


app.use('/api',router)

app.use(routeNotFound)


logger.info('------------------------------------------')
logger.info('Start server')
logger.info('------------------------------------------')
app.listen(config.PORT,()=>logger.info(`server is running:${config.PORT}`))