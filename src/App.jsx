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
        <Route path="/" element={<Home />} />
        <Route path="/cataloge" element={<Catalogue />} />
        <Route path="/userAuth" element={<UserAuth />} />
        <Route path="/create-account" element={<NewAccount />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/order-page" element={<OrderPage />} />
        <Route path="/order-complete-page" element={<Ordercomplete />} />
        <Route path="/order" element={<SpecificOrderPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
