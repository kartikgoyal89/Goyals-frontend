import axios from "axios";
import { config } from "../../utils/axiosConfig";

const registerUser = async (userData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}user/register`,
    userData
  );
  return response.data;
};

const loginUser = async (loginData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}user/login`,
    loginData
  );

  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}user/wishlist`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUserCompare = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}user/compare`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}user/cart`,
    cartData,
    config
  );
  return response.data;
};

const getUserCart = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}user/get-cart`,
    config
  );
  return response.data;
};

const removeProductFromCart = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}user/delete-product-cart/${id}`,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const updateProductQuantity = async (cartDetail) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}user/update-product-cart/${
      cartDetail.cartItemId
    }/${cartDetail.quantity}`,
    {},
    config
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}user/cart/create-order`,
    orderDetail,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}user/order/get-my-orders`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateUser = async (userData) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}user/update-user`,
    userData,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}user/forgot-password`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetPass = async (data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async () => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}user/clear-cart`,
    "",
    config
  );
  if (response.data) {
    return response.data;
  }
};

const applyCode = async (coupon) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}user/apply-coupon`,
    { coupon: coupon },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const userService = {
  registerUser,
  loginUser,
  getUserWishlist,
  addToCart,
  getUserCart,
  removeProductFromCart,
  updateProductQuantity,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPasswordToken,
  resetPass,
  emptyCart,
  applyCode,
  getUserCompare,
};

export default userService;
