import { React } from "react";
import InputBox from "../InputBox/InputBox";
import UsersBox from "../UsersBox/UsersBox";
import MessageBoard from "../MessageBoard/MessageBoard";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./ChatBox.css";

function ChatBox(props) {
  const chat_data = props.chat_data;
  const socketInstance = props.socketInstance;

  return (
    <div className="box">
      <div className="box-header">
        <h3 className="subheader">Chat</h3>
      </div>
      <div className="chat-box">
        <UsersBox users={chat_data["users"]} />
        <div className="messages-box">
          <MessageBoard chat_data={chat_data} />
          <InputBox socketInstance={socketInstance} />
        </div>
      </div>
      <LogoutButton socketInstance={socketInstance} />
    </div>
  );
}

export default ChatBox;
