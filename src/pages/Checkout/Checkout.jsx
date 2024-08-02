// import React, { useState, useEffect } from "react";
// import "./checkout.css";
// import { Link } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { formatPriceToIndian } from "../../utils/DataFormat.js";
// import { useFormik } from "formik";
// import axios from "axios";
// import * as yup from "yup";
// import { config } from "../../utils/axiosConfig.js";
// import {
//   createAnOrder,
//   getUserCart,
//   clearCart,
// } from "../../features/users/userSlice.js";

// const shippingSchema = yup.object({
//   firstName: yup.string().required("First Name is required!"),
//   lastName: yup.string().required("Last Name is required!"),
//   address: yup.string().required("Address is required!"),
//   state: yup.string().required("State is required!"),
//   country: yup.string().required("Country is required!"),
//   city: yup.string().required("City is required!"),
//   pincode: yup.number().required("Pincode is required!"),
//   other: yup.string().required("Apartment is required!"),
// });

// const Checkout = () => {
//   const dispatch = useDispatch();

//   const cartState = useSelector((state) => state.auth.userCart);
//   const [shippingInfo, setShippingInfo] = useState(null);
//   const [cartProductState, setCartProductState] = useState([]);

//   const userState = useSelector((state) => state.auth?.user);

//   const [totalAmount, setTotalAmount] = useState(0);
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       address: "",
//       state: "",
//       city: "",
//       country: "",
//       pincode: "",
//       other: "",
//     },
//     validationSchema: shippingSchema,
//     onSubmit: async (values) => {
//       await setShippingInfo(values);
//       setTimeout(() => {
//         checkoutHandler();
//       }, 300);
//     },
//   });

//   useEffect(() => {
//     let sum = 0;
//     for (let i = 0; i < cartState?.length; i++) {
//       sum = sum + Number(cartState[i]?.quantity) * cartState[i].price;
//       setTotalAmount(sum);
//     }
//   }, [cartState]);

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   let priceAfterDeliveryCharge = totalAmount + 200;

//   useEffect(() => {
//     dispatch(getUserCart());
//   }, []);

//   // useEffect(() => {
//   //   let items = [];
//   //   for (let i = 0; i < cartState.length; i++) {
//   //     items.push({
//   //       product: cartState[i].productId._id,
//   //       quantity: cartState[i].quantity,
//   //       color: cartState[i].color._id,
//   //       price: cartState[i].price,
//   //     });
//   //   }
//   //   setCartProductState(items);
//   //   console.log(cartProductState);
//   // }, []);
//   useEffect(() => {
//     if (cartState.length > 0) {
//       const items = cartState.map((item) => ({
//         product: item.productId._id,
//         quantity: item.quantity,
//         color: item.color._id,
//         price: item.price,
//       }));
//       setCartProductState(items);
//     }
//   }, [cartState]);

//   // useEffect(() => {
//   // console.log(cartProductState);
//   // console.log(shippingInfo);
//   // });

//   const checkoutHandler = async () => {
//     try {
//       const response = await loadScript(
//         "https://checkout.razorpay.com/v1/checkout.js"
//       );
//       if (!response) {
//         alert("Razorpay SDK failed to load");
//         return;
//       }
//       const result = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}user/order/checkout`,
//         { amount: totalAmount + 200 },
//         config
//       );
//       if (!result) {
//         alert("Something Went Wrong!");
//         return;
//       }
//       const { amount, id: order_id, currency } = result.data.order;
//       const options = {
//         key: "rzp_test_bV2zPFeujMpFVV", // Enter the Key ID generated from the Dashboard
//         amount: amount,
//         currency: currency,
//         name: "Digitic",
//         description: "Test Transaction",
//         order_id: order_id,
//         handler: async function (response) {
//           const data = {
//             orderCreationId: order_id,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//           };

//           const result = await axios.post(
//             `${import.meta.env.VITE_BASE_URL}user/order/paymentVerification`,
//             data,
//             config
//           );

//           await dispatch(
//             createAnOrder({
//               totalPrice: totalAmount,
//               totalPriceAfterDiscount: totalAmount,
//               OrderItems: cartProductState,
//               paymentInfo: result.data,
//               shippingInfo: shippingInfo,
//             })
//           );
//           await dispatch(clearCart());
//         },
//         prefill: {
//           name: "Kartik Goyal",
//           email: "digitic.ecommerce@gmail.com",
//           contact: "1234567890",
//         },
//         notes: {
//           address: "Digitic, Goyal's Office",
//         },
//         theme: {
//           color: "#61dafb",
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       alert("Something Went Wrong");
//     }
//   };

//   return (
//     <>
//       <div className="checkout-wrapper py-5 px-4">
//         <div className="container-xxl">
//           <div className="row">
//             <div className="col-7">
//               <div className="checkout-left-data">
//                 <h3 className="website-name">Digitic.</h3>
//                 <nav
//                   style={{ "--bs-breadcrumb-divider": ">" }}
//                   aria-label="breadcrumb"
//                 >
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <Link to="/cart">Cart</Link>
//                     </li>
//                     &nbsp; {">"}
//                     <li className="breadcrumb-item active" aria-current="page">
//                       <Link>Information</Link>
//                     </li>
//                     &nbsp; {">"}
//                     <li className="breadcrumb-item active" aria-current="page">
//                       <Link>Shipping</Link>
//                     </li>
//                     &nbsp; {">"}
//                     <li className="breadcrumb-item active" aria-current="page">
//                       <Link>Payment</Link>
//                     </li>
//                   </ol>
//                 </nav>
//                 <h5 className="title">Contact Information</h5>
//                 <p className="user-details">
//                   {userState?.firstName} {userState?.lastName}
//                   {" ("}
//                   {userState?.email}
//                   {")"}
//                 </p>
//                 <h5 className="title mb-3">Shipping Address</h5>
//                 <form
//                   style={{ backgroundColor: "#" }}
//                   onSubmit={formik.handleSubmit}
//                   action=""
//                   className="d-flex gap-15 flex-wrap justify-content-between"
//                 >
//                   <div className="w-100">
//                     <select
//                       value={formik.values.country}
//                       onChange={formik.handleChange("country")}
//                       onBlur={formik.handleBlur("country")}
//                       name="country"
//                       className="form-control form-select"
//                       id=""
//                     >
//                       <option value="" selected disabled>
//                         Select Country
//                       </option>
//                       <option value="India">India</option>
//                       <option value="Brazil">Brazil</option>
//                       <option value="Australia">Australia</option>
//                       <option value="United States">United States</option>
//                       <option value="Dubai">Dubai</option>
//                       <option value="Russia">Russia</option>
//                       <option value="Egypt">Egypt</option>
//                       <option value="South Korea">South Korea</option>
//                     </select>
//                     <div className="error ms-1">
//                       {formik.touched.country && formik.errors.country}
//                     </div>
//                   </div>
//                   <div className="flex-grow-1">
//                     <input
//                       type="text"
//                       placeholder="First Name"
//                       className="form-control"
//                       value={formik.values.firstName}
//                       onChange={formik.handleChange("firstName")}
//                       onBlur={formik.handleBlur("firstName")}
//                     />
//                     <div className="error ms-1">
//                       {formik.touched.firstName && formik.errors.firstName}
//                     </div>
//                   </div>
//                   <div className="flex-grow-1">
//                     <input
//                       type="text"
//                       placeholder="Last Name"
//                       className="form-control"
//                       value={formik.values.lastName}
//                       onChange={formik.handleChange("lastName")}
//                       onBlur={formik.handleBlur("lastName")}
//                     />
//                     <div className="error ms-1">
//                       {formik.touched.lastName && formik.errors.lastName}
//                     </div>
//                   </div>
//                   <div className="w-100">
//                     <input
//                       type="text"
//                       placeholder="Address"
//                       className="form-control"
//                       value={formik.values.address}
//                       onChange={formik.handleChange("address")}
//                       onBlur={formik.handleBlur("address")}
//                     />
//                     <div className="error ms-1">
//                       {formik.touched.address && formik.errors.address}
//                     </div>
//                   </div>
//                   <div className="w-100">
//                     <input
//                       type="text"
//                       placeholder="Apartment, suite, etc."
//                       className="form-control"
//                       value={formik.values.other}
//                       onChange={formik.handleChange("other")}
//                       onBlur={formik.handleBlur("other")}
//                     />
//                     <div className="error ms-1">
//                       {formik.touched.other && formik.errors.other}
//                     </div>
//                   </div>
//                   <div className="flex-grow-1">
//                     <input
//                       type="text"
//                       placeholder="City"
//                       className="form-control"
//                       value={formik.values.city}
//                       onChange={formik.handleChange("city")}
//                       onBlur={formik.handleBlur("city")}
//                     />
//                     <div className="error ms-1">
//                       {formik.touched.city && formik.errors.city}
//                     </div>
//                   </div>
//                   <div className="flex-grow-1">
//                     <select
//                       name="state"
//                       value={formik.values.state}
//                       onChange={formik.handleChange("state")}
//                       onBlur={formik.handleBlur("state")}
//                       className="form-control form-select"
//                       id=""
//                     >
//                       <option value="" selected disabled>
//                         Select State
//                       </option>
//                       <option value="New Delhi">New Delhi</option>
//                       <option value="Haryana">Haryana</option>
//                       <option value="Uttar Pradesh">Uttar Pradesh</option>
//                       <option value="Gujarat">Gujarat</option>
//                       <option value="Kashmir">Jammu & Kashmir</option>
//                       <option value="Uttarakhand">Uttarakhand</option>
//                       <option value="Rajasthan">Rajasthan</option>
//                       <option value="Punjab">Punjab</option>
//                       <option value="Bihar">Bihar</option>
//                       <option value="Tamil Nadu">Tamil Nadu</option>
//                       <option value="Karnataka">Karnataka</option>
//                       <option value="Madhya Pradesh">Madhya Pradesh</option>
//                       <option value="Himachal Pradesh">Himachal Pradesh</option>
//                     </select>
//                     <div className="error ms-1">
//                       {formik.touched.state && formik.errors.state}
//                     </div>
//                   </div>
//                   <div className="flex-grow-1">
//                     <input
//                       type="text"
//                       placeholder="ZIP Code"
//                       className="form-control"
//                       value={formik.values.pincode}
//                       onChange={formik.handleChange("pincode")}
//                       onBlur={formik.handleBlur("pincode")}
//                     />
//                     <div className="error ms-1">
//                       {formik.touched.pincode && formik.errors.pincode}
//                     </div>
//                   </div>
//                   <div className="w-100">
//                     <div className="d-flex justify-content-between align-items-center mt-2">
//                       <Link to="/cart" className="return">
//                         <FiArrowLeft className="me-1" /> Return to Cart
//                       </Link>
//                       <Link to="/store" className="button">
//                         Continue to Shipping
//                       </Link>
//                       <button className="button" type="submit">
//                         Place Order
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div className="col-5 side-part">
//               <div className="border-bottom py-4">
//                 {cartState &&
//                   cartState?.map((item, idx) => {
//                     return (
//                       <div className="d-flex align-items-center justify-content-between gap-10">
//                         <div className="w-75 mb-2 d-flex align-items-center gap-10">
//                           <div className="w-30 position-relative">
//                             <span
//                               style={{ top: "-2px", right: "-3px" }}
//                               className="badge bg-secondary text-white rounded-circle p-1 position-absolute"
//                             >
//                               {cartState[idx]?.quantity}
//                             </span>
//                             <img
//                               src={cartState[idx]?.productId?.images[1]?.url}
//                               className="bg-white border border-1 prdt-image"
//                               alt=""
//                               width="90px"
//                             />
//                           </div>
//                           <div className="prdt-details">
//                             <h5 className="title text-wrap">
//                               {cartState[idx]?.productId?.title.substr(0, 30) +
//                                 "..."}
//                             </h5>
//                             <p
//                               className="desc text-wrap"
//                               dangerouslySetInnerHTML={{
//                                 __html:
//                                   cartState[idx]?.productId?.description.substr(
//                                     0,
//                                     50
//                                   ) + "...",
//                               }}
//                             ></p>
//                           </div>
//                         </div>
//                         <div className="flex-grow-1 w-25">
//                           <h5 className="prdt-price">
//                             {formatPriceToIndian(
//                               cartState[idx]?.productId?.price *
//                                 cartState[idx]?.quantity
//                             )}
//                           </h5>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//               <div className="border-bottom py-4">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <p className="mb-0 subtotal">Subtotal: </p>
//                   <p className="mb-0 subtotal">
//                     {formatPriceToIndian(totalAmount)}
//                   </p>
//                 </div>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <p className="mb-0 subtotal">Shipping: </p>
//                   <p className="mb-0 subtotal">₹200.00</p>
//                 </div>
//               </div>
//               <div className="d-flex justify-content-between align-items-center border-bottom py-4">
//                 <h4 className="mb-0 total">Total: </h4>
//                 <h5 className="mb-0 total-price">
//                   {formatPriceToIndian(priceAfterDeliveryCharge)}
//                 </h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { formatPriceToIndian } from "../../utils/DataFormat.js";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { config } from "../../utils/axiosConfig.js";
import { toast } from "react-hot-toast";
import {
  createAnOrder,
  getUserCart,
  clearCart,
  applyCoupon,
} from "../../features/users/userSlice.js";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
  address: yup.string().required("Address is required!"),
  state: yup.string().required("State is required!"),
  country: yup.string().required("Country is required!"),
  city: yup.string().required("City is required!"),
  pincode: yup.number().required("Pincode is required!"),
  other: yup.string().required("Apartment is required!"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.userCart);
  const userState = useSelector((state) => state.auth?.user);
  const couponState = useSelector((state) => state?.auth?.coupon);

  const [shippingInfo, setShippingInfo] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartProductState, setCartProductState] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [apply, setApply] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      setShippingInfo(values);
      checkoutHandler(values);
    },
  });

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum += Number(cartState[i]?.quantity) * cartState[i].price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  let priceAfterDeliveryCharge = totalAmount + 200;

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartState.length > 0) {
      const items = cartState.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
        color: item.color._id,
        price: item.price,
      }));
      setCartProductState(items);
    }
  }, [cartState]);

  useEffect(() => {
    const savedCoupon = localStorage.getItem("appliedCoupon");
    if (savedCoupon) {
      setCoupon(savedCoupon);
      dispatch(applyCoupon(savedCoupon));
    }
  }, [dispatch]);

  const checkoutHandler = async (shippingInfo) => {
    try {
      const response = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!response) {
        alert("Razorpay SDK failed to load");
        return;
      }
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}user/order/checkout`,
        {
          amount: discountedPrice
            ? totalAmount - discountedPrice + 200
            : totalAmount + 200,
        },
        config
      );
      if (!result) {
        alert("Something Went Wrong!");
        return;
      }
      const amountTobePaid = discountedPrice
        ? totalAmount - discountedPrice + 200
        : totalAmount + 200;
      const { amount, id: order_id, currency } = result.data.order;
      const options = {
        key: "rzp_test_bV2zPFeujMpFVV", // Enter the Key ID generated from the Dashboard
        amount: amountTobePaid,
        currency: currency,
        name: "Digitic",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BASE_URL}user/order/paymentVerification`,
            data,
            config
          );
          await dispatch(
            createAnOrder({
              totalPrice: priceAfterDeliveryCharge,
              totalPriceAfterDiscount: totalAmount - discountedPrice + 200,
              OrderItems: cartProductState,
              paymentInfo: result.data,
              shippingInfo: shippingInfo,
            })
          );
          await dispatch(clearCart());
          await dispatch(getUserCart());
          navigate("/my-orders");
          localStorage.removeItem("appliedCoupon");
        },
        prefill: {
          name: `${userState?.firstName} ${userState?.lastName}`,
          email: userState?.email,
          contact: "1234567890",
        },
        notes: {
          address: "Digitic, Goyal's Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Something Went Wrong");
    }
  };

  const handleApplyCoupon = async () => {
    let couponCode = coupon;
    await dispatch(applyCoupon(couponCode));
  };

  useEffect(() => {
    if (
      couponState?.name &&
      coupon.toUpperCase() === couponState?.name?.toUpperCase()
    ) {
      toast.dismiss();
      toast.success("Coupon Applied Succesfully!");
      setApply(true);
      let priceAfterCoupon =
        totalAmount - totalAmount * (couponState?.discount / 100);
      setDiscountedPrice(totalAmount * (couponState?.discount / 100));
      setPriceAfterDiscount(priceAfterCoupon + 200);
      localStorage.setItem("appliedCoupon", coupon);
    }
  }, [couponState, totalAmount, coupon]);

  return (
    <div className="checkout-wrapper py-5 px-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Digitic.</h3>
              {/*<nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/cart">Cart</Link>
                  </li>
                  &nbsp; {">"}
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link>Information</Link>
                  </li>
                  &nbsp; {">"}
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link>Shipping</Link>
                  </li>
                  &nbsp; {">"}
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link>Payment</Link>
                  </li>
                </ol>
              </nav>
              */}
              <h5 className="title">Contact Information</h5>
              <p className="user-details">
                {userState?.firstName} {userState?.lastName} {" ("}
                {userState?.email}
                {")"}
              </p>
              <h5 className="title mb-3">Shipping Address</h5>
              <form
                style={{ backgroundColor: "#f2f2f2" }}
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    name="country"
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Australia">Australia</option>
                    <option value="United States">United States</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Russia">Russia</option>
                    <option value="Egypt">Egypt</option>
                    <option value="South Korea">South Korea</option>
                  </select>
                  <div className="error ms-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error ms-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc."
                    className="form-control"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error ms-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name=""
                    className="form-control form-select"
                    id=""
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  <div className="error ms-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Pin Code"
                    className="form-control"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <FiArrowLeft className="me-2" />
                      Return to Cart
                    </Link>
                    <button className="button continue-btn" type="submit">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex gap-10 mb-2 align-items-center"
                  >
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img
                          src={cartState[index]?.productId?.images[1]?.url}
                          className="bg-white border border-1 prdt-image"
                          alt=""
                          width="90px"
                        />
                      </div>
                      <div>
                        <h5 className="total-price">
                          {item?.productId?.title}
                        </h5>
                        <p className="total-price">{item?.color?.title}</p>
                      </div>
                      {}
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">
                        {formatPriceToIndian(item?.price * item?.quantity)}
                      </h5>
                    </div>
                  </div>
                ))}
            </div>
            <div className="border-bottom py-4">
              <div className="coupon-box border-bottom pb-3 d-flex align-items-center justify-content-between">
                <input
                  style={{
                    width: "75%",
                    height: "40px",
                    paddingLeft: "10px",
                    borderRadius: "5px",
                  }}
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter Coupon Code..."
                />
                <button
                  style={{
                    width: "20%",
                    height: "40px",
                    border: "none",
                    backgroundColor: "#131921",
                    color: "#fff",
                    fontWeight: "600",
                    borderRadius: "5px",
                  }}
                  className="apply-coupon-btn"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center pt-3">
                <p className="total">SubTotal</p>
                <p className="total-price">
                  {formatPriceToIndian(totalAmount)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Delivery Charges</p>
                <p className="mb-0 total-price">₹ 200.00</p>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-3">
                {apply === true && priceAfterDiscount !== null && (
                  <>
                    <p className="mb-0 total">{couponState?.name}</p>
                    <p className="mb-0 total-price">
                      - &nbsp;&nbsp; {formatPriceToIndian(discountedPrice)}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                {/* {formatPriceToIndian(priceAfterDeliveryCharge)} */}
                {formatPriceToIndian(
                  couponState !== null && apply !== false
                    ? priceAfterDiscount
                    : priceAfterDeliveryCharge
                )}
              </h5>
            </div>
            {apply && (
              <div
                className="alert alert-success mt-3"
                role="alert"
                style={{ borderStyle: "dashed" }}
              >
                Coupon Applied! You saved {formatPriceToIndian(discountedPrice)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
