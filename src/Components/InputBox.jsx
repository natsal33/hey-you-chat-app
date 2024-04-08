import { React, useState } from "react";
import "./InputBox.css";

function InputBox(props) {
  const send_message = props.send_message;
  const [message, updateMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    send_message({
      username: localStorage.getItem("username"),
      message: message,
    });

    setIsLoading(false);
  }

  return (
    <div className="message-input-box">
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          className="textbox"
          type="text"
          onChange={(e) => updateMessage(e.target.value)}
          placeholder="Type your message..."
          value={message}
        ></input>
        <input className="send-button" type="submit" value="Send" />
      </form>
    </div>
  );
}

export default InputBox;
