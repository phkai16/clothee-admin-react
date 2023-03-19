import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../service/api.user";
import "./navbar.css";

export default function Navbar() {
  const currentUser = useSelector((state) => state.user);
  const [info, setInfo] = useState({
    username: currentUser.username,
    img: currentUser.img || "",
  });
  const { data, isLoading, isSuccess } = useGetUserQuery(currentUser.id, {
    skip: !currentUser.id,
  });
  useEffect(() => {
    console.log(data);
    console.log(isSuccess);
    if (isSuccess) {
      setInfo({
        username: data.username,
        img: data.img || "",
      });
    }
  }, [isSuccess]);
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="topLeft">
          <Link to="/" className="linkNav">
            <img className="logo-img" src="/logo.png" alt="" />
            <span className="logo">Clothee Admin</span>
          </Link>
        </div>
        <div className="topRight">
          <Link to="/profile" className="linkNav">
            {isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <p style={{ marginRight: "10px", textTransform: "capitalize" }}>
                Welcome, {info.username}
              </p>
            )}
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <img
                src={info.img || "/blank-profile-picture.png"}
                alt=""
                className="topAvatar"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
