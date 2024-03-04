import { React, useState } from "react";
import InputBox from "./InputBox";
import UsersBox from "./UsersBox";
import MessageBoard from "./MessageBoard";
import "./ChatUI.css";
import "./ChatBox.css";

function ChatBox() {
  const [messages, updateMessages] = useState([
    { name: "Natalie", message: "Hey, you, How're you doing today?" },
    {
      name: "Sammy",
      message: "I'm pretty hungry today, mom. Where's my breakfast?",
    },
    {
      name: "Ben",
      message: "Don't listen to him, he's already had breakfast this morning!",
    },
    { name: "Sammy", message: "Beeeeeen, don't tell her!!" },
  ]);
  const takeInputMessage = (inMessage) => {
    let oldMessages = messages;
    oldMessages.push({ name: inMessage.name, message: inMessage.message });
  };
  return (
    <div className="chat">
      <UsersBox />
      <div>
        <MessageBoard messages={messages} />
        <InputBox send={takeInputMessage} />
      </div>
    </div>
  );
}

export default ChatBox;
