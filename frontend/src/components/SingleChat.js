import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getSender,  getSenderFull} from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModel'
import UpdateGroupChatModel from './miscellaneous/UpdateGroupChatModel'
import './styles.css'
import { useState } from 'react'
import axios from 'axios'
import ScrollableChat from './ScrollableChat'

import io from 'socket.io-client'
const ENDPOINT= "http://localhost:5000";
var socket, selectedChatCompare


const SingleChat = ({fetchAgain, setFetchAgain}) => {
  
  const [messages, setMessages]= useState() // contains all of the fetched messages from the backend

const[socketConnected, setSocketConnected]=useState(false)
const[loading, setLoading]= useState(false)
const[newMessage, setNewMessage]= useState()

const toast= useToast()
  const {user, selectedChat, setSelectedChat}=ChatState()
   const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages)
      setMessages(data);
      setLoading(false);
      socket.emit('join chat',selectedChat._id)

      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
    useEffect(()=>{

    socket= io(ENDPOINT)
    socket.emit("setup",user)
    socket.on('connection',()=>setSocketConnected(true))
  }, [user])


 useEffect(() => {
    fetchMessages();

   selectedChatCompare= selectedChat
    // eslint-disable-next-line
  }, [selectedChat]); // whenever selectedChat changes its gonna fetch again

useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

//   useEffect(() => {
//   socket.on("message received", (newMessageReceived) => {
//     if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
//       // This message is not for the current chat, you can handle it as needed
//     } else {
//       setMessages([...messages, newMessageReceived]);
//     }
//   });
// }, [selectedChatCompare, messages]);


 const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };





  const typingHandler=(e)=>{
    setNewMessage(e.target.value)

  }
    return <>{
selectedChat?(<>
<Text
fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center">
     <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ?(<>
            
            
            {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}/>
            
            </>):(<>{selectedChat.chatName.toUpperCase()}
             <UpdateGroupChatModel
            
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                  </>)}
    
    </Text>


     <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="scroll"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
             <div className="messages">

              <ScrollableChat messages={messages}/>


             </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
            
            <Input
    
    bg="transparent"
    placeholder="Enter a message.."
    value={newMessage}
    onChange={typingHandler}
    style={{
        position: 'fixed',
        top: '659px',
        left: '33%'
    }}
/>

            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  
};
export default SingleChat