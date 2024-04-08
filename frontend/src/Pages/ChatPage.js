import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    // const {data} = await axios.get("/api/chat");
    // console.log("Chats :: ", data);
    // setChats(data);
  };

  return <div>ChatPage</div>;
};

export default ChatPage;
