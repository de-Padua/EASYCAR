import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import Navbar from "./navbar";
import "./App.css";

export default function Ordercomplete() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <span>EASY</span>
          <span>CAR</span>
        </div>
      </div>
      <div className="order-complete-main-container">
        <div className="center-div-order">
          <img
            src="https://icons.veryicon.com/png/o/system/revision-background/order-details-order-status.png"
            width={"300px"}
          />
          <h2>Your order was completed and is already available!</h2>
          <p className="email-confirmation-msg">
            You will be receiving a confirmation email with order details
          </p>
          <button
            onClick={() => {
              location.assign("/easycar/cataloge");
            }}
          >
            Back to catalogue
          </button>
        </div>
      </div>
    </>
  );
}
