import mongoose from "mongoose";

export interface FoodProps extends mongoose.Document{
    title:string
    description:string
    ingredients:string[]
    steps:string[]
    image:string
    category:string
    createdAt?:Date
    updatedAt?:Date
}

const foodSchema:mongoose.Schema<FoodProps>=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    ingredients:{
        type:[String],
        required:true
    },
    steps:{
        type:[String],
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})



const FoodModal=mongoose.model<FoodProps>('FoodModal',foodSchema)
export default FoodModal