import express from "express";
import { GoogleSignIn, Signup, signin } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", Signup)
router.post("/signin", signin)
router.post("/googleSignIn", GoogleSignIn)  

export default router;