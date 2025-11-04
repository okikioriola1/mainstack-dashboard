import axios from "axios";

// const API_BASE = "https://fe-task-api.mainstack.io";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchUserData = async () => {
  const res = await axios.get(`${API_BASE_URL}/user`);
  return res.data;
};
export const fetchRevenueData = async () => {
  const res = await axios.get(`${API_BASE_URL}/wallet`);
  return res.data;
};

export const fetchTransactions = async () => {
  const res = await axios.get(`${API_BASE_URL}/transactions`);
  return res.data;
};
