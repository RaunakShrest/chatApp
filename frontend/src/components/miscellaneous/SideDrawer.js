// import React from 'react'
// import { useState } from 'react'
// import {Tooltip } from "@chakra-ui/react"
// import {Box, Text} from "@chakra-ui/layout"
// import { Button } from '@chakra-ui/button'
// const SideDrawer = () => {
//   const[search, setSearch]= useState("")
//   const[searchResult, setsearchResult]= useState([])
//   const [loading, setLoading]= useState(false)
//     const [loadingChat, setLoadingChat]= useState()

//   return <>
// <Box
// d="flex"
// justifyContent="space-between"
// alignItems="center"
// bg="white"
// w="100%"
// p="5px 10px 5px 10px"
// borderWidth="5px">
// <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'></Tooltip>

// <Button variant="ghost">
//   <i class="fas fa-search"></i>
//   <Text d= {{base:"none",md:"flex"}}>
//     Seacrch user
//   </Text>
  

// </Button>
// </Box>


// </>
  
  
// }

import React from 'react';
import { useState } from 'react';
import { Menu, Tooltip, MenuButton, MenuList, MenuItem, MenuDivider, } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { Button } from '@chakra-ui/button';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from '@chakra-ui/avatar';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();


  const {user} = ChatState()
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* Wrap Tooltip around the content */}
       <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i className="fas fa-search"></i>
              <Text d={{ base: "none", md: "flex" }} px={4}>
              Search user
            </Text>
          </Button>
        </Tooltip>

        {/* Adjusted alignment using Tailwind CSS classes */}
        <div className="flex items-center justify-between w-full">
           <Text fontSize="2x1" fontFamily="Work sans" >
            Talk-A-Tive
          </Text>

          <div className="flex items-start">
            <Menu>
              <MenuButton p={1}>
                <BellIcon fontSize="2xl" m={1} />
              </MenuButton>
              {/* {<MenuList> </MenuList>} */}
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size='sm' cursor='pointer' name={user.name}  src={user.pic}/>
  
              </MenuButton>

              <MenuList>
                <ProfileModel user={user}>
                <MenuItem>My profile</MenuItem>
                </ProfileModel>
                <MenuDivider/>
                 <MenuItem>Logout</MenuItem>
             
              
              </MenuList>
            </Menu>
          </div>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
