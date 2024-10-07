import express from "express";
import {signup , login , getuserdetails} from "../controllers/authController.js"
const router = express.Router();

router.post('/signup', signup);
router.post('/login' , login)
router.get('/getuserdetails' , getuserdetails)
const authrouter = router
export default authrouter