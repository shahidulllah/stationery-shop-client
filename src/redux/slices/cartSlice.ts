import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CartState {
  items: { product: string; quantity: number }[];
  status: string;
}

const initialState: CartState = {
  items: [],
  status: "idle",
};

// Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
    withCredentials: true,
  });
  return response.data.items;
});

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/cart/add`,
      { productId, quantity },
      { withCredentials: true }
    );
    return { productId, quantity };
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string) => {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/cart/remove/${productId}`,
      {
        withCredentials: true,
      }
    );
    return productId;
  }
);

// Clear cart
export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/clear`, {
    withCredentials: true,
  });
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const existingItem = state.items.find(
          (item) => item.product === productId
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ product: productId, quantity });
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product !== action.payload
        );
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
