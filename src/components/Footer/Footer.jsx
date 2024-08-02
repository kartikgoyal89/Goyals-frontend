import React, { useState, useEffect } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./footer.css";

const Footer = () => {
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  const [menu4, setMenu4] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const breakpoint = 728;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  // Event handlers
  const handleMenu1Click = () => {
    if (screenWidth <= breakpoint) {
      setMenu1(!menu1);
    } else if (screenWidth >= breakpoint) {
      setMenu1(true);
    }
  };

  return (
    <>
      <footer className="top-footer py-4 w-100">
        <div className="container-xxl w-100">
          <div className="row w-100 d-flex align-items-center justify-content-center gap-30 newsletter-div">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-15 align-items-center">
                <FaRegPaperPlane className="text-white newsletter-plane" />
                <h4 className="mb-0 text-white text-nowrap">
                  Sign up for Newsletter
                </h4>
              </div>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="middle-footer py-4 footer-info">
        <div className="container-xxl px-5">
          <div className="row">
            <div className="col-4">
              <h5 className="text-white mb-3 w-100 footer-content-heading">
                Contact Us{" "}
                {screenWidth > 728 ? (
                  <></>
                ) : !menu1 ? (
                  <MdKeyboardArrowDown
                    className="arrow"
                    onClick={() => setMenu1(!menu1)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowUp
                    className="arrow"
                    onClick={() => setMenu1(!menu1)}
                  />
                )}
              </h5>
              {(menu1 || screenWidth > 728) && (
                <div className="footer-content-data">
                  <address className="text-white address">
                    Hno : Noida Sector - 62,
                    <br /> Noida, Uttar Pradesh <br />
                    Pincode: 131103
                  </address>
                  <a
                    href="tel: +91 1234567890"
                    className="d-block mb-1 text-white address"
                  >
                    +91 1234567890
                  </a>
                  <a
                    href="mailto:goyals.shopping@gmail.com"
                    className="mt-2 d-block mb-4 text-white address"
                  >
                    goyals.shopping@gmail.com
                  </a>
                  <div className="social-icons d-flex align-items-center gap-15 mt-1">
                    <a href="" className="icons text-white fs-4">
                      <FaLinkedin />
                    </a>
                    <a href="" className="icons text-white fs-4">
                      <FaGithub />
                    </a>
                    <a href="" className="icons text-white fs-4">
                      <FaInstagram />
                    </a>
                    <a href="" className="icons text-white fs-4">
                      <FaFacebook />
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="col-3">
              <h5
                className="text-white  mb-3 footer-content-heading"
                onClick={() => setMenu2(!menu2)}
              >
                Inormation{" "}
                {screenWidth > 728 ? (
                  <></>
                ) : !menu2 ? (
                  <MdKeyboardArrowDown
                    className="arrow"
                    onClick={() => setMenu2(!menu2)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowUp
                    className="arrow"
                    onClick={() => setMenu2(!menu2)}
                  />
                )}
              </h5>
              {(menu2 || screenWidth > 728) && (
                <div className="footer-links d-flex flex-column">
                  <Link to="/privacy-policy" className="text-white py-1 mb-1">
                    Privacy Policy
                  </Link>
                  <Link to="/refund-policy" className="text-white py-1 mb-1">
                    Refund Policy
                  </Link>
                  <Link to="/shipping-policy" className="text-white py-1 mb-1">
                    Shipping Policy
                  </Link>
                  <Link
                    to="/terms-and-conditions"
                    className="text-white py-1 mb-4"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              )}
            </div>
            <div className="col-3">
              <h5
                className="text-white mb-3 footer-content-heading"
                onClick={() => setMenu3(!menu3)}
              >
                Account{" "}
                {screenWidth > 728 ? (
                  <></>
                ) : !menu3 ? (
                  <MdKeyboardArrowDown
                    className="arrow"
                    onClick={() => setMenu3(!menu3)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowUp
                    className="arrow"
                    onClick={() => setMenu3(!menu3)}
                  />
                )}
              </h5>
              {(menu3 || screenWidth > 728) && (
                <div className="footer-links d-flex flex-column">
                  <Link className="text-white py-1  mb-1">Search</Link>
                  <Link className="text-white py-1  mb-1">About Us</Link>
                  <Link className="text-white py-1  mb-1">FAQ</Link>
                  <Link className="text-white py-1  mb-4">Contact</Link>
                </div>
              )}
            </div>
            <div className="col-2">
              <h5
                className="text-white mb-3 footer-content-heading"
                onClick={() => setMenu4(!menu4)}
              >
                Quick Links{" "}
                {screenWidth > 728 ? (
                  <></>
                ) : !menu4 ? (
                  <MdKeyboardArrowDown
                    className="arrow"
                    onClick={() => setMenu4(!menu4)}
                  />
                ) : (
                  <MdOutlineKeyboardArrowUp
                    className="arrow"
                    onClick={() => setMenu4(!menu4)}
                  />
                )}
              </h5>
              {(menu4 || screenWidth > 728) && (
                <div className="footer-links d-flex flex-column">
                  <Link className="text-white py-1  mb-1">Laptops</Link>
                  <Link className="text-white py-1  mb-1">Headphones</Link>
                  <Link className="text-white py-1  mb-1">Tablets</Link>
                  <Link className="text-white py-1  mb-4">Watch</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4 last-footer">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white px-3">
                &copy; {new Date().getFullYear()} Powered by Goyal's.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
