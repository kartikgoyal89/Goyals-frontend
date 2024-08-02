import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import Meta from "../../components/Meta/Meta";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../features/users/userSlice.js";
import "./order.css";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.orderedProducts?.orders);
  console.log(orderState);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const breakpoint = 845;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <Meta title={"My Orders"} />
      <BreadCrumb title="My Orders" />
      <div className="order-wrapper p-5">
        <div className="container-xxl">
          {orderState?.length > 0 ? (
            screenWidth >= breakpoint ? (
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4">
                      <h5
                        className="mb-0"
                        style={{ fontSize: "16px", textTransform: "uppercase" }}
                      >
                        Order ID
                      </h5>
                    </div>
                    <div className="col-3">
                      <h5
                        className="mb-0"
                        style={{ fontSize: "16px", textTransform: "uppercase" }}
                      >
                        Amount
                      </h5>
                    </div>
                    <div className="col-3">
                      <h5
                        className="mb-0"
                        style={{ fontSize: "16px", textTransform: "uppercase" }}
                      >
                        Amount After Discount
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5
                        className="mb-0"
                        style={{ fontSize: "16px", textTransform: "uppercase" }}
                      >
                        Status
                      </h5>
                    </div>
                  </div>
                  <div className="col-12">
                    {orderState &&
                      orderState.map((item, index) => (
                        <div
                          key={index}
                          className="row my-3"
                          style={{
                            backgroundColor: "#febd69",
                            height: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="col-4 py-3 d-flex align-items-center">
                            <p className="mb-0">{item?._id}</p>
                          </div>
                          <div className="col-3 py-3 d-flex align-items-center">
                            <p className="mb-0">₹{item?.totalPrice}</p>
                          </div>
                          <div className="col-3 py-3 d-flex align-items-center">
                            <p className="mb-0">
                              ₹{item?.totalPriceAfterDiscount}
                            </p>
                          </div>
                          <div className="col-2 py-3 d-flex align-items-center">
                            <p className="mb-0">{item?.orderStatus}</p>
                          </div>

                          {item?.OrderItems?.map((i, idx) => (
                            <div
                              key={i}
                              className="col-12 "
                              style={{
                                backgroundColor: "#eee",
                              }}
                            >
                              <div
                                className="row p-3"
                                style={{
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                <div className="col-4">
                                  <h6 className="mb-0">Product Name</h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="mb-0">Quantity</h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="mb-0">Price</h6>
                                </div>
                                <div className="col-2">
                                  <h6 className="mb-0">Color</h6>
                                </div>
                              </div>
                              <div className="col-12 p-3">
                                <div
                                  className="row"
                                  style={{
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="col-4 pe-5">
                                    <p className="mb-0">
                                      {i?.product?.title.substr(0, 50) + "..."}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="mb-0 px-4">{i?.quantity}</p>
                                  </div>
                                  <div className="col-3 ">
                                    <p className="mb-0">₹{i?.price}</p>
                                  </div>
                                  <div className="col-2">
                                    <div
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        backgroundColor: i?.color?.color,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              orderState &&
              orderState.map((item, index) => (
                <div key={index} className="order-item mb-3">
                  <div className="order-details">
                    <div className="order-detail">
                      <span className="detail-key">Order ID:</span>
                      <span className="detail-value">{item._id}</span>
                    </div>
                    <div className="order-detail">
                      <span className="detail-key">Amount:</span>
                      <span className="detail-value">₹{item.totalPrice}</span>
                    </div>
                    <div className="order-detail">
                      <span className="detail-key">Amount After Discount:</span>
                      <span className="detail-value">
                        ₹{item.totalPriceAfterDiscount}
                      </span>
                    </div>
                    <div className="order-detail">
                      <span className="detail-key">Status:</span>
                      <span className="detail-value">{item.orderStatus}</span>
                    </div>
                  </div>
                  {item.OrderItems &&
                    item.OrderItems.map((i, idx) => (
                      <div key={idx} className="product-item p-3">
                        <div className="product-detail">
                          <span className="detail-key">Product Name:</span>
                          <span className="detail-value">
                            {i.product?.title.substr(0, 50) + "..."}
                          </span>
                        </div>
                        <div className="product-detail">
                          <span className="detail-key">Quantity:</span>
                          <span className="detail-value">{i.quantity}</span>
                        </div>
                        <div className="product-detail">
                          <span className="detail-key">Price:</span>
                          <span className="detail-value">₹{i.price}</span>
                        </div>
                        <div className="product-detail d-flex gap-20">
                          <span className="detail-key">Color:</span>
                          <span className="detail-value">
                            <div
                              className="color-box"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                border: "1px solid black",
                                backgroundColor: i.color?.color,
                              }}
                            ></div>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ))
            )
          ) : (
            <div className="no-orders w-100 d-flex flex-column align-items-center justify-content-between">
              <img src="/no-order.svg" alt="" width="200px" />
              <h1 style={{ color: "#777" }}>No Orders yet.</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
