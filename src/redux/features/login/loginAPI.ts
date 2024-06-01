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
    console.log("Co vào", data)
    const res = await publicAxios.post(API.LOGIN, data);
    toast.success("Đăng nhập thành công!");
    dispatch(loginSuccess(res.data));
  } catch (err:any) {
    console.error(err.response.data.message);
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
  