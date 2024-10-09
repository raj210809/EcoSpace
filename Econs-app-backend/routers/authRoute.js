import express from "express";
import {signup , login , getuserdetails, getuserdetail} from "../controllers/authController.js"
const router = express.Router();
import {updateprofilepic} from "../controllers/profileupddater.js"

router.post('/signup', signup);
router.post('/login' , login)
router.get('/getuserdetails' , getuserdetails)
router.get('/getuserdetail' , getuserdetail)
router.put('/updateprofile' , updateprofilepic)
const authrouter = router
export default authrouter