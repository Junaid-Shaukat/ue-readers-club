import express from "express";
import { createUser ,getUser} from "../controlers/usercontroler.js";

const router = express.Router();
router.post("/create", createUser);
router.get("/findbyid/:userId", getUser);
export { router as userRoute };
