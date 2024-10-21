import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongodbconnection=async ()=>{

    try{
        await mongoose.connect("mongodb+srv://waqar:waqar@cluster0.htbdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected to data base");

    }catch (err)
    {
        console.log("data base connection error",err)
    }
}

export default mongodbconnection