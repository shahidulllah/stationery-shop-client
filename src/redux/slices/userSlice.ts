import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  _id: string;
  name: string;
  role: "user" | "admin";
  email: string; 
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
  return response.data;
});

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
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
