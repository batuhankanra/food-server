import logger from "../lib/logger";
import { Response,Request,NextFunction } from "express";



export function routeNotFound(req:Request,res:Response,next:NextFunction):void{
    const error = new Error('Route not found')
    logger.error(String(error))
     res.status(404).json({ error:error.message })
     return

}