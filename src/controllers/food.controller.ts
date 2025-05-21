import {Request,Response} from 'express'
import logger from '../lib/logger'
import foodService from '../services/food.service'
import { FoodProps } from '../models/food'
import cloudinary from '../config/cloudinary'
import fs from 'fs';
import multer from 'multer'

export interface foodProps{
    title:string
    description:string
    ingredients:string[]
    steps:string[]
    image:string
    category:string
}
class FoodController{
    public async GetItem(req:Request,res:Response){
        try{
            const data=await foodService.GetItem()
            if(!data){
                res.status(404).json({msg:'database problem '})
            }
            res.status(200).json(data)
            
        }catch (err){
            logger.error('getItem food controller error')
            res.status(500).json({msg:'intervanel problem'})
        }
    }
    public async CreatedItem(req:Request,res:Response){
        try{
            const {_id,title,description,ingredients,steps,category}=req.body
         
            if(!title || !description || !ingredients || !steps || !category){
                res.status(400).json({msg:'invalid request'})
            }
            const filePath = req.file?.path

            if (!filePath) {
                 res.status(400).json({ msg: 'Dosya eksik' });
                 return
            }

            const result = await cloudinary.uploader.upload(filePath, {folder: 'food-website'});

            // Geçici dosyayı sil
            fs.unlinkSync(filePath);
            const image=result.secure_url


            const ingredientParse=JSON.parse(ingredients)
            const stepsParse=JSON.parse(steps)
             
            const data=await foodService.CreatedItem({title,description,ingredients:ingredientParse,steps:stepsParse,image,category})

            if(!data){
                res.status(400).json({msg:'hata'})
                return
            }
            res.status(201).json({msg:'Oluşturuldu'})
            return
        }catch (err){
            logger.error('created food controller error')
            res.status(500).json({msg:'intervanel problem'})
        }
    }
    public async updatedItem(req:Request,res:Response){
        try{
             
            const id=req.params.id
            const foodQuery =req.body
            
            const filePath = req.file?.path

           

                const updateds:any={}
                if (filePath) {
                 // 1. Mevcut Cloudinary resmini sil
                if (foodQuery.oldImage) {
                    await cloudinary.uploader.destroy(foodQuery.oldImage);
                }
                const result = await cloudinary.uploader.upload(filePath, {folder: 'food-website'});
                updateds.image=result.secure_url
                    
            }   


                if(foodQuery.title){
                    updateds.title=foodQuery.title
                }
                if(foodQuery.description){
                    updateds.description=foodQuery.description
                }
                if(foodQuery.ingredients){
                    const ingredientParse=JSON.parse(foodQuery.ingredients)

                    updateds.ingredients=ingredientParse
                }
                if(foodQuery.steps){
                    const stepsParse=JSON.parse(foodQuery.steps)
                    
                     updateds.steps=stepsParse
                }
                if(foodQuery.category){
                    updateds.category=foodQuery.category
                }
                

            
            const data=await foodService.Updateditem(id,updateds)
            if(!data){
                res.status(404).json({msg:'tarif bulunamadi '})
            }
            res.status(200).json({msg:'Basarili'})
            return 
        }catch (err){
            logger.error('updated food controller error')
            res.status(500).json({msg:'intervanel problem'})
        }
    }
    public async DeletedItem(req:Request,res:Response){
        try{
            const id=req.params.id
            const data=await foodService.DeleteItem(id)
            if(!data){
                res.status(404).json({msg:'tarif bulunamadi '})
            }
             await cloudinary.uploader.destroy(`food-website${data.image.split('food-website')[1].split('.')[0]}`);
            res.status(200).json({msg:'Basarili'})
            return 
        }catch (err){
            logger.error('created food controller error')
            res.status(500).json({msg:'intervanel problem'})
        }
    }
    public async FindById(req:Request,res:Response){
        try{
            const id=req.params.id
            const data=await foodService.FindById(id)
            if(!data){
                res.status(404).json({msg:'tarif bulunamadi '})
            }
            res.status(200).json({data})
            return 
            
        }catch (err){
            logger.error('created food controller error')
            res.status(500).json({msg:'intervanel problem'})
        }
    }
    
}

export default new FoodController()