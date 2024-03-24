import { 
  FormControl, 
  Input, 
  VStack,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button
} from '@chakra-ui/react'

import React, { useState } from 'react'

const SignUp = () => {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [show, setShow]=useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmpassword]=useState("")
  const [pic, setPic] = useState("")
  const [picLoading, setPicLoading]=useState(false)  

  const handleClick = () => setShow(!show);
  const submitHandler = ()=>{}

  return (
    <VStack spacing="5px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter tour name'
          onChange={(e)=>setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>

    </VStack> 
    )
}

export default SignUp