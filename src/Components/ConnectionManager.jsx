import React from "react";
import { socket } from "../socket.jsx";

export function ConnectionManager() {
  function connect() {
    socket.connect();
    console.log("in connected: ", socket.connected);
  }

  function disconnect() {
    socket.disconnect();
    console.log("in disconnected: ", socket.connected);
  }

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
