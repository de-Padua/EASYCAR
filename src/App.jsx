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
        <Route path="/easycar" element={<Home />} />
        <Route path="/easycar/cataloge" element={<Catalogue />} />
        <Route path="/easycar/userAuth" element={<UserAuth />} />
        <Route path="/easycar/create-account" element={<NewAccount />} />
        <Route path="/easycar/userProfile" element={<UserProfile />} />
        <Route path="/easycar/order-page" element={<OrderPage />} />
        <Route
          path="/easycar/order-complete-page"
          element={<Ordercomplete />}
        />
        <Route path="/easycar/order" element={<SpecificOrderPage />} />
        <Route path="/easycar/about" element={<About />} />
      </Routes>
    </>
  );
}
