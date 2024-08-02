import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import "./special.css";
import Slider from "react-slick";
import { formatPriceToIndian } from "../../utils/DataFormat.js";

import NextArrow from "../../components/Arrows/NextArrow";
import PrevArrow from "../../components/Arrows/PrevArrow";

const SpecialProduct = (props) => {
  const navigate = useNavigate();
  const { id, title, desc, price, brand, images, ratings } = props;
  const [zoomImg, setZoomImg] = useState(images[0]?.url);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    prevArrow: <PrevArrow className="bg-dark next-arrow" />,
    nextArrow: <NextArrow className="bg-dark next-arrow" />,
  };

  return (
    <div className="special-product-card">
      <div className="d-flex align-items-center justify-content-center ">
        <div className="img-container position-relative">
          <div className="wishlist-icon">
            <Link>
              <img src="/heart.png" alt="" width="18px" />
            </Link>
          </div>
          <div className="img-div">
            <img
              src={zoomImg}
              alt="main-image"
              style={{ height: "200px", objectFit: "contain" }}
            />
          </div>
          <div className="action-bar">
            <Link>
              <img src="/compare.svg" alt="" />
            </Link>
            <Link>
              <img src="/eye.png" alt="" width="18px" />
            </Link>
            <Link>
              <img src="/cart.png" alt="" width="18px" />
            </Link>
          </div>
          <div className="img-slider position-relative">
            <Slider {...settings}>
              {images?.map((img, key) => {
                return (
                  <div
                    className="item d-flex align-items-center justify-content-between"
                    style={{
                      width: "90px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  >
                    <div
                      className="img-box"
                      key={key}
                      onClick={() => setZoomImg(img?.url)}
                    >
                      <img
                        src={img?.url}
                        alt=""
                        width="100px"
                        height="100x"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="special-product-content">
          <h5 className="brand">{brand}</h5>
          <h6 className="title">{title}</h6>
          <ReactStars
            count={5}
            size={24}
            value={ratings}
            edit={false}
            activeColor="#ffd700"
          />
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: desc.substr(0, 200) + "..." }}
          ></p>
          <p className="price">
            <span className="red-p">{formatPriceToIndian(price)}</span>
          </p>
          <button onClick={() => navigate(`/product/${id}`)} className="buy">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
