import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./userService";
import toast from "react-hot-toast";
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerfromLocalStorage,
  registeredUser: "",
  userWishlist: [],
  deleteCartProduct: "",
  userCart: "",
  cart: "",
  loginDetails: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      return await authService.loginUser(loginData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "auth/get-wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompareList = createAsyncThunk(
  "auth/get-compare-list",
  async (thunkAPI) => {
    try {
      return await authService.getUserCompare();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "auth/add-to-cart",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "auth/get-user-cart",
  async (thunkAPI) => {
    try {
      return await authService.getUserCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "auth/delete-product-from-cart",
  async (cartItemId, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductCart = createAsyncThunk(
  "auth/update-product-quantity-from-cart",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProductQuantity(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "auth/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "auth/order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/update-user",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPasswordToken = createAsyncThunk(
  "user/forgot-password/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearCart = createAsyncThunk(
  "user/clear-cart",
  async (thunkAPI) => {
    try {
      return await authService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "user/apply-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await authService.applyCode(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.registeredUser = action.payload;
        if (state?.isSuccess) {
          toast.dismiss();
          toast.success("User Registered Succesfully!");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state?.isError) {
          toast.dismiss();
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loginDetails = action.payload;
        if (state.isSuccess) {
          localStorage.setItem("token", action?.payload?.token);
          window.location.reload();
          toast.dismiss();
          toast.success("Login Succesfully!");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state?.isError) {
          toast.dismiss();
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userWishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cart = action.payload;
        if (state.isSuccess) {
          toast.dismiss();
          toast.success("Product added to cart!");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isError) {
          toast.dismiss();
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userCart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteCartProduct = action.payload;
        if (state.isSuccess) {
          toast.dismiss();
          toast.success("Product deleted from Cart!");
        }
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isError) {
          toast.dismiss();
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(updateProductCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedQuantity = action.payload;
        if (state.isSuccess) {
          toast.dismiss();
          toast.success("Product Updated From Cart Succesfully!");
        }
      })
      .addCase(updateProductCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
        if (state.isSuccess === false) {
          toast.dismiss();
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess) {
          toast.dismiss();
          toast.success("Order Placed Succesfully!");
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
        if (state.isSuccess === false) {
          toast.dismiss();
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProducts = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProfile = action.payload;
        if (state.isSuccess) {
          let currentUserData = JSON.parse(localStorage.getItem("customer"));
          let newUserData = {
            _id: currentUserData?._id,
            token: currentUserData?.token,
            firstName: action?.payload?.firstName,
            lastName: action?.payload?.lastName,
            email: action?.payload?.email,
            mobile: action?.payload?.mobile,
          };
          localStorage.setItem("customer", JSON.stringify(newUserData));
          state.user = newUserData;
          toast.dismiss();
          toast.success("Profile Updated Succesfully!");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
        if (state.isError) {
          toast.dismiss();
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess) {
          toast.dismiss();
          toast.success("Email sent to your registered mail!", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#000",
            },
            iconTheme: {
              primary: "#23c433",
              secondary: "#FFFAEE",
            },
          });
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
        if (state.isError) {
          toast.dismiss();
          toast.error(
            action.payload?.response?.data?.message
              ? action.payload?.response?.data?.message
              : "Something Went Wrong"
          );
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          toast.dismiss();
          toast.success("Password Updated Succesfully!");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
        if (state.isError) {
          toast.dismiss();
          toast.error(
            action.payload?.response?.data?.message
              ? action.payload?.response?.data?.message
              : "Something Went Wrong"
          );
        }
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(applyCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupon = action.payload;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSucecss = false;
        state.isError = true;
        state.message = action.payload;
        if (state?.isError) {
          toast.dismiss();
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(getCompareList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompareList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userCompareList = action.payload;
      })
      .addCase(getCompareList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
