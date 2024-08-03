import React, { useState, useEffect } from "react";
import "./prdtcard.css";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../features/products/productSlice.js";

const ProductCard = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { grid, product } = props;

  const addToWishlistFunc = (id) => {
    dispatch(addToWishlist(id));
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const breakpoint = 660;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          location.pathname === "/store" ? `gr-${grid} store-prdt-card` : ""
        }`}
      >
        <Link
          to={`/product/${product?._id}`}
          className="product-card position-relative align-items-center"
        >
          <div className="wishlist-icon position-absolute">
            <Link onClick={(e) => addToWishlistFunc(product?._id)}>
              <img src="/heart.png" alt="compare" width="18px" />
            </Link>
          </div>
          <div className="prdt-image" style={{ height: "150px !important" }}>
            <img
              className="img-fluid"
              src={product?.images[2]?.url}
              alt=""
              width="150px"
            />
            <img
              className="img-fluid"
              src={
                product?.images[0]?.url !== null
                  ? product?.images[1]?.url
                  : product?.images[2]?.url
              }
              alt="alternate-img"
              width="150px"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">{product?.brand}</h6>
            <h5 className="product-title">
              {grid !== 12
                ? product?.title.slice(0, 35) + "..."
                : product?.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={parseInt(product?.totalRatings)}
              edit={false}
              activeColor="#ffd700"
            />
            {screenWidth >= breakpoint ? (
              <p
                className={`desc ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></p>
            ) : (
              <p
                className={`desc ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{
                  __html: product?.description.substr(0, 120) + "...",
                }}
              ></p>
            )}
            <p className="price">{formatPriceToIndian(product?.price)}</p>
          </div>

          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-1">
              <Link>
                <img src="/compare.svg" alt="compare" />
              </Link>

              <Link>
                <img src="/eye.png" alt="compare" width="18px" />
              </Link>
              <Link>
                <img src="/cart.png" alt="compare" width="18px" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
