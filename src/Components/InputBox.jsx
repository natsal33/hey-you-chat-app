import { React, useState } from "react";
import "./InputBox.css";

function InputBox(props) {
  const [message, updateMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    props.send({
      username: "Natalie!",
      message: message,
    });
    updateMessage("");
  }

  return (
    <div className="message-input-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => updateMessage(e.target.value)}
          placeholder="Type your message..."
          value={message}
        ></input>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default InputBox;
