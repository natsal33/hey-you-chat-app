import React from "react";
import { Outlet } from "react-router-dom";
import "./Root.css";

function Root() {
  return (
    <div className="Root">
      <h1 className="title">Hey You!</h1>
      <Outlet />
    </div>
  );
}

export default Root;
