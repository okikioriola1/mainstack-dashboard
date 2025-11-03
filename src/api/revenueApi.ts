import axios from "axios";

const API_BASE = "https://fe-task-api.mainstack.io";
export const fetchUserData = async () => {
  const res = await axios.get(`${API_BASE}/user`);
  return res.data;
};
export const fetchRevenueData = async () => {
  const res = await axios.get(`${API_BASE}/wallet`);
  return res.data;
};

export const fetchTransactions = async () => {
  const res = await axios.get(`${API_BASE}/transactions`);
  return res.data;
};
