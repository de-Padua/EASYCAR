import React from "react";
import { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";

export default function About() {
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
  return (
    <>
      <Navbar onlineUser={isActive} handleExitUser={handleExit} />
      <div className="about-main-container">
        <div>
          <h2>About us & legal</h2>
          <p>
            Welcome to EASYCAR, your go-to destination for car rentals. We're a
            locally owned and operated car rental store that's been serving our
            community for 3 years. Our goal is to provide our customers with
            high-quality vehicles and exceptional customer service at
            competitive prices.
            <br />
            At EASYCAR, we understand that renting a car can be stressful and
            time-consuming, which is why we strive to make the process as simple
            and hassle-free as possible. We offer a wide range of vehicles to
            suit your needs and budget, from compact cars to luxury SUVs. Our
            fleet is regularly maintained and serviced to ensure that each
            vehicle is in top condition and ready to hit the road.
            <br />
            Our team of experienced professionals is dedicated to providing you
            with personalized service and attention to detail. Whether you need
            help choosing the right vehicle or have questions about our rental
            policies, we're here to help. We'll work with you to find the best
            rental package for your needs, whether you need a car for a day or
            for a month. At EASYCAR, we believe in transparency and honesty,
            which is why we provide our customers with clear and straightforward
            pricing.
            <br />
            There are no hidden fees or charges, and we're happy to answer any
            questions you may have about our rates. We're proud to be a part of
            our community and strive to give back whenever we can. We support
            local charities and organizations and believe in the importance of
            building strong relationships with our customers and neighbors.
            Thank you for choosing EASYCAR for your car rental needs. We look
            forward to serving you and making your rental experience a great
            one.
          </p>
        </div>
      </div>
    </>
  );
}
