import { React } from "react";
import InputBox from "./InputBox";
import UsersBox from "./UsersBox";
import MessageBoard from "./MessageBoard";
import { useNavigate } from "react-router-dom";
import AuthHelperMethods from "./AuthHelperMethods";
import "./ChatBox.css";

function ChatBox(props) {
  const chat_data = props.chat_data;
  const send_message = props.send_message;

  const navigate = useNavigate();
  const Auth = new AuthHelperMethods();

  const handleLogout = () => {
    Auth.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="box">
      <div className="box-header">
        <h3>Chat</h3>
      </div>
      <div className="chat-box">
        <UsersBox users={chat_data["users"]} />
        <div className="message-input-box">
          <MessageBoard chat_data={chat_data} />
          <InputBox send_message={send_message} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
