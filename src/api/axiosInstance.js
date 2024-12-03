import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { logout } from "../slice/AuthSlice"; // Assuming you have a logout action
import store from "../store/store"; // Import the Redux store
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://zakariyahfoundation.com.ng/api/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    NProgress.start();

    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";

    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;

      // Fetch user details for validation
      try {
        const userResponse = await axios.get(
          "https://zakariyahfoundation.com.ng/api/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        //   console.log(userResponse);

        if (userResponse.data.data.status === "disabled") {
          handleUnauthorized();
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleUnauthorized();
        }
      }
    }

    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.response && error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);
const handleUnauthorized = () => {
  store.dispatch(logout());

  localStorage.removeItem("authToken");

  window.location.href = "/";
};

export default axiosInstance;
