import API from "../../../services/API";
import {
    addPostStart,
    addPostFailure,
    addPostSuccess

  } from "./addPostSlice";
import { api, setAuthToken } from "../../../utils/setAuthToken";


 export const addPost = async (dispatch: any, formData: any): Promise<void> => {
  const token =localStorage.getItem("token");
  setAuthToken(token);
  dispatch(addPostStart());
  console.log(formData)
  try {
    const res = await api.post(API.ADD_POST, formData,   {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addPostSuccess(res.data));
   
  } catch (err) {
    console.error(err);
    dispatch(addPostFailure());
  }
};
