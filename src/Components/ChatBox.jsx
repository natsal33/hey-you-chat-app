import React from "react";
import InputBox from "./InputBox";
import UsersBox from "./UsersBox";
import MessageBoard from "./MessageBoard";

function ChatBox() {
  return (
    <div>
      <UsersBox />
      <MessageBoard />
      <InputBox />
    </div>
  );
}

export default ChatBox;
