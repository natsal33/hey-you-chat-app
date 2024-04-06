import { React, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ChatBox from "../Components/ChatBox.jsx";

export function loader() {
  async function message_user_loading() {
    const messages_url = "http://localhost:5001/api/get-messages";
    const messages_response = await axios.post(messages_url, { username: "" });
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

  async function send_message(message_data) {
    socketInstance.emit("message", message_data);
  }

  async function update_messages(message_data) {
    const send_message_url = "http://localhost:5001/api/send-message";
    await axios.post(send_message_url, {
      username: message_data["username"],
      message: message_data["message"],
    });

    const messages_url = "http://localhost:5001/api/get-messages";
    const new_message_response = await axios.post(messages_url, {
      username: "",
    });
    const new_message_data = new_message_response.data;

    const users_url = "http://localhost:5001/api/get-all-users";
    const new_users_response = await axios.get(users_url);
    const new_users_data = new_users_response.data;

    const new_chat_data = { users: new_users_data, messages: new_message_data };
    update_chat_data(new_chat_data);
  }

  useEffect(() => {
    const socket = io.connect("http://localhost:5001");
    console.log("Are we connected? ", socket.connected);

    setSocketInstance(socket);

    socket.on("after connect", (data) => {
      //flash "USER has connected"
      console.log(data);
    });
    socket.on("after disconnect", (data) => {
      console.log(data);
    });
    socket.on("after message", (data) => {
      update_messages(data);
      console.log(data);
    });
    socket.on("connect_error", (data) => {
      console.log("ERROR: ", data);
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <ChatBox chat_data={chat_data} send_message={send_message} />
    </div>
  );
}

export default Chat;
