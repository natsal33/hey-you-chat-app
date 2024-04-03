import { React, useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../Components/ChatBox.jsx";
import AuthHelperMethods from "../Components/AuthHelperMethods.js";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export function loader() {
  async function message_user_loading() {
    const messages_url = "http://localhost:5000/api/get-messages";
    const messages_response = await axios.post(messages_url, { username: "" });
    const messages_data = messages_response.data;

    const users_url = "http://localhost:5000/api/get-all-users";
    const users_response = await axios.get(users_url);
    const users_data = users_response.data;
    return { messages: messages_data, users: users_data };
  }

  return message_user_loading();
}

function Chat() {
  // Retrieves initial data from db from loader function
  const loader_data = useLoaderData();
  const [chat_data, update_chat_data] = useState(loader_data);

  // function handles sending of a message and updating chat messages shown
  async function send_message(message_data) {
    // posts new message to db
    const send_message_url = "http://localhost:5000/api/send-message";
    await axios.post(send_message_url, {
      username: message_data["username"],
      message: message_data["message"],
    });

    // retrieves new messages
    const messages_url = "http://localhost:5000/api/get-messages";
    const new_message_response = await axios.post(messages_url, {
      username: "",
    });
    const new_message_data = new_message_response.data;

    // retrievees new users
    const users_url = "http://localhost:5000/api/get-all-users";
    const new_users_response = await axios.get(users_url);
    const new_users_data = new_users_response.data;

    // updates chat data to reflect new users and messages
    const new_chat_data = { users: new_users_data, messages: new_message_data };
    update_chat_data(new_chat_data);
  }

  return <ChatBox chat_data={chat_data} send_message={send_message} />;
}

export default Chat;
