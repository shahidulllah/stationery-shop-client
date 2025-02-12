import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  _id: string;
  name: string;
  role: "user" | "admin";
  email: string;
  image?: string;
  shippingAddress?: string;
};

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log("Fetched users:", response.data);
    return response.data;
  }
);

// Update user role
export const updateUserRole = createAsyncThunk<
  User,
  { userId: string; role: User["role"] }
>("users/updateUserRole", async ({ userId, role }) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}/role`, {
    role,
  });
  console.log("Updated user:", response.data);
  return response.data;
});

//Update user
export const updateUserProfile = createAsyncThunk<
  User,
  { userId: string; name: string; shippingAddress: string; image: string }
>(
  "users/updateUserProfile",
  async ({ userId, name, shippingAddress, image }) => {
    const response = await axios.put(`${BASE_URL}/users/${userId}/profile`, {
      name,
      shippingAddress,
      image,
    });
    return response.data;
  }
);

// Delete user
export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (userId) => {
    await axios.delete(`${BASE_URL}/users/${userId}`);
    return userId;
  }
);

// User Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      // Update role
      .addCase(
        updateUserRole.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user._id === action.payload._id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      //Update user
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updatedUser };
        }
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
