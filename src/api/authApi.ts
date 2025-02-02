import axios from "axios";

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials:{email: string; password: string}) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, credentials);
  return response.data;
};
