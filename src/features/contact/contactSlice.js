import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";
import toast from "react-hot-toast";

const initialState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const postEnquiry = createAsyncThunk(
  "enq/post-enq",
  async (enqData, thunkAPI) => {
    try {
      return await contactService.postQuery(enqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const enqSlice = createSlice({
  name: "enq",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(postEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contact = action.payload;
      })
      .addCase(postEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enqSlice.reducer;
