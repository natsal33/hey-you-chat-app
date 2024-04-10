import { React, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ChatBox from "../../Components/ChatBox/ChatBox.jsx";
import "./Chat.css";

export function loader() {
  async function message_user_loading() {
    const messages_url = "http://localhost:5001/api/get-messages";
    const messages_response = await axios.get(messages_url);
    const messages_data = messages_response.data;

    const users_url = "http://localhost:5001/api/get-all-users";
    const users_response = await axios.get(users_url);
    const users_data = users_response.data;
    return { messages: messages_data, users: users_data };
  }

  return message_user_loading();
}

function Chat() {
  const loader_data = useLoaderData();
  const [chat_data, update_chat_data] = useState(loader_data);
  const [socketInstance, setSocketInstance] = useState("");

  async function update_all(message_data) {
    const messages_url = "http://localhost:5001/api/get-messages";
    const new_message_response = await axios.get(messages_url);
    const new_message_data = new_message_response.data;

    const users_url = "http://localhost:5001/api/get-all-users";
    const new_users_response = await axios.get(users_url);
    const new_users_data = new_users_response.data;

    const new_chat_data = {
      users: new_users_data,
      messages: new_message_data,
    };
    update_chat_data(new_chat_data);
  }

  async function update_users() {
    const users_url = "http://localhost:5001/api/get-all-users";
    const new_users_response = await axios.get(users_url);
    const new_users_data = new_users_response.data;
    const new_chat_data = {
      users: new_users_data,
      messages: chat_data["messages"],
    };
    update_chat_data(new_chat_data);
  }

  useEffect(() => {
    const socket = io.connect("http://localhost:5001");

    setSocketInstance(socket);

    socket.on("after connect", (data) => {
      socket.emit("userLogin", "HEY!");
    });

    socket.on("after disconnect", (data) => {
      update_users();
    });

    socket.on("after message", (data) => {
      update_all(data);
    });

    socket.on("update-users", (data) => {
      update_users();
    });

    socket.on("connect_error", (data) => {
      console.log("ERROR: ", data);
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat">
      <ChatBox chat_data={chat_data} socketInstance={socketInstance} />
    </div>
  );
}

export default Chat;
