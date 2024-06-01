import API from "../../../services/API";
import {
    addPostStart,
    addPostFailure,
    addPostSuccess

  } from "./addPostSlice";
import { api, setAuthToken } from "../../../utils/setAuthToken";
import toast from "react-hot-toast";


 export const addPost = async (dispatch: any, formData: any): Promise<void> => {
  const token =localStorage.getItem("token");
  setAuthToken(token);
  dispatch(addPostStart());
  try {
    const res = await api.post(API.ADD_POST, formData,   {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Thêm post thành công!");
    dispatch(addPostSuccess(res.data));
   
  } catch (err) {
    console.error(err);
    toast.error("Thêm post thất bại!");
    dispatch(addPostFailure());
  }
};
