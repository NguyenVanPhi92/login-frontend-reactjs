import axios from "axios";
import { toast } from "react-toastify";

import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      user
    );
    dispatch(loginSuccess(res.data));
    if (loginSuccess()) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      navigate("/loading");
    }
  } catch (err) {
    toast.error(`${err.response.data}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("error: ", err.response.data);
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());

  try {
    await axios.post("http://localhost:8000/api/v1/user/register", user);
    dispatch(registerSuccess());
    navigate("/login");
    toast.success("🦄 Register success!", {
      position: "top-right",
      autoClose: 600,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    dispatch(registerFailed());
    toast.error(`🦄 Register failed! ${error.response.data}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
