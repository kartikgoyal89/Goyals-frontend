import React, { useEffect, useState } from "react";
import "./compare.css";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { RxCross1 } from "react-icons/rx";
import Color from "../../components/Color/Color";
import { Link } from "react-router-dom";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import { addToCompareList } from "../../features/products/productSlice.js";
import { getCompareList } from "../../features/users/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";

const ComparePrdt = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompareList());
  }, []);

  const removeFromCompare = (id) => {
    dispatch(addToCompareList(id));
    setTimeout(() => {
      dispatch(getCompareList());
    }, 100);
  };
  const compareState = useSelector(
    (state) => state?.auth?.userCompareList?.compare
  );

  const handleImageError = (images) => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />

      <div className="compare-product-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            {compareState?.length === 0 ? (
              <div className="w-100 d-flex flex-column gap-20 align-items-center justify-content-center">
                <img
                  src="../../../public/no-compare.png"
                  alt=""
                  width="170px"
                  style={{ color: "#777" }}
                />
                <h2 style={{ color: "#777" }}>No Products to compare</h2>
              </div>
            ) : (
              compareState?.map((item, key) => {
                return (
                  <div className="compare-product-card position-relative">
                    <button
                      onClick={() => removeFromCompare(item?._id)}
                      className="cross-btn position-absolute"
                    >
                      <RxCross1 className="cross" />
                    </button>
                    <div className="product-card-image">
                      <img
                        src={
                          item?.images[2]?.url || "../../../public/blog1.jpg"
                        }
                        alt="product-image"
                        width="150px"
                        onError={handleImageError(item?.images)}
                      />
                    </div>
                    <div className="compare-product-details">
                      <Link
                        to={`/product/${item?._id}`}
                        className="title mt-4 mb-3 hover-underline"
                        style={{ lineHeight: "22px", fontWeight: "500" }}
                      >
                        {item?.title}
                      </Link>
                      <h6
                        className="price mb-3"
                        style={{ color: "red", fontWeight: "500" }}
                      >
                        {formatPriceToIndian(item?.price)}
                      </h6>
                      <div>
                        <div className="product-detail">
                          <h5>Brand:</h5>
                          <p className="mb-0">{item?.brand}</p>
                        </div>
                        <div className="product-detail">
                          <h5>Type:</h5>
                          <p className="mb-0">{item?.category}</p>
                        </div>
                        <div className="product-detail">
                          <h5>Rating:</h5>
                          <ReactStars
                            count={5}
                            size={25}
                            value={parseInt(item?.totalRatings)}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparePrdt;
