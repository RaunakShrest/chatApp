const e = require("express");
const expressAsyncHandler = require("express-async-handler");
const { chats } = require("../data/data");
const Chat= require("../models/chatModel");
const User = require("../models/userModel");


const accessChat= expressAsyncHandler(async(req,res)=>{
//if the chat with the userId exists then return it otherwise create a chat with this userID 
const{userId}=req.body


if(!userId){
    console.log("UserId param not send with request")
    return res.sendStatus(400)
}

var isChat= await Chat.find({
    isGroupChat:false,
    $and:[
        {users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:userId}}},
    ]

}).populate("users","-password").populate("latestMessage")
isChat= await User.populate(isChat,{
    path:'latestMessage.sender',
    select:"name pic email",
})
if(isChat.length>0){
    res.send(isChat[0])
} else{
    var chatData={
        chatName:"sender",
        isGroupChat: false,
        users:[req.user._id, userId]
    }
    try {
        const createdChat=await Chat.create(chatData)

        const FullChat= await Chat.findOne({_id:createdChat._id}).populate("users","-password")
    res.status(200).send(FullChat)
    } 
    
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

}

})
module.exports= {accessChat};