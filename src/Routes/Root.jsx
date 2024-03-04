import React from "react";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="App">
      <h1>Hey, You!</h1>
      <Outlet />
    </div>
  );
}

export default Root;
