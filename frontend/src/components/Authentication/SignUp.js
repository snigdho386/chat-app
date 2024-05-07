import {
  FormControl,
  Input,
  VStack,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const imageUploadedHandler = (e) => {
    setPic(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
      return;
    }

    if (password != confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    if (!pic) {
      toast({
        title: `Please select an Image`,
        status: `warning`,
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    if (pic.type == "image/jpeg" || pic.type == "image/png") {
      const formdata = new FormData();
      formdata.append("file", pic);
      formdata.append("upload_preset", "Moshi-Moshi");
      formdata.append("cloud_name", "moshi-moshi-app");

      const requestOptions = {
        method: "POST",
        body: formdata,
      };

      await fetch(
        "https://api.cloudinary.com/v1_1/moshi-moshi-cloud/image/upload/",
        requestOptions
      ).then(async (resPic) => {
        resPic = await resPic.json();

        let picStr = JSON.stringify(resPic.url);
        setPic(picStr);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const res = await axios.post(
            "/api/user",
            {
              name,
              email,
              password,
              picStr,
            },
            config
          );

          console.log(res);
          if (res.status) {
            toast({
              title: "Registration successful",
              status: "success",
              duration: 5000,
              position: "top-right",
              isClosable: true,
            });

            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setLoading(false);
            navigate("/chats");
          }
        } catch (e) {
          console.log("Error :: ", e);
        }
      });
    } else {
      toast({
        title: `Please select an Image`,
        status: `warning`,
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter tour name"
          onChange={(e) => setName(e.target.value)}
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
        <Input type="file" p={1.5} onChange={(e) => imageUploadedHandler(e)} />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
