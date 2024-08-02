import axios from "axios";
import { config } from "../../utils/axiosConfig";

const getAllProducts = async (data) => {
  const params = new URLSearchParams();

  if (data?.brand) {
    params.append("brand", data.brand);
  }
  if (data?.category) {
    params.append("category", data.category);
  }
  if (data?.minPrice) {
    params.append("price[gte]", data.minPrice);
  }
  if (data?.maxPrice) {
    params.append("price[lte]", data.maxPrice);
  }
  if (data?.tag) {
    params.append("tags", data.tag);
  }
  if (data?.sort) {
    params.append("sort", data?.sort);
  }

  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}product/all?${params.toString()}`
  );

  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}product/wishlist`,
    { prodId: prodId },
    config
  );

  if (response.data) {
    return response.data;
  }
};

const addToCompare = async (prodId) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}product/compare`,
    { prodId: prodId },
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getAProduct = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}product/${id}`
  );

  return response.data;
};

const rateProduct = async (data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}product/rating`,
    data,
    config
  );
  if (response.data) {
    console.log(response.data);
    return response.data;
  }
};

const getAllRatings = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}product/ratings/${id}`
  );
  if (response.data) {
    return response.data;
  }
};

const getCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}prodcategory/all-categories`
  );
  return response.data;
};

const getBrands = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}brand/all-brands`
  );

  return response.data;
};

const productService = {
  getAllProducts,
  addToWishlist,
  getAProduct,
  rateProduct,
  getCategories,
  getBrands,
  addToCompare,
  getAllRatings,
};

export default productService;
