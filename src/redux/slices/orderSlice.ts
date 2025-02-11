/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICartItemData, IOrder } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
  orders: IOrder[];
  order: IOrder | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  order: null,
  status: "idle",
  error: null,
};

// Place Order (Including Payment Data)
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (
    {
      email,
      products,
      totalPrice,
      paymentIntentId,
    }: {
      email: string;
      products: ICartItemData[];
      totalPrice: number;
      paymentIntentId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/orders`,
        {
          email,
          products,
          totalPrice,
          paymentStatus: "Paid",
          paymentIntentId,
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Order placement failed");
    }
  }
);

// Fetch a Single Order by ID
export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders/${orderId}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch order");
    }
  }
);

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/orders`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (
    { orderId, newStatus }: { orderId: string; newStatus: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/orders/${orderId}`,
        { status: newStatus }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update order status"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Place Order
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Order placement failed";
      })

      // Handle Fetch Single Order
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle Fetch All Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
        if (state.order?._id === updatedOrder._id) {
          state.order = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
