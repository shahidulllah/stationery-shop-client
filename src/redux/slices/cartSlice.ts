/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem("token") || "";

// Get cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/cart`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.cart.items);
      return response.data.cart.items;
    } catch (error: any) {
      console.error(" Error fetching cart:", error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${BASE_URL}/cart/add`,
        { productId, quantity },
        {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.cart.items;
    } catch (error: any) {
      console.error(" Error adding to cart:", error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.delete(
        `${BASE_URL}/cart/remove/${productId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.cart.items;
    } catch (error: any) {
      console.error(" Error removing from cart:", error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/cart/clear`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      return [];
    } catch (error: any) {
      console.error("Error clearing cart:", error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
