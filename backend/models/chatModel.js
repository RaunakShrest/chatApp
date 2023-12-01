const mongoose= require('mongoose')

const chatModel= mongoose.Schema({

    chatName:{type: String, trim: true},
    isGroupChat:{type:Boolean, default:false},
    users:[{
        type:mongoose.Schema.Types.ObjectId, //contains id to the particular user
   ref:"User",

   
    }],
    latestMessage: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message", // model for message
        
    },
    groupAdmin:{
          type:mongoose.Schema.Types.ObjectId,
            ref:"User",
    }
},
{
    timestamps:true, // if new chat is added it creates a time stamp
}
)
const Chat= mongoose.model("Chat", chatModel);

module.exports= Chat;