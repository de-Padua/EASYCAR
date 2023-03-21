import React from "react";
import CarImg from "./assets/luxury-sports-car-back-half-side-view-removebg.png";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";
import Apresentation from "./apresentation";
import { BiCaretDown } from "react-icons/bi";

export default function Home() {
  const [car, setCars] = useState(
    JSON.parse(localStorage.getItem("cars")) || []
  );
  const [getActiveuser, setGetActiveuser] = useState(
    JSON.parse(localStorage.getItem("activeUser")) || "offline"
  );
  const [isActive, setActivity] = useState(null);
  useEffect(() => {
    fetch("./cars.json")
      .then((data) => data.json())
      .then((data) => setCars(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(car));
  }, [car]);
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
      <div className="home">
        <div className="title-home">
          <p>Unlock your journey with our wheels.</p>
        </div>
        <div className="img-home">
          <img src={CarImg} />
        </div>

        <div className="apresentation-container" id="apresentation">
          <Apresentation
            h2Text={"Quality vehicles"}
            paragText={
              " At our car store, we offer a selection of high-quality vehicles that are in excellent condition. Each vehicle is thoroughly inspected and  serviced before it is put up for sale, ensuring that your customers get a reliable and safe vehicle."
            }
            image={
              "https://www.bankrate.com/2018/02/01124641/7-tactics-car-salesman-dont-want-you-to-know.jpg?auto=webp&optimize=high&crop=16:9"
            }
          />
          <Apresentation
            direction={"row-reverse"}
            className="apresentation-card"
            h2Text={"After-sales service"}
            paragText={
              " We care about our customers' satisfaction even after they have purchased a vehicle from your store. We offer after-sales services such as maintenance and repair services, as well as warranties and guarantees, giving you peace of mind that you are taken care of"
            }
            image={
              "https://hips.hearstapps.com/hmg-prod/images/dealership-dos-and-donts-1628009822.jpg?crop=1.00xw:0.753xh;0,0.115xh&resize=1200:*"
            }
          />
          <Apresentation
            className="apresentation-card"
            h2Text={"Competitive pricing"}
            paragText={
              " We understand that rent a car is a big investment, which is why our offer competitive pricing that provides customers with great value for their money. We are transparent about the pricing of your vehicles, so our customers can be confident that they are getting a fair deal"
            }
            image={
              "https://www.bankrate.com/2008/10/13183752/Top-8-car-buying-mistakes.jpg"
            }
          />
        </div>
        <div className="buton-cataloge-home">
          <button
            onClick={() => {
              location.assign("/easycar/cataloge");
            }}
          >
            See our catalogue
          </button>
        </div>
        <div className="disclaymer">
          <p className="disc">
            Disclaimer: The information provided on this website and any
            associated materials, including but not limited to, brochures,
            flyers, and advertisements, is for general informational purposes
            only. While we make every effort to ensure the accuracy of the
            information presented, we cannot guarantee that the information is
            accurate, complete, or up-to-date. We are not responsible for any
            errors or omissions in the information provided or any decisions
            made based on the information. It is the responsibility of the user
            to verify the information provided, including but not limited to,
            the availability and condition of any vehicles listed for sale. All
            vehicles are sold as-is, with no warranty or guarantee, unless
            specifically stated otherwise. We do not guarantee the accuracy of
            any vehicle history reports provided or assume any responsibility
            for any damages or liabilities arising from the purchase, ownership,
            or operation of any vehicle purchased from us. By using our website
            or purchasing a vehicle from us, you agree to indemnify, defend, and
            hold us harmless from any and all claims, damages, losses, or
            expenses arising from or related to the use of our website or the
            purchase, ownership, or operation of any vehicle purchased from us.
            We reserve the right to change or modify this disclaimer at any time
            without notice. By continuing to use our website or purchase a
            vehicle from us, you agree to be bound by the most current version
            of this disclaimer. <strong>THIS WEBSITE IS A DEMO!</strong> made by{" "}
            <a href="">Antônio de Pádua</a>
          </p>
        </div>
      </div>
    </>
  );
}
