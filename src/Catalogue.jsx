import React from "react";
import { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import "./App.css";

export default function Catalogue() {
  const [vehicles, getVehicles] = useState(
    JSON.parse(localStorage.getItem("cars")) || []
  );
  const [filteredItems, setFilteredItems] = useState(vehicles);
  // Create our number formatter.
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
    setActivity(false);
  }

  function handleBook(cars) {
    if (isActive) {
      localStorage.setItem("selectedCar", JSON.stringify(cars));
      location.assign("/easycar/order-page");
    } else {
      alert("You need to log in first");
    }
  }

  function handleFilterItems(brand) {
    const filteredCars = vehicles.filter((cars) => {
      return cars.brand === brand;
    });
    setFilteredItems(filteredCars);
    if (brand === "") {
      setFilteredItems(vehicles);
    }
  }
  function handleFilterItemsByType(type) {
    const filteredCars = vehicles.filter((cars) => {
      return cars.type === type;
    });
    setFilteredItems(filteredCars);
    if (type === "") {
      setFilteredItems(vehicles);
    }
  }

  const mappedVehicles = filteredItems.map((cars) => {
    return (
      <div className="car" key={cars.name}>
        <div>
          <h5 className="typo">
            {cars.type} / {cars.brand}
          </h5>
        </div>
        <div className="car-img-container">
          <img src={cars.images} />
        </div>
        <div>
          <h4>
            {cars.name} ({cars.year})
          </h4>
        </div>
        <div className="price-car">
          <h2>For {formatter.format(cars.price)} / week</h2>
        </div>
        <div>
          <button
            onClick={() => {
              handleBook(cars);
            }}
          >
            Book now
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar onlineUser={isActive} handleExitUser={handleExit} />
      <div className="main-container-cars">
        <div className="options-car-container">
          <div className="title-opts">
            <p>Filter by</p>
          </div>
          <div>
            <p className="brand-title">Type</p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItemsByType("");
              }}
            >
              All
            </p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItemsByType("Sedan");
              }}
            >
              Sedan
            </p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItemsByType("Hatch");
              }}
            >
              Hatch
            </p>
          </div>
          <div>
            <p className="brand-title">Brands</p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItems("");
              }}
            >
              All
            </p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItems("Toyota");
              }}
            >
              Toyota
            </p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItems("Volkswagen");
              }}
            >
              Volkswagen
            </p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItems("Chevrolet");
              }}
            >
              Chevrolet
            </p>
            <p
              className="car-brand"
              onClick={() => {
                handleFilterItems("Fiat ");
              }}
            >
              Fiat
            </p>
          </div>
        </div>

        <div className="car-container">{mappedVehicles}</div>
      </div>
    </>
  );
}
