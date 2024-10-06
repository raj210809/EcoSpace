import express from "express"
import { sendOTP } from "../controllers/otpsender"
export const router = express.Router()
router.post('/send-otp' , sendOTP)