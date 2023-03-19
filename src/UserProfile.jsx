import React from "react";
import Navbar from "./navbar";
import { useEffect, useState, useRef } from "react";
import {
  BiArrowToRight,
  BiArrowToLeft,
  BiCreditCard,
  BiMoney,
  BiDetail,
  BiTrip,
} from "react-icons/bi";

export default function UserProfile() {
  const [isActive, setActivity] = useState(null);
  const [getActiveuser, setGetActiveuser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || []
  );
  useEffect(() => {
    if (getActiveuser != "offline") {
      setActivity(true);
    } else {
      setActivity(false);
    }
  }, [getActiveuser]);
  useEffect(() => {
    if (isActive === false) {
      localStorage.setItem("activeUser", JSON.stringify("offline"));
    } else {
      return;
    }
  }, [isActive]);

  function handleExit() {
    console.log("sexo");
    setActivity(false);
  }
  function handleOrderPage(x) {
    localStorage.setItem("orderSelected", JSON.stringify(x));
    window.location = "/order";
  }
  const userOrders = getActiveuser.orders.map((order) => {
    return (
      <div
        className=""
        onClick={() => {
          handleOrderPage(order);
        }}
      >
        <div className="order-obt-profile">
          <div className="testediv-1">
            <p>
              {" "}
              <BiArrowToRight className="departure_icon" />
              {order.order.departure_location}
            </p>
            <p>
              {" "}
              <BiArrowToLeft className="return_icon" />
              {order.order.return_location}
            </p>
          </div>
          <div className="testediv">
            <h4>
              <BiTrip className="trip" />
              {order.details.car.name}
            </h4>
            <p>
              {order.details.payment === "Card" ? (
                <BiCreditCard className="default-money" />
              ) : "Money" ? (
                <BiMoney className="default-money" />
              ) : (
                <BiDetail className="default-money" />
              )}{" "}
              {order.details.payment}
            </p>
          </div>
        </div>
      </div>
    );
  });
  console.log(userOrders);

  /// profile logic
  return (
    <>
      <Navbar onlineUser={isActive} handleExitUser={handleExit} />
      <div className="profile-main-container">
        <div className="left-side-profile-container">
          <div></div>
          <div>
            {" "}
            <img
              src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              width={"120px"}
            />
            <h2>{getActiveuser.username}</h2>
            <h4>Email</h4>
            <p>{getActiveuser.email}</p>
            <h4>Adress</h4>
            <p>{getActiveuser.adress}</p>
            <h4>Phone</h4>
            <p>{getActiveuser.phone}</p>
          </div>
        </div>

        <div className="right-side-profile-container">
          <div>
            {" "}
            <h2 className="order-title">Orders</h2>
          </div>
          <div>
            {userOrders.length === 0 ? (
              <p className="nordes">No orders yet</p>
            ) : (
              userOrders
            )}
          </div>
        </div>
      </div>
    </>
  );
}
