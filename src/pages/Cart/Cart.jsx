import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/Breadcrumb";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  deleteProductFromCart,
  updateProductCart,
  clearCart,
} from "../../features/users/userSlice.js";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import "./cart.css";

const Cart = () => {
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.auth.userCart);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + Number(cartState[i]?.quantity) * cartState[i].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateProductCart({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
    }
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteProductFromCart(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  const emptyCart = () => {
    dispatch(clearCart());
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <section className="cart-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              {cartState?.length !== 0 && (
                <>
                  <div className="cart-header d-flex justify-content-between align-items-center">
                    <h5 className="cart-col-1">Product</h5>
                    <h5 className="cart-col-2">Price</h5>
                    <h5 className="cart-col-3">Quantity</h5>
                    <h5 className="cart-col-4">Total</h5>
                  </div>
                </>
              )}

              {cartState?.length === 0 ? (
                <div className="w-100 d-flex align-items-center justify-content-center flex-column">
                  <img
                    src="../../../public/empty-cart.png"
                    alt=""
                    height="300px"
                  />
                  <h3 style={{ color: "#777" }}>Empty Cart</h3>
                </div>
              ) : (
                cartState &&
                cartState?.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="cart-data mb-2 d-flex justify-content-between align-items-center mt-4"
                    >
                      <div className="cart-col-1 d-flex align-items-center gap-15">
                        <div className="w-30">
                          <img
                            src={
                              item?.productId?.images[1]?.url
                                ? item?.productId?.images[1]?.url
                                : item?.productId?.images[2]?.url
                            }
                            alt=""
                            width="130px"
                            className="img-fluid prdt bg-white p-3"
                          />
                        </div>
                        <div className="w-70 d-flex flex-column align-items-start justify-content-start gap--5">
                          <p>{item?.productId?.title}</p>
                          <p className="d-flex gap-10">
                            <strong>Color:</strong>
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: item?.color?.color,
                              }}
                            ></div>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price mb-0">
                          {formatPriceToIndian(item?.productId?.price)}
                        </h5>
                      </div>
                      <div className="cart-col-3  d-flex align-items-center gap-20">
                        <div className="d-flex align-items-center gap-10">
                          <p className="quantity mb-0">Quantity: </p>
                          <input
                            className="form-control"
                            type="number"
                            id={`cart $${item?._id}`}
                            name={`quantity ${item?._id}`}
                            min={1}
                            max={10}
                            style={{ width: "60px" }}
                            defaultValue={item?.quantity}
                            onChange={(e) => {
                              setProductUpdateDetail({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div
                          className="delete-div"
                          onClick={() => deleteACartProduct(item?._id)}
                        >
                          <img
                            src="/delete.svg"
                            className="del-btn"
                            style={{ filter: "brightness(0) invert(1)" }}
                            width="20px"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price mb-0">
                          {formatPriceToIndian(
                            item?.productId?.price * item?.quantity
                          )}
                        </h5>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartState?.length !== 0 && (
              <>
                <div className="col-12 py-2 cart-bottom mt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-10">
                      <Link to="/store" className="button">
                        Continue Shopping
                      </Link>
                      <button
                        className="button clear-cart-btn"
                        onClick={emptyCart}
                      >
                        Clear Cart
                      </button>
                    </div>
                    {(totalAmount !== null || totalAmount !== 0) && (
                      <div className="subtotal">
                        <h4>Subtotal: {formatPriceToIndian(totalAmount)}</h4>
                        <p>Taxes & shipping calculated at checkout</p>
                        <Link to="/checkout" className="button">
                          Checkout
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
