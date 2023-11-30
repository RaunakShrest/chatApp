//every time you make changes to this file you need to restart the server
const express= require("express")
const {chats}= require("./data/data");
const dotenv= require("dotenv")

const app= express()
dotenv.config();
app.get("/",(req,res)=>{
res.send("API is Running");
});

app.get('/api/chat',(req,res)=>{

    res.send(chats)
})

app.get('/api/chat/:id',(req,res)=>{
 //console.log(req.params.id)
 const singleChat=chats.find((c)=>c._id===req.params.id)
 res.send(singleChat)
})

const PORT= process.env.PORT || 5000
app.listen(5000, console.log(`Sever started on PORT: ${PORT}`));

