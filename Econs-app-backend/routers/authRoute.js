import express from "express";
import {signup , login , getuserdetails} from "../controllers/authController.js"
const router = express.Router();
import {updateprofilepic} from "../controllers/profileupddater.js"

router.post('/signup', signup);
router.post('/login' , login)
router.get('/getuserdetails' , getuserdetails)
router.put('/updateprofilepic' , updateprofilepic)
const authrouter = router
export default authrouter