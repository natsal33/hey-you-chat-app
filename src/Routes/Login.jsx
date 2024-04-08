import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AuthHelperMethods from "../Components/AuthHelperMethods";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const Auth = new AuthHelperMethods();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    Auth.login(username, password)
      .then((res) => {
        if (res.authorized === false) {
          return alert(res.message);
        }
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="main-wrapper">
        <div className="login-box">
          <div className="box-header">
            <h3>Login</h3>
          </div>
          <form className="box-form" method="post" onSubmit={handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Username"
              name="username"
              type="text"
            />
            <input
              className="form-item"
              placeholder="Password"
              name="password"
              type="password"
            />
            <button className="form-submit" type="submit">
              Login
            </button>
          </form>
          <Link className="link" to="/signup">
            Don't have an account? <span className="link-signup">Signup</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
