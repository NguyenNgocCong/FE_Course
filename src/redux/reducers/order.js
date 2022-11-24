import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

const initState = {
  isLoading: false,
  isLogin: false,
  data: {},
  error: "",
};
const orderSlice = createSlice({
  name: "order",
  initialState: initState,
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true;
    },
    requestSuccess: (state, action) => {
      state.data = action.payload;
      state.isLogin = true;
    },
    requestFail: (state, action) => {
      state.error = action.payload;
    },
    resetState: () => {
      return initState;
    },
  },
});


export const { sendRequest, requestSuccess, requestFail, resetState } =
  orderSlice.actions;
export default orderSlice;
