import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import "./App.css";
import { Link } from "react-router-dom";

export default function UserAuth() {
  const [newUser, setNewUser] = useState(null);
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList")) || []
  );
  const [online, setOnline] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || "offline"
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //check if user exist
    const user = userList.find((user) => {
      return user.email === data.email && user.password === data.password;
    });
    if (user) {
      setOnline(localStorage.setItem("activeUser", JSON.stringify(user)));
      setTimeout(() => {
        location.assign("/EASYCAR");
      }, 1000);
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className="container-form">
        <div className="left-container">
          <div className="header-form">
            <button
              className="goBack"
              onClick={() => {
                location.assign("/EASYCAR");
              }}
            >
              <AiOutlineLeft />
            </button>
            <div>
              <span>Login to </span>
              <span>EASYCAR</span>
            </div>
            <p>Welcome back ! 😊</p>
          </div>
          <div className="form">
            <form className="form-action" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  {...register("email")}
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  required
                  placeholder="Your password"
                  {...register("password")}
                />
              </div>
              <button type="submit" className="button-blue">
                Log in
              </button>
            </form>
          </div>
          <div className="remember-me"></div>
          <div className="login-brn"></div>
          <div className="newAccontButton"></div>

          <div className="newAccount">
            <p>Not subscribed yet ?</p>

            <Link to="/EASYCAR/create-account"> Create a account now.</Link>
          </div>
        </div>

        <div className="background-img"></div>
      </div>
    </>
  );
}
