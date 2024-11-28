import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    credentials: true,
  },
  withCredentials: true,
});

export default axiosPrivate;
