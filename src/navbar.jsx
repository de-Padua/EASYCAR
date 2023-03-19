import React from "react";
import "./App.css";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function navbar({ onlineUser, handleExitUser }) {
  console.log(onlineUser);

  const handlePath = onlineUser ? "/userProfile" : "/userAuth";
  const exitButton = onlineUser ? <h5 className="exit-btn"> Log out </h5> : "";

  return (
    <div className="navbar">
      <div className="logo">
        <span>EASY</span>
        <span>CAR</span>
      </div>
      <div className="links-buttons">
        <div className="links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/cataloge" className="link">
            Cataloge
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
        </div>

        <Link to={handlePath}>
          <div className="link-btn">
            {" "}
            <BsFillPersonFill className="btn-icon" />
          </div>
        </Link>
        <div
          onClick={() => {
            handleExitUser();
            window.location = "/";
          }}
        >
          {exitButton}
        </div>
      </div>
    </div>
  );
}
