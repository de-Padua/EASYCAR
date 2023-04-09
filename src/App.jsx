import React from "react";
import Home from "./Home";
import UserAuth from "./UserAuth";
import NewAccount from "./newAccount";
import UserProfile from "./UserProfile";
import Catalogue from "./Catalogue";
import OrderPage from "./OrderPage";
import Ordercomplete from "./Ordercomplete";
import About from "./About";
import SpecificOrderPage from "./SpecificOrderPage";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/EASYCAR/" element={<Home />} />
        <Route path="/EASYCAR/cataloge" element={<Catalogue />} />
        <Route path="/EASYCAR/userAuth" element={<UserAuth />} />
        <Route path="/EASYCAR/create-account" element={<NewAccount />} />
        <Route path="/EASYCAR/userProfile" element={<UserProfile />} />
        <Route path="/EASYCAR/order-page" element={<OrderPage />} />
        <Route
          path="/EASYCAR/order-complete-page"
          element={<Ordercomplete />}
        />
        <Route path="/EASYCAR/order" element={<SpecificOrderPage />} />
        <Route path="/EASYCAR/about" element={<About />} />
      </Routes>
    </>
  );
}
