// import {createContext, useContext, useEffect, useState} from 'react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// const ChatContext =createContext()


// const ChatProvider=({children})=>{
//     const [user, setUser]= useState()
//     const history= useHistory()

//     useEffect(()=>{
//      const userInfo=  JSON.parse (localStorage.getItem("userInfo"))
// setUser(userInfo);

// if(!userInfo){
//     history.push("/")
// }
//     },[history])
//     return (
//     <ChatContext.Provider value={{user, setUser}}> 
//     {children} 
//     </ChatContext.Provider>
//     )
// }

// export const ChatState=()=>{
//     return useContext (ChatContext);
// }
// export default ChatProvider
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

     return (
    <ChatContext.Provider value={{user,setUser,selectedChat, setSelectedChat,chats, setChats}}> 
    {children} 
    </ChatContext.Provider>
    )
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;