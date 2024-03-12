import { React, useState, useContext, useLayoutEffect } from "react";
import axios from "axios";
import InputBox from "./InputBox";
import UsersBox from "./UsersBox";
import MessageBoard from "./MessageBoard";
import "./ChatBox.css";

function ChatBox(props) {
  const chat_data = props.chat_data;
  console.log("CHAT DATA: ", chat_data);

  const [messages, updateMessages] = useState();
  // useLayoutEffect(() => {
  //   getMessages();s
  // }, []);

  // async function getMessages() {
  //   const messages_url = "http://localhost:5000/api/get-messages";
  //   const response = await axios.post(messages_url, { username: "" });
  //   const response_messages = response.data;
  //   updateMessages(response_messages);
  // }

  const takeInputMessage = (inMessage) => {
    let oldMessages = messages;
    oldMessages.push({ name: inMessage.name, message: inMessage.message });
  };
  return (
    <div className="chat-box">
      <UsersBox users={props.chat_data["users"]} />
      <div className="message-input-box">
        <MessageBoard messages={props.chat_data["messages"]} />
        <InputBox send={takeInputMessage} />
      </div>
    </div>
  );
}

export default ChatBox;
