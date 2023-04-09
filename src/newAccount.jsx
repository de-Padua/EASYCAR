import React from "react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

export default function newAccount() {
  const [newUser, setNewUser] = useState(null);
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList")) || []
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let user = { ...data, orders: [] };
    setNewUser(user);
  };

  useEffect(() => {
    if (newUser === null) {
      return;
    } else {
      //check if email already exists in data-base
      const duplicate = userList.find((user) => {
        return user.email === newUser.email;
      });
      //if find duplicates alert user
      if (duplicate) {
        alert("Email already registered");
      } else {
        setUserList((oldValue) => [...oldValue, newUser]);
        setTimeout(() => {
          location.assign("/EASYCAR/userAuth");
        }, 4000);
      }
    }
  }, [newUser]);
  useEffect(() => {
    if (newUser === null) {
      return;
    } else {
      localStorage.setItem("userList", JSON.stringify(userList));
    }
  }, [newUser]);
  const [tos, setTos] = useState(false);
  function handleTermsOfService() {
    setTos((oldValue) => !oldValue);
  }

  const show = tos ? { opacity: "1" } : { opacity: "0" };

  return (
    <div className="container-form">
      <div className="left-container">
        <div className="header-form">
          <div>
            <span>Create a new account at </span>
            <span>EASYCAR</span>
          </div>
        </div>
        <div className="form">
          <form className="form-action" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Full name</label>
              <input
                type="text"
                required
                placeholder="Full name"
                {...register("username")}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                required
                placeholder="Phone"
                {...register("phone")}
              />
            </div>
            <div>
              <label>Adress</label>
              <input
                type="text"
                required
                placeholder="Adress"
                {...register("adress")}
              />
            </div>
            <div>
              <label>New Email</label>
              <input
                type="email"
                required
                placeholder="Your email"
                {...register("email")}
              />
            </div>

            <div>
              <label>New Password</label>
              <input
                type="password"
                required
                placeholder="New password"
                {...register("password")}
              />
            </div>
            <div>
              <label>Confirm new password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <div className="login-brn">
              <button type="submit">Create new account</button>
            </div>
          </form>
        </div>
        <div className="remember-me">
          <div>
            <p
              onClick={() => {
                handleTermsOfService();
              }}
            >
              Terms of service
            </p>
          </div>
        </div>
        <div className="newAccontButton"></div>

        <div className="newAccount">
          <a
            onClick={() => {
              location.assign("/EASYCAR/userAuth");
            }}
          >
            I have a account
          </a>
        </div>
      </div>
      <div className="termsofService" style={show}>
        <p>
          The cars listed for sale on our website are subject to availability
          and may change without notice.
          <br />
          We make every effort to keep our inventory up-to-date, but cannot
          guarantee that all vehicles listed will be available for purchase.
          <br />
          All prices listed on our website are subject to change without notice.
          <br />
          We reserve the right to modify the price of any vehicle at any time
          without prior notice.
          <br />
          We make every effort to provide accurate and complete information
          about our vehicles, but we cannot guarantee the accuracy of all
          details.
          <br />
          It is your responsibility to verify the accuracy of any information
          before making a purchase. We offer financing options for qualified
          customers.
          <br />
          Our financing terms and conditions may vary based on your credit
          history and other factors.
          <br />
          We encourage you to review our financing terms carefully before making
          a purchase. All vehicles are sold on an "as-is" basis.
          <br />
          We make no representations or warranties about the condition of any
          vehicle, and all sales are final. You are responsible for inspecting
          the vehicle and verifying its condition before making a purchase. We
          may require a deposit to hold a vehicle for purchase. Deposits are
          non-refundable and will be applied toward the purchase price of the
          vehicle.
          <br />
          We reserve the right to refuse service to anyone for any reason, at
          our sole discretion. All sales are subject to applicable taxes, fees,
          and other charges. It is your responsibility to pay all applicable
          charges and to ensure that all required paperwork is completed
          accurately and in a timely manner. We may offer warranties or other
          services with our vehicles.
          <br />
          Please review the terms and conditions of any warranty or service
          agreement carefully before making a purchase. We reserve the right to
          modify or terminate these terms of service at any time, for any
          reason, without notice. By making a purchase from us, you agree to
          comply with these terms of service.
          <br />
          Failure to comply may result in the cancellation of your purchase or
          other disciplinary action.
        </p>
      </div>
      <div className="background-img"></div>
    </div>
  );
}
