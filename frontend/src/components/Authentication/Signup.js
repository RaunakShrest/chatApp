import { VStack } from '@chakra-ui/layout'
import { FormLabel, FormControl } from '@chakra-ui/react'
import React from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { useState } from 'react'
import { Button } from "@chakra-ui/button";
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Signup = () => {
const [show, setShow] = useState(false)
  const [name, setName] = useState()
   const [email, setEmail] = useState()
    const [password, setPassword] = useState()
     const [confirmpassword, setconfirmpassword] = useState()
      const [pic, setPic] = useState()
const [loading, setLoading]= useState(false)
const toast = useToast()

const history= useHistory()
      const handleClick=()=> setShow(!show);
  
 const postDetails = (pics) => {
  setLoading(true);

  if (pics === undefined) {
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
    toast({
      title: "Please Select a JPEG or PNG Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  const data = new FormData();
  data.append("file", pics); // Check if "file" is the correct key expected by Cloudinary
  data.append("upload_preset", "chat-app");
  data.append("cloud_name", "dboot4gi3");

  axios.post("https://api.cloudinary.com/v1_1/dboot4gi3/image/upload", data) // Update "cloudname" in the URL
    .then((response) => {
      console.log("Cloudinary response:", response);

      if (response.data && response.data.url) {
        setPic(response.data.url.toString());
        toast({
          title: "Image uploaded successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Error uploading image to Cloudinary.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

      setLoading(false);
    })
    .catch((error) => {
      console.log("Cloudinary error:", error);
      toast({
        title: "Error uploading image to Cloudinary.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    });
};


  const submitHandler=async()=>{
    setLoading(true)
    if(!name || !email || !password || !confirmpassword){
      toast({
        title:"Please Fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false)
      return;
    }

    if(password!== confirmpassword){
      toast({
        title:"Passwords donot match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"

      })
      return;
    }
    try {
      const config={
        headers:{
          "Content-type":"application/json",
        }
      }
      const {data} = await axios.post("/api/user",{name,email,password,pic},config)

toast({
  title:"Registration Sucessfull",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
})
localStorage.setItem('userInfo',JSON.stringify(data))
setLoading(false)
history.push('/chats')


    } catch (error) {
      toast({
  title:"Error Occured",
  description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
})
      
    }

  }

      return (
    <VStack spacing='5px ' color="black">

      <FormControl id= "first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter your Name"
        onChange={(e)=>setName(e.target.value)}
/>
      </FormControl>

 <FormControl id= "email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your Email"
        onChange={(e)=>setEmail(e.target.value)}
/>
      </FormControl>

      <FormControl id= "password"isRequired>
        
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show? "text": "password"}placeholder="Enter your Password"
        onChange={(e)=>setPassword(e.target.value)}/>
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide": "Show"}
          </Button>
        </InputRightElement>
</InputGroup>
      </FormControl>

  <FormControl id= "confirm password"isRequired>
        
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input type={show? "text": "password"}placeholder="Enter your Password"
        onChange={(e)=>setconfirmpassword(e.target.value)}/>
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide": "Show"}
          </Button>
        </InputRightElement>
</InputGroup>
      </FormControl>

 <FormControl id= "pic" isRequired>
        
        <FormLabel>Upload your picture</FormLabel>
        <Input type="file"
        p={1.5}
        accept="image/*"
        onChange={(e)=> postDetails(e.target.files[0])}
/>     
        </FormControl>

        <Button colorScheme="blue"
        width="100%"
        style={{marginTop:15}}
        onClick={submitHandler} 
        isLoading={loading}
      > Sign Up
</Button>
    </VStack>
  )
}

export default Signup