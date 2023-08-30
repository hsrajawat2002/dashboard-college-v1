const express= require('express');
const userRouter = require('./routes/userRoute');
const loginRouter = require('./routes/signInRoute');
const adminRouter = require('./routes/adminRoute');
const adminLoginRouter = require('./routes/adminRegister');
const cors= require('cors');
const cookieParser=require('cookie-parser');
require("./db/conn");
const app= express();
const {Server} = require("socket.io"); 
const messageModel = require('./Schemas/messageSchema');


const server = require('http').createServer(app);

const io = new Server(server , { 
    cors : {
        origin : "http://localhost:3000",
        // credentials:true
    }
})

const room="discussion";
io.on("connection" ,async(socket) =>{
    socket.on('join_room' ,() =>{
        socket.join(room);
        // console.log("recieved");

        getmessage().catch((err) => console.log(err));
        
        async function getmessage(){
            const messageAll = await messageModel.find().sort({createtAt:-1}).limit(200);
            socket.emit("messages-all" ,messageAll);
        ;}

    });
    

    socket.on("send-message",async(data)=>{
        const newmessage= new messageModel(data);
        await newmessage.save();
        io.in(room).emit("recieve-message",data); 
    });
});

//--------------------


app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}));

// app.use(cors({
//     origin:"https://api.parser.name"
// }));

app.use(cookieParser()); 

app.use(loginRouter);
app.use(adminLoginRouter);
app.use("/user",userRouter);
app.use("/admin",adminRouter);

server.listen(3001,()=>{
    console.log("listening on server 3001");
});