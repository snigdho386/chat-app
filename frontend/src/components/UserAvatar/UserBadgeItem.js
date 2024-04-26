import { Badge, Box, CloseButton } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  useEffect(() => {
    console.log("Selected users :: ", user);
  }, []);

  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
      display={"flex"}
      alignItems={"center"}
    >
      {user.name}
      <CloseButton pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
