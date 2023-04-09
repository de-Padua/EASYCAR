import React from "react";
import { useRef, useState, useEffect } from "react";
import { GiCarDoor, GiCarWheel } from "react-icons/gi";
import Navbar from "./navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";

import "./App.css";
export default function OrderPage() {
  //pages transitioning logic
  const [isPayd, setPayment] = useState(false);

  function setSucesfullPaymentPage() {
    setPayment((oldValue) => !oldValue);
  }

  const hidePage = isPayd ? { opacity: 0 } : { opacity: 1 };
  const showPage = isPayd ? { opacity: 1 } : { opacity: 0 };

  const [cars, setAvailableCars] = useState(
    JSON.parse(localStorage.getItem("cars")) || []
  );
  const [selectCar, setSelectedCar] = useState(
    JSON.parse(localStorage.getItem("selectedCar")) || {}
  );
  const [activeUser, getActiveUser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || {}
  );

  function handleClick(tst) {
    console.log("casa");
  }

  const getAvailablesCars = cars.map((car) => {
    return (
      <option key={car.id} value={car.name}>
        {car.name}
      </option>
    );
  });
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const [getActiveuser, setGetActiveuser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || []
  );
  const [isActive, setActivity] = useState(null);
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
  ///location logic

  const location = useLocation();

  //order logic

  const returnValue = useRef();
  const returnLocation = useRef();
  const departureValue = useRef();
  const departureLocation = useRef();
  const [readTos, setReadTos] = useState(false);
  const [underAge, setUnderAge] = useState(false);
  const [ordersArr, setOrderArr] = useState(activeUser.orders);
  const [paymentMethod, setPaymentMethod] = useState("Undefined");
  const [departudeDetails, setDepartureDails] = useState([]);

  function elimanteDuplicates(item) {
    const found = departudeDetails.find((x) => {
      return x === item;
    });
    if (found) {
      const newArr = departudeDetails.filter((y) => {
        return y !== item;
      });
      setDepartureDails(newArr);
    } else {
      setDepartureDails((oldValue) => [...oldValue, item]);
    }
  }

  function getData() {
    if (readTos && underAge === true) {
      const order = {
        id: Math.floor(Math.random() * 203231333),
        order: {
          departure_location: departureLocation.current.value,
          return_location: returnLocation.current.value,
          departure_date: departureValue.current.value,
          return_date: returnValue.current.value,
        },
        date: {
          date_order: new Date().toISOString(),
        },
        details: {
          payment: paymentMethod,
          departude_details: departudeDetails,
          car: selectCar,
        },
      };

      createNewOrderIntoUserData(order);
      setTimeout(() => {
        setSucesfullPaymentPage();
      }, [1000]);
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  function createNewOrderIntoUserData(order) {
    //get current user
    setOrderArr((oldValue) => [...oldValue, order]);
  }

  useEffect(() => {
    const newUserObj = { ...activeUser, orders: ordersArr };
    localStorage.setItem("activeUser", JSON.stringify(newUserObj));

    const usersList = JSON.parse(localStorage.getItem("userList"));
    const found = usersList.find((user) => {
      return user.email === activeUser.email;
    });
    if (found) {
      const filteredUsersList = usersList.filter((newArr) => {
        return newArr.email !== newUserObj.email;
      });

      const newUserList = [...filteredUsersList, newUserObj];
      localStorage.setItem("userList", JSON.stringify(newUserList));
    }
  }, [ordersArr]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar onlineUser={isActive} handleExitUser={handleExit} />
      <div className="a1" style={hidePage}>
        <div className="main-container-order">
          <div className="container right-container-order">
            <div className="">
              <h2>Details :</h2>
              <h4>{formatter.format(selectCar.price)} / week</h4>
            </div>
            <div>
              <form>
                <div>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setUnderAge((oldValue) => !oldValue);
                    }}
                  />{" "}
                  <span>I confirm that i'm 18+ years old</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onClick={() => {
                      setReadTos((oldValue) => !oldValue);
                    }}
                  />{" "}
                  <span>I confirm that i read the TOS</span>
                </div>
              </form>
            </div>
            <div>
              <button
                className="finish-order-btn"
                onClick={() => {
                  getData();
                }}
              >
                Finish order
              </button>
            </div>
          </div>
          <div className=" container right-container-order">
            <div className="">
              <h2>Total :</h2>
              <h4>{formatter.format(selectCar.price)} / week</h4>
            </div>
            <div>
              <h2>Payment method :</h2>

              <form>
                <input
                  type="radio"
                  name="methodPayment"
                  onClick={() => {
                    setPaymentMethod("Card");
                  }}
                />
                <label htmlFor="methodPayment">Card</label>
                <br />
                <input
                  type="radio"
                  name="methodPayment"
                  onClick={() => {
                    setPaymentMethod("Money");
                  }}
                />
                <label htmlFor="methodPayment">Money</label>
                <br />
                <input
                  type="radio"
                  name="methodPayment"
                  onClick={() => {
                    setPaymentMethod("Check");
                  }}
                />
                <label htmlFor="methodPayment">Check</label>
              </form>

              <div>
                <h2>Depature details :</h2>
                <form>
                  <input
                    type="checkbox"
                    onClick={() => {
                      elimanteDuplicates("Children special seat");
                    }}
                  />
                  <label htmlFor="carDetails">Children special seat</label>
                  <br />

                  <input
                    type="checkbox"
                    onClick={() => {
                      elimanteDuplicates("Standart trailer (5m)");
                    }}
                  />
                  <label>Standart trailer (5m)</label>
                </form>
              </div>

              <div>
                <h2>Car :</h2>
                <span>{selectCar.name}</span>
              </div>
            </div>
          </div>
          <div className="container car-description">
            {" "}
            <h2>Car description</h2>
            <div className="teste car">
              <div></div>
              <div className="selectCar-img-container">
                <img src={selectCar.images} />
              </div>
              <div>
                <h4>
                  {selectCar.name} ({selectCar.year})
                </h4>
              </div>

              <div>
                <p>Brand : {selectCar.brand}</p>
                <p>
                  Doors : {selectCar.doors} <GiCarDoor />
                </p>
                <p>
                  Type : {selectCar.type} <GiCarWheel />
                </p>
              </div>
            </div>
          </div>

          <div className=" container left-container-order">
            <div className="order-container">
              <div className="form-container-order">
                <form>
                  <div className="div-form">
                    <label htmlFor="location">Departure location</label>
                    <select
                      id="location"
                      name="location"
                      ref={departureLocation}
                    >
                      <option value="default">Location</option>
                      <option value="Long beach">Long beach</option>
                      <option value="San francisco">San francisco</option>
                      <option value="Seatle">Seatle</option>
                      <option value="New York">New York</option>
                    </select>
                  </div>
                  <div className="div-form">
                    <label htmlFor="location">Return location</label>
                    <select id="location" name="location" ref={returnLocation}>
                      <option value="default">Location</option>
                      <option value="Long beach">Long beach</option>
                      <option value="San francisco">San francisco</option>
                      <option value="Seatle">Seatle</option>
                      <option value="New York">New York</option>
                    </select>
                  </div>

                  <div className="div-form">
                    <label htmlFor="departure-date">Departure date</label>

                    <input
                      ref={departureValue}
                      type="date"
                      id="departure-date"
                      name="departure-date"
                    />
                  </div>
                  <div className="div-form">
                    <label htmlFor="return-date">Return date</label>
                    <input
                      type="date"
                      id="return-date"
                      name="return-date"
                      ref={returnValue}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-complete-main-container" style={showPage}>
        <div className="center-div-order">
          <img
            src="https://icons.veryicon.com/png/o/system/revision-background/order-details-order-status.png"
            width={"300px"}
          />
          <h2>Your order was completed and is already available!</h2>
          <p className="email-confirmation-msg">
            You will be receiving a confirmation email with order details
          </p>
          <Link to="/easycar">
            <button
              onClick={() => {
                location.assign("/easycar/cataloge");
              }}
            >
              Back to catalogue
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
