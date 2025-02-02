/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for better structure
interface Order {
  id: string;
  items: any[];
  totalAmount: number;
  status: string;
}

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
  async (orderData) => {
    const response = await axios.post("/api/orders", orderData);
    return response.data;
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
