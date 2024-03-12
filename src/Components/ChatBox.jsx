import { React, useState, useContext, useLayoutEffect } from "react";
import axios from "axios";
import InputBox from "./InputBox";
import UsersBox from "./UsersBox";
import MessageBoard from "./MessageBoard";
import "./ChatBox.css";

function ChatBox() {
  const [messages, updateMessages] = useState();
  useLayoutEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    const messages_url = "http://localhost:5000/api/get-messages";
    const response = await axios.post(messages_url, { username: "" });
    const response_messages = response.data;
    updateMessages(response_messages);
  }

  const takeInputMessage = (inMessage) => {
    let oldMessages = messages;
    oldMessages.push({ name: inMessage.name, message: inMessage.message });
  };
  return (
    <div className="chat-box">
      <UsersBox />
      <div className="message-input-box">
        <MessageBoard messages={messages} />
        <InputBox send={takeInputMessage} />
      </div>
    </div>
  );
}

export default ChatBox;
