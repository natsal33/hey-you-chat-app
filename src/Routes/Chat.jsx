import React from "react";
import axios from "axios";
import ChatBox from "../Components/ChatBox.jsx";
import { Link, useLoaderData } from "react-router-dom";

export function loader() {
  async function message_user_loading() {
    const messages_url = "http://localhost:5000/api/get-messages";
    const messages_response = await axios.post(messages_url, { username: "" });
    const messages_data = messages_response.data;
    console.log("MESSAGES DATA: ", messages_data);

    const users_url = "http://localhost:5000/api/get-all-users";
    const users_response = await axios.get(users_url);
    const users_data = users_response.data;
    console.log("USERS DATA: ", users_data);
    return { messages: messages_data, users: users_data };
  }

  return message_user_loading();
}

function Chat() {
  const chat_data = useLoaderData();
  return <ChatBox chat_data={chat_data} />;
}

export default Chat;
