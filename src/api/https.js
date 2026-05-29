import { useAuthStore } from "@/stores/auth";
import axios from "axios";
const api = axios.create({
  baseURL: "https://sahakka.genz.linkpc.net",
});

api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

export default api;
