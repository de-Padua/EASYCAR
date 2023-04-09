import React from "react";
import { useState, useEffect } from "react";
import { MdEject } from "react-icons/md";
import "./App.css";

export default function SpecificOrderPage() {
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("orderSelected")) || {}
  );
  const [modal, setOpenModal] = useState(false);
  const [currentUser, setCurrenUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || {}
  );

  const showModal = modal ? { top: "0px" } : { top: "-1000px" };

  function handleCancelOrder() {
    const newOrdersArr = currentUser.orders.filter((orders) => {
      return orders.id != order.id;
    });

    //save to current user new orders array
    const newObjUser = { ...currentUser, orders: newOrdersArr };
    localStorage.setItem("activeUser", JSON.stringify(newObjUser));
    location.assign("/EASYCAR/userProfile");
  }

  return (
    <>
      <div className="main-container-order-detail">
        <div className="order-page-details">
          <h2>Order details</h2>
          <div className="order-details">
            <div>
              <h4>Order date : </h4> <p>{order.date.date_order}</p>
            </div>
            <div>
              <h4>Car : </h4> <p>{order.details.car.name}</p>
            </div>
            <div>
              <h4>Payment : </h4> <p>{order.details.payment}</p>
            </div>
            <div>
              <h4>Departure details : </h4> <p></p>
            </div>
            <div>
              <h4>Departure location : </h4>{" "}
              <p>{order.order.departure_location}</p>
            </div>
            <div>
              <h4>Return location : </h4> <p>{order.order.return_location}</p>
            </div>
            <div>
              <h4>Return date : </h4> <p>{order.order.return_date}</p>
            </div>
            <div>
              <h4>Departure date : </h4> <p>{order.order.departure_date}</p>
            </div>
            <div className="btn-div-coitainer">
              <button
                onClick={() => {
                  location.assign("/EASYCAR/userProfile");
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setOpenModal((OldValue) => !OldValue);
                }}
              >
                Cancel order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-to-confirm">
        <div className="modal-confirm" style={showModal}>
          <h1
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <MdEject />
          </h1>
          <h4>You are about to cancel you order</h4>
          <button
            className="cancel-btn"
            onClick={() => {
              handleCancelOrder();
            }}
          >
            i want to cancel my order
          </button>
        </div>
      </div>
    </>
  );
}
