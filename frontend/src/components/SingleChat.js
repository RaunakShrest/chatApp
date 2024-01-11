import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender,  getSenderFull} from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModel'

const SingleChat = ({fetchAgain, setFetchAgain}) => {
  
  
  const {user, selectedChat, setSelectedChat}=ChatState()
  
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
             {/* <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                  </>)}
    
    </Text> </>) :(
    
    <Box d= "flex" alignItems="center" justifyContent="center" h="100%">
<Text fontSize="6x1" pb={3} fontFamily="Work sans">
    Click on the user to start chatting
</Text>



    </Box>
)
    }
</>
}

export default SingleChat