import axios from "axios";
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
});

export default axiosClient;
