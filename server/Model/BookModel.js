import mongoose from "mongoose";

const BookSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    genre:{
        type:String,
        require:true,
    },
    shortdescription:{
        type:String,
        require:true,
    },
    longdescription:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    imageurls:{
        type:String,
        require:true,
    },
    tags:{
        type:String,
        require:true,
    },
    clicks:{
        type:Number,
        default: 0, 
        
    },
    user_id_in_view: [
        { type: String }  // Array of user IDs (from Clerk) who liked the comment
    ],


},{timestamps:true})

const Bookmodel=mongoose.model("book",BookSchema)
export  default Bookmodel