import express from "express"
import {createServer} from 'http'
import {createClient} from 'redis'
import {Server} from 'socket.io'
import { mongoconnect } from "./utils/connectdb.js"
import authrouter from "./routers/authRoute.js"
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})
import client from "./utils/redisClient.js"
import { syncRedisToDatabase } from "./utils/syncRedisToFatabae.js"

const app = express()
const server = createServer(app)
const io = new Server(server , {
    origin : '*',
})

io.on('connection' , (socket)=>{
    console.log('a user connected')
    socket.on("activemessage" , (msg)=>{
        console.log(msg)
        io.emit('group' , msg)
        client.lPush('activemessages' , JSON.stringify(msg) , (err , reply)=>{
            if(err){
                console.log(err)
            }
            console.log(reply)
        })
    })
    socket.on('disconnect', ()=>{
        console.log('socket disconnected')
    })
})
app.use(express.json())
mongoconnect()
setInterval(syncRedisToDatabase , 10000)

app.use('/auth' , authrouter )
app.get('/', (req, res) => {
    res.send('Welcome to the app!');
});

server.listen(3000 , ()=>{
    console.log('server is running on the port 3000')
})
