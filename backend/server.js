//every time you make changes to this file you need to restart the server
const express= require("express")
const {chats}= require("./data/data");
const dotenv= require("dotenv");
const connectDB = require("./config/db");
const colors= require("colors")
const userRoutes= require("./routes/userRoutes")
const chatRoutes= require("./routes/chatRoutes")
const messageRoutes= require("./routes/messageRoutes")
const {notFound,errorHandler}=require("./middlewares/errorMiddleware")

dotenv.config();
connectDB()
const app= express()


app.use(express.json()) // to accept JSON DATA
app.get("/",(req,res)=>{
res.send("API is Running");
});


app.use('/api/user',userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound) // if all of the above url does not exist its gonna fall to this function
app.use(errorHandler)

const PORT= process.env.PORT || 5000
const server=app.listen(5000, console.log(`Sever started on PORT: ${PORT}`.blue.bold));

const io= require('socket.io')(server,{
pingTimeout: 60000, // amount of time it will wait till it goes off/ if for 60 seconds the user doesnt send any message than its gonna close the  connection to save the bandwidth
    cors:{
        origin:"http://localhost:3000",
    }
})
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id)
    socket.emit("connected");
  });

  socket.on('join chat',(room)=>{

    socket.join(room)
    console.log("User joined room:" +room)
  })

   socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });


})