import logger from "../lib/logger";
import { Request,Response,NextFunction } from "express";


export function loggingHandler(req:Request,res:Response,next:NextFunction){
logger.info('------------------------------------------')

    logger.info(`Incoming Methods:${req.method} - URL : ${req.url} - IP:${req.socket.remoteAddress}`)
    res.on('finish',()=>{
       if(res.statusCode>205){
        logger.error(`Incoming - Method :[${req.method}] - URL: [${req.url}] - IP:[${req.socket.remoteAddress}]--Status:[${res.statusCode}]`)
       }else{
        logger.info(`Incoming - Method :[${req.method}] - URL: [${req.url}] - IP:[${req.socket.remoteAddress}]--Status:[${res.statusCode}]`)
       }
    })
    logger.info('------------------------------------------')

    next()
}