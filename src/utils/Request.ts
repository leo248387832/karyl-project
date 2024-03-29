import axios from "axios";
import { showDialog } from "./Dialog";

const BaseUrl = "https://api.rsplwe.com";
const TimeOut = 10 * 1000;

const service = axios.create({
  baseURL: BaseUrl,
  // withCredentials: true,
  timeout: TimeOut,
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 114514) {
      // showDialog("Request Error", res.message);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  async (error: Error) => {
    // showDialog("Request Error (Internal)", error.message);
    return Promise.reject(error);
  }
);

export default service;
