import express from "express"
import { mongoconnect } from "./utils/connectdb.js"
import authrouter from "./routers/authRoute.js"
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

const app = express()
app.use(express.json())
mongoconnect()

app.use('/auth' , authrouter )
app.get('/', (req, res) => {
    res.send('Welcome to the app!');
});

app.listen(3000 , ()=>{
    console.log('server is running on the port 3000')
})
