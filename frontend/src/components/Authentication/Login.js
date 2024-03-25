import { React,useState } from 'react';

import {
    Button,
    Input,
    InputGroup, 
    InputRightElement,
    VStack ,
    FormControl, 
    FormLabel,
    useToast
  } 
  from '@chakra-ui/react'

const Login = () => {

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);




  return (
    <VStack spacing="10px">
    <FormControl id="email" isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
        value={email}
        type="email"
        placeholder="Enter Your Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <Button
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }}
      // onClick={submitHandler}
      isLoading={loading}
    >
      Login
    </Button>
    <Button
      variant="solid"
      colorScheme="red"
      width="100%"
      onClick={() => {
        setEmail("guest@example.com");
        setPassword("123456");
      }}
    >
      Get Guest User Credentials
    </Button>
  </VStack>
  )
}

export default Login