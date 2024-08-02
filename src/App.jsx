import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import OurStore from "./pages/OurStore/OurStore";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import ComparePrdt from "./pages/ComparePrdt/ComparePrdt";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPass from "./pages/ForgotPassword/forgotPass";
import SingleBlog from "./pages/SingleBlog/SingleBlog";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import TermsConditions from "./pages/Terms&Conditions/TermsAndCondition";
import PPolicy from "./pages/PPolicy/PPolicy";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";
import { PrivateRoutes } from "./Routing/PrivateRoutes";
import { OpenRoutes } from "./Routing/OpenRoutes";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<OurStore />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/compare-product"
              element={
                <PrivateRoutes>
                  <ComparePrdt />
                </PrivateRoutes>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/signup"
              element={
                <OpenRoutes>
                  <Signup />
                </OpenRoutes>
              }
            />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PPolicy />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route
              path="/cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="/my-orders"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />
            <Route
              path="/my-profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
