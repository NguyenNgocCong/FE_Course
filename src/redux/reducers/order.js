import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { CartSotre } from "../../services/localStore";

const initState = {
  isLoading: false,
  data: {
    packages: [],
    combos: [],
  },
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
    },
    addToCart: (state, action) => {
      state.data.packages.unshift(action.payload);
      CartSotre.setCartLocal(state.data);
    },
    addComboToCart: (state, action) => {
      state.data.combos.unshift(action.payload);
      CartSotre.setCartLocal(state.data);
    },
    removeCartPackage: (state, action) => {
      state.data.packages = state.data.packages.filter(
        (x) => x.id !== action.payload
      );
      CartSotre.setCartLocal(state.data);
    },
    removeCartCombo: (state, action) => {
      state.data.combos = state.data.combos.filter(
        (x) => x.id !== action.payload
      );
      CartSotre.setCartLocal(state.data);
    },

    requestFail: (state, action) => {
      state.error = action.payload;
    },
    resetState: () => {
      return initState;
    },
  },
});

export const getAllCartReduce = createAsyncThunk(
  "getCart",
  async ({ page }, { dispatch }) => {
    try {
      const data = await userApi.getCarts({ page });
      console.log(data);
      dispatch(requestSuccess(data));
    } catch (error) {
      dispatch(requestFail(error?.data?.message));
    }
  }
);

export const getAllCartLocal = createAsyncThunk(
  "getCartLocal",
  async (params = null, { dispatch }) => {
    try {
      const data = CartSotre.getCartLocal();
      dispatch(requestSuccess(data));
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  }
);

export const addPackageLocal = createAsyncThunk(
  "addPackageLocal",
  async (data, { dispatch, getState }) => {
    try {
      const { id } = data;
      const packages = getState().order?.data?.packages;
      if (packages && !packages.some((x) => x.id === id))
        dispatch(addToCart(data));
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  }
);

export const addComboLocal = createAsyncThunk(
  "addComboLocal",
  async (data, { dispatch, getState }) => {
    try {
      const { id } = data;
      const combos = getState().order?.data?.combos;
      if (combos && !combos.some((x) => x.id === id))
        dispatch(addComboToCart(data));
    } catch (error) {
      dispatch(requestFail(error.message));
    }
  }
);

export const {
  sendRequest,
  requestSuccess,
  requestFail,
  resetState,
  addToCart,
  removeCartPackage,
  addComboToCart,
  removeCartCombo,
} = orderSlice.actions;
export default orderSlice;
