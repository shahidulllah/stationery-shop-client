import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; 

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials:{email: string; password: string}) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};
