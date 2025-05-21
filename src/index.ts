import express from 'express'
import logger from './lib/logger'
import { db } from './lib/db'
import { routeNotFound } from './middleware/routeNotFound'
import { loggingHandler } from './middleware/loggingHandler'
import router from './router/index.route'
import { config } from './config'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'


export const app=express()
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
app.use(loggingHandler)
// Render.com'da frontend'inizin URL'sini buraya ekleyin
// Örnek: https://my-food-app-frontend.onrender.com
const allowedOrigins = [
    'https://food-client-d9or.onrender.com/',
    // Eğer lokalde de test ediyorsanız:
    'http://localhost:5173', // Vite'ın varsayılan geliştirme portu
    'http://localhost:3000'  // React'in varsayılan geliştirme portu
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Eğer origin, izin verilenler listesindeyse veya origin yoksa (mobil uygulamalar/Postman gibi)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // İzin verilen HTTP metotları
    allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen başlıklar
    credentials: true // Eğer çerezler veya kimlik doğrulama tokenları gönderiyorsanız
};

app.use(cors(corsOptions));
app.use('/api',router)

app.use(routeNotFound)

const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
logger.info('------------------------------------------')
logger.info('Start server')
logger.info('------------------------------------------')
app.listen(config.PORT,()=>logger.info(`server is running:${config.PORT}`))