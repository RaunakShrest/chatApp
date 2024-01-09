//every time you make changes to this file you need to restart the server
const express= require("express")
const {chats}= require("./data/data");
const dotenv= require("dotenv");
const connectDB = require("./config/db");
const colors= require("colors")
const userRoutes= require("./routes/userRoutes")
const chatRoutes= require("./routes/chatRoutes")
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


app.use(notFound) // if all of the above url does not exist its gonna fall to this function
app.use(errorHandler)

const PORT= process.env.PORT || 5000
app.listen(5000, console.log(`Sever started on PORT: ${PORT}`.blue.bold));

