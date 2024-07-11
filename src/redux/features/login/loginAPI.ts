import publicAxios from "../../../services/requestMethods";
import API from "../../../services/API";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    signupStart,
    signupSuccess,
    signupFailure,
  } from "./loginSlice";
import toast from "react-hot-toast";
 export const login = async (dispatch: any, data: any): Promise<void> => {
  dispatch(loginStart());
  try {

    const res = await publicAxios.post(API.LOGIN, data);
    if(res?.data?.data?.data?.role?.[0] === "Admin")
    {
      toast.error("Đăng nhập thất bại!");
    }
    else {
      toast.success("Đăng nhập thành công!");
    }
    dispatch(loginSuccess(res.data));
  } catch (err:any) {
    toast.error(err.response.data.message)
   
     dispatch(loginFailure());

  }
};
export const signup = async (dispatch:any, data:any) => {
    dispatch(signupStart());
    try {
      const res = await publicAxios.post(API.REGISTER, data);
      dispatch(signupSuccess(res.data));
    } catch (err) {
      dispatch(signupFailure());
    }
  };
  