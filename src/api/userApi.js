import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE
});

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post("/users", user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await api.put(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
