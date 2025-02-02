/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem, Order } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  status: "idle",
  error: null,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData: CartItem[], { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/orders", { items: orderData });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Order failed");
    }
  }
);

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get("/api/orders");
  return response.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch orders";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default orderSlice.reducer;
