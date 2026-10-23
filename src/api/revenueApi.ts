import axios from "axios";
import type { Transaction, UserData, Wallet } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchUserData = async () => {
  const res = await axios.get<UserData>(`${API_BASE_URL}/user`);
  return res.data;
};
export const fetchRevenueData = async () => {
  const res = await axios.get<Wallet>(`${API_BASE_URL}/wallet`);
  return res.data;
};

export const fetchTransactions = async () => {
  const res = await axios.get<Transaction[]>(`${API_BASE_URL}/transactions`);
  return res.data;
};
