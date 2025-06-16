import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const baseURL = "https://livefootballia.com/";
const api = axios.create({  
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "key123zxc"
  },
});

const getDecryptedToken = () => {
  const encryptedToken = localStorage.getItem("token");
  if (encryptedToken) {
    const secretKey = "s3cr3t$Key@123!";
    const decryptedToken = CryptoJS.AES.decrypt(
      encryptedToken,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  }
  return null;
};

api.interceptors.request.use(
  (config) => {
    const token = getDecryptedToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const csrfToken = Cookies.get('X-Cookies');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/login`;
    }
    return Promise.reject(error);
  }
);

export default api;