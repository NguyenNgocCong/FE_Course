import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoading: false,
  isLogin: false,
  data: {},
  error: "",
};
const authSlice = createSlice({
  name: "auth",
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

export const getUserInfoReduce = createAsyncThunk(
  "getUserInfoReduce",
  async (params, { dispatch }) => {
    try {
      dispatch(sendRequest());
      dispatch(resetState());
    } catch (error) {
      dispatch(resetState());
      dispatch(requestFail(error.message));
    }
  }
);

export const { sendRequest, requestSuccess, requestFail, resetState } =
  authSlice.actions;
export default authSlice;
