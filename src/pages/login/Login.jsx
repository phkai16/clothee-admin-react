import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../service/api.user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully!");
    } else if (isError) {
      toast.error("Some thing went wrong...");
    }

    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isSuccess, isError, token]);
  return (
    <div className="login" style={{ backgroundImage: "url(/login-bg.jpg)" }}>
      <div className="modal">
        <div className="form">
          <div className="loginLogo">
            <img className="loginLogoImg" src="/logo.png" alt="" />
            <h1 className="loginLogoName">Clothee Admin</h1>
          </div>
          <input
            className="formInput"
            type="text"
            placeholder="Enter username..."
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="formInput"
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btnLogin"
            disabled={isLoading}
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
