import path from "path"
import { foodProps } from "../controllers/food.controller"
import FoodModal, { FoodProps } from "../models/food"
import fs from 'fs'


class FoodService{
    async GetItem(){
        try{
            const data=await FoodModal.find({})
            
            if(!data){
                return null
            }
            
            return data
        }catch{
            return null
        }
    }
    async CreatedItem({title,description,ingredients,steps,image,category}:foodProps):Promise<boolean>{
        try{
            const data= new FoodModal({title,description,ingredients,steps,image,category})
            await data.save()
            return true
        }catch{
            return false
        }
    }
    async Updateditem(id:string,updates:FoodProps):Promise<boolean>{
        try{
            
            await FoodModal.findByIdAndUpdate(id,updates)
            return true
        }catch{
            return false
        }
    }
    async DeleteItem(id:string){
        try{
            const data:any=await FoodModal.findById(id)
            const deleteItem=await FoodModal.findByIdAndDelete(id)
            
            if(!deleteItem){
                return false
            }
            return data
        }catch{
            return false
        }
    }
    async FindById(id:string){
        try{
            const data=[]
            data.push(await FoodModal.findById(id))
           
            
            if(!data){
                return false
            }
            return data
        }catch{
            return false
        }
    }
}
export default new FoodService()