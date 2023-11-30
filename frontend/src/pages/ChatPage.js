import axios from 'axios';
import React, { useState, useEffect } from "react";

const ChatPage = () => {
    const [chats, setChats] = useState([])

const fetchChats= async ()=>{
    const {data}= await axios.get('/api/chat');
    console.log(data)
    setChats(data)
}
useEffect(()=>{ // useEffect is a hook in react which runs when component is renderd for the first time
fetchChats()
},[])

  return (
    <div>
        {chats.map(chat=>
        <div key={chat._id}>{chat.chatName} 
        </div>)}
  
    </div>


  )
}

export default ChatPage