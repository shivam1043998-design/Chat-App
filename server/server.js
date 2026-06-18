import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from 'express'
import 'dotenv/config'
import http from'http'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import  {Server} from "socket.io"

//create express app from http server

const app = express()
const server = http.createServer(app)

//initialize socket.io server
export const io = new Server(server , {
    cors : {origin: "*"}
})

//store online  users
export const userSocketMap = {} // { userId : socketId}

//Socket.io connection handler
io.on("connection" , (socket)=>{
    const userId = socket.handshake.query.userId
    console.log("User Connected" , userId)

    if(userId) userSocketMap[userId] = socket.id

    // Emit online users to  all  connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect" , ()=>{
        console.log("User Disconnection" , userId)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

//Middleware setup
app.use(express.json({limit: "4mb"}))
app.use(cors())

//routes setup
app.use("/api/status", (req,res)=>res.send("server is live"))
app.use('/api/auth' , userRouter)
app.use("/api/messages" , messageRouter)

//connect to mongodb
await connectDB()

if(process.env.NODE_ENV !== "production"){
    const PORT =process.env.PORT || 5000
server.listen(PORT,()=>console.log("server is running on port:"+PORT))

}

// export server for vercel
export default server

