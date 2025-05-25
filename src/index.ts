import express from 'express'
import logger from './lib/logger'
import { db } from './lib/db'
import { routeNotFound } from './middleware/routeNotFound'
import router from './router/index.route'
import { config } from './config'
import cors from 'cors'


export const app=express()

app.use(cors({origin: ['https://food-client-d9or.onrender.com/','https://food-client-d9or.onrender.com/tarifAdmin'], // Frontend uygulamanızın çalıştığı adres
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Eğer cookie'ler veya kimlik doğrulama token'ları kullanıyorsanız
  optionsSuccessStatus: 204}));

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