import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Sidebar from "../../components/Sidebar/Sidebar";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUserCart } from "../../features/users/userSlice.js";

import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [menuNew, setMenuNew] = useState("closed");
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const cartState = useSelector((state) => state?.auth?.userCart);
  const userState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + Number(cartState[i]?.quantity) * cartState[i]?.price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      data.push({ id: i, prodId: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row px-3">
            <div className="col-6 shipping">
              <p className="text-white mb-0">
                Free Shipping Over ₹1000 & Free Returns.
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0 hotline">
                Hotline: <a href="tel: +91 1234567890">(+91) 1234567890</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <h2 className="digitic">
            <Link className="text-white logo px-4">
              <IoMdMenu
                className="responsive-menu me-2"
                onClick={() => setMenuNew("open")}
              />
              <Link to="/">Goyal's</Link>
            </Link>
          </h2>
          <div className="input-group mb-3">
            <Typeahead
              id="pagination-example"
              labelKey={"name"}
              minLength={2}
              onChange={(selected) => {
                if (selected.length > 0) {
                  setSearchInput("");
                  navigate(`/product/${selected[0]?.prodId}`);
                }
              }}
              onInputChange={(text) => setSearchInput(text)}
              inputProps={{ value: searchInput }}
              options={productOpt}
              placeholder="Search Product Here..."
            />
            <span className="input-group-text" id="basic-addon2">
              <GoSearch className="search-icon fs-5" />
            </span>
          </div>

          <div className="side-logo d-flex align-items-center justify-content-between">
            <div>
              <Link
                className="d-flex align-items-center text-white gap-10 icon-div"
                to="/compare-product"
              >
                <MdOutlineCompareArrows className="icon" />
                <p>
                  Compare <br /> Products
                </p>
              </Link>
            </div>
            <div>
              <Link
                to="/wishlist"
                className="d-flex align-items-center text-white gap-10 icon-div"
              >
                <FaRegHeart className="icon" />
                <p>
                  Favourite <br />
                  Wishlist
                </p>
              </Link>
            </div>
            <div>
              <Link
                to={userState?.user === null ? "/login" : "/my-profile"}
                className="d-flex align-items-center text-white gap-10 icon-div"
              >
                <FaRegUser className="icon" />
                {userState?.user === null ? (
                  <p className="mb-0">
                    Login
                    <br />
                    My Account
                  </p>
                ) : (
                  <p>
                    Welcome
                    <br />
                    {userState?.user?.firstName}
                  </p>
                )}
              </Link>
            </div>
            <div>
              <Link
                to="/cart"
                className="d-flex align-items-center text-white gap-10 icon-div"
              >
                <IoCartOutline className="icon cart-icon" />
                <div className="d-flex flex-column cart-details">
                  <span className="badge bg-white text-dark">
                    {cartState?.length ? cartState?.length : 0}
                  </span>
                  <p className="amount">{formatPriceToIndian(totalAmount)}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Sidebar menuNew={menuNew} crossClicked={() => setMenuNew("closed")} />
      <header className="header-bottom responsive-search py-2">
        <div className="responsive-search-container py-3 px-5">
          <div className="input-group mb-3">
            <Typeahead
              id="pagination-example"
              labelKey={"name"}
              minLength={2}
              onChange={(selected) => {
                if (selected.length > 0) {
                  navigate(`/product/${selected[0]?.prodId}`);
                  setSearchInput("");
                }
              }}
              onInputChange={(text) => setSearchInput(text)}
              inputProps={{ value: searchInput }}
              options={productOpt}
              placeholder="Search Product Here..."
            />
            <span className="input-group-text" id="basic-addon2">
              <GoSearch className="search-icon fs-5" />
            </span>
          </div>
        </div>
      </header>
      <header className="header-bottom py-2 header-tags">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle gap-10 d-flex align-items-center ms-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/vite.svg" alt="" className="shop-menu" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isOpenMenu ? "open" : "closed"
                      } `}
                    >
                      <li>
                        <Link className="dropdown-item" to="">
                          Home
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="">
                          Cameras & Videos
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Computers & Laptop
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Home Appliances
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Handbag
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Mobiles & Tablets
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Smart Phones
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Portable Speakers
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="">
                          Music & Gaming
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button
                      className="border-0 bg-transparent text-white text-uppercase"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
