import { React, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ChatBox from "../Components/ChatBox.jsx";
import { ConnectionManager } from "../Components/ConnectionManager.jsx";

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
  const [buttonStatus, setButtonStatus] = useState(false);
  const [socketInstance, setSocketInstance] = useState("");

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  async function send_message(message_data) {
    console.log("Entered send_message function");

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
    if (buttonStatus === true) {
      console.log("CONNECTED");
      const socket = io.connect("http://localhost:5001");
      console.log("Are we connected? ", socket.connected);

      setSocketInstance(socket);

      socket.on("after connect", (data) => {
        console.log("connect data: ", data);
      });
      socket.on("after disconnect", (data) => {
        console.log("disconnect data: ", data);
      });
      socket.on("after message", (data) => {
        console.log("message data: ", data);
      });
      socket.on("connect_error", (data) => {
        console.log("ERROR: ", data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [buttonStatus]);

  return (
    <div>
      {!buttonStatus ? (
        <button onClick={handleClick}>turn chat on</button>
      ) : (
        <>
          <button onClick={handleClick}>turn chat off</button>
          <ChatBox chat_data={chat_data} send_message={send_message} />
        </>
      )}
    </div>
  );
}

export default Chat;
