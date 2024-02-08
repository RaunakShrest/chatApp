import { Box } from '@chakra-ui/react';

import React, { useState, useEffect } from "react";
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import ChatBox from '../components/miscellaneous/ChatBox';
import { MyChats } from '../components/miscellaneous/MyChats';
const ChatPage = () => {
    
  const {user}= ChatState()


  return (
    <div style= {{width:'100%'}}>
      
     {/*if the user is there only render this sidedrawer component*/}
    
{user && <SideDrawer/>}
<Box
d="flex"
justifyContent='space-between'
w='100%'
h='91.5vh'
p='10px'
>
{user && <MyChats/>}
{user && <ChatBox/>}


</Box>


    </div>
  


  )
}

export default ChatPage