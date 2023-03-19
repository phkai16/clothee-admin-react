import React from "react";
import { Link } from "react-router-dom";
import "./error.css";
const ErrorPage = () => {
  return (
    <div className="error-container">
      <img
        src="/error-page.jpg"
        alt=""
        style={{ height: 550, marginTop: "40px" }}
      />
      <Link to="/">
        <button className="btn">Back to Homepage</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
