import { React } from "react";
import InputBox from "./InputBox";
import UsersBox from "./UsersBox";
import MessageBoard from "./MessageBoard";
import "./ChatBox.css";

function ChatBox(props) {
  const chat_data = props.chat_data;
  const send_message = props.send_message;

  return (
    <div className="chat-box">
      <UsersBox users={chat_data["users"]} />
      <div className="message-input-box">
        <MessageBoard chat_data={chat_data} />
        <InputBox send={send_message} />
      </div>
    </div>
  );
}

export default ChatBox;
