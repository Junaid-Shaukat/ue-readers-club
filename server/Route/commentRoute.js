import express from "express";
const router = express.Router();
import {createcomment,deletecomment,getAllComments ,getcommentById,getcommentByBookId,editCommentById ,likes} from "../controlers/commentcontroler.js"; 

router.post("/likes/:commentId",likes);
router.post("/createcomment",createcomment ); 
router.put("/editCommentById/:id",editCommentById ); 
router.delete("/deletecomment/:id",deletecomment ); 
router.put("/editCommentById/:id",editCommentById ); 
router.get("/getcommentByBookId/:id",getcommentByBookId ); 
router.get("/getAllComments",getAllComments ); 
router.get("/getcommentById/:id",getcommentById );
export { router as commentRoute };
