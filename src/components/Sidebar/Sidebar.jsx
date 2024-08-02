import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth <= 910);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    props.crossClicked();
    localStorage.removeItem("customer");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div
        style={isVisible ? { display: "block" } : { display: "none" }}
        className={`sidebar-menu  ${props.menuNew} `}
      >
        <div className="sidebar-container">
          <div className="heading">
            <h2>Menu</h2>
            <RxCross2 onClick={props.crossClicked} className="cross" />
          </div>
          <hr className="hr" />
          <div className="list">
            <ul>
              <Link to="/">
                <button onClick={props.crossClicked}>
                  <h3>Home</h3>
                </button>
              </Link>
              <Link to="/store">
                <button onClick={props.crossClicked}>
                  <h3>Our Store</h3>
                </button>
              </Link>
              <Link to="/my-orders">
                <button onClick={props.crossClicked}>
                  <h3>My Orders</h3>
                </button>
              </Link>
              <Link to="/blog">
                <button onClick={props.crossClicked}>
                  <h3>Blogs</h3>
                </button>
              </Link>
              <Link to="/contact">
                <button onClick={props.crossClicked}>
                  <h3>Contact</h3>
                </button>
              </Link>
              <Link to="/privacy-policy">
                <button onClick={props.crossClicked}>
                  <h3>Privacy Policy</h3>
                </button>
              </Link>
              <Link to="/refund-policy">
                <button onClick={props.crossClicked}>
                  <h3>Refund Policy</h3>
                </button>
              </Link>
              <Link to="/shipping-policy">
                <button onClick={props.crossClicked}>
                  <h3>Shipping Policy</h3>
                </button>
              </Link>
              <Link to="/terms-and-conditions">
                <button onClick={props.crossClicked}>
                  <h3>Terms & Conditions</h3>
                </button>
              </Link>
              <Link to="/privacy-policy">
                <button onClick={handleLogout}>
                  <h3>Logout</h3>
                </button>
              </Link>
            </ul>
          </div>
        </div>

        <div className="social-icons">
          <ul>
            <Link>
              <div className="icon">
                <Link>
                  <FaFacebook />
                </Link>
              </div>
            </Link>
            <Link>
              <div className="icon">
                <Link>
                  <FaTwitter />
                </Link>
              </div>
            </Link>
            <Link>
              <div className="icon">
                <Link>
                  <FaInstagram />
                </Link>
              </div>
            </Link>
            <Link>
              <div className="icon">
                <Link>
                  <FaLinkedin />
                </Link>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
