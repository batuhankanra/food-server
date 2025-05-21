import mongoose from "mongoose"
import logger from "./logger"
import { config } from "../config"


export const db=async ()=>{
    try{
        await mongoose.connect(config.DB_URL)
        logger.info('mongo db connect')
    }catch (err){
        console.log(err)
    }
}
