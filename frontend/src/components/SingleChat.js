import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text, Spinner, FormControl, Input } from '@chakra-ui/react'
import React from 'react'
import { getSender,  getSenderFull} from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModel'
import UpdateGroupChatModel from './miscellaneous/UpdateGroupChatModel'

import { useState } from 'react'
const SingleChat = ({fetchAgain, setFetchAgain}) => {
  
  const [messages, setMessages]= useState() // contains all of the fetched messages from the backend


const[loading, setLoading]= useState(false)
const[newMessage, setNewMessage]= useState()


  const {user, selectedChat, setSelectedChat}=ChatState()
  
  const sendMessage=()=>{

  }

  const typingHandler=()=>{

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
  h="100%"
  borderRadius="lg"
  overflowY="hidden"

  

/>




     <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
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
             <></>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
            
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
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