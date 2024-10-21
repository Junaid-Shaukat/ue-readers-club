import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongodbconnection=async ()=>{

    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to data base");

    }catch (err)
    {
        console.log("data base connection error",err)
    }
}

export default mongodbconnection