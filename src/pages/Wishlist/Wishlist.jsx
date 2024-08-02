import React, { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "../../features/users/userSlice.js";
import { addToWishlist } from "../../features/products/productSlice.js";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import { Link } from "react-router-dom";

import "./wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getWishlist());
    }, 100);
  };

  const userWishlist = useSelector((state) => state.auth.userWishlist.wishlist);

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />

      <div className=" wishlist-wrapper py-3">
        <div className="container-xxl">
          <div className="row">
            {userWishlist?.length === 0 ? (
              <div
                style={{ width: "100%", height: "350px" }}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <img src="/empty-wishlist.png" alt="" width="400px" />
                <h3 style={{ color: "#777" }}>Empty Wishlist.</h3>
              </div>
            ) : (
              userWishlist?.map((item, key) => {
                return (
                  <div className="wishlist-card position-relative" key={key}>
                    <button
                      className="cross-btn  position-absolute"
                      onClick={() => removeFromWishlist(item?._id)}
                    >
                      <RxCross1 className="cross" />
                    </button>
                    <div
                      style={{ height: "180px" }}
                      className="wishlist-card-image"
                    >
                      <img
                        src={item?.images[1]?.url}
                        className="mt-3"
                        alt=""
                        width="120px"
                      />
                    </div>
                    <Link to={`/product/${item?._id}`}>
                      <h5 className="title">{item?.title}</h5>
                    </Link>
                    <h6 className="price">
                      {formatPriceToIndian(item?.price)}
                    </h6>
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

export default Wishlist;
