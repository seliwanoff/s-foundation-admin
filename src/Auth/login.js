import { useEffect, useState } from "react";
import InputEl from "../components/inputEl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { loginSuccess, loginFailure, fetchUserData } from "../slice/AuthSlice";
import NProgress from "nprogress";

const LoginWrapper = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/panel/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    NProgress.start();
    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });

      dispatch(
        loginSuccess({
          user: response.data.admin,
          token: response.data.token,
        })
      );

      dispatch(fetchUserData());

      console.log("Login successful", response.data.admin);
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
      console.error(error);
      alert(error?.response && error?.response?.data?.message);
    } finally {
      NProgress.done(); // End progress regardless of success/failure
    }
  };

  return (
    <div className="w-full h-[100vh] justify-center items-center flex bg-[#fff] xl:px-8 px-4">
      <div className="w-full xl:max-w-[450px] max-w-[450px] mx-auto xl:p-8 p-[24px] bg-white rounded-xl flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl leading-3 font-Polysans text-[#0d0c22] font-bold">
            Login
          </h4>
          <span className="font-Polysans font-normal text-[#121212] text-[14px] ">
            Enter your credentials
          </span>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <InputEl
              label={"Email"}
              type="email"
              onValueChange={handleEmailChange}
              placeholder="Enter your Email"
            />
            <InputEl
              label={"Password"}
              type="password"
              onValueChange={handlePasswordChange}
              placeholder="Enter your Password"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0d0c22] w-full h-[40px] flex  items-center max-w-[220px] justify-center rounded-md text-white font-Polysans text-[14px]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginWrapper;
