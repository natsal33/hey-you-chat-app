import React, { Component, useState } from "react";
import AuthHelperMethods from "../Provider/AuthHelperMethods";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const Auth = new AuthHelperMethods();
  const navigation = new useNavigate();

  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/signup", {
        username: username,
        password: password,
      })
      .then((data) => {
        console.log(data);
        navigation("/login", { replace: true });
      });
  };

  return (
    <React.Fragment>
      <div className="main-wrapper">
        <div className="box">
          <div className="box-header">
            <h1>Signup</h1>
          </div>
          <form className="box-form">
            <input
              className="form-item"
              placeholder="Username"
              name="username"
              type="text"
              onChange={updateUsername((e) => e.target.value)}
            />
            <input
              className="form-item"
              placeholder="Password"
              name="password"
              type="password"
              onChange={updatePassword((e) => e.target.value)}
            />
            <button className="form-submit" onClick={handleFormSubmit}>
              Signup
            </button>
          </form>
          <Link className="link" to="/login">
            Already have an account? <span className="link-signup">Login</span>
          </Link>
        </div>
        <div className="signiture">
          <h1>Template Built & Designed by Roman Chvalbo</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
