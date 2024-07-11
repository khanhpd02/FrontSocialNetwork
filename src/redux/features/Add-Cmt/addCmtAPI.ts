import API from "../../../services/API";
import {
    addCmtStart,
    addCmtFailure,
    addCmtSuccess

  } from "./addCmtSlice";
import { api, setAuthToken } from "../../../utils/setAuthToken";


 export const addCmt = async (dispatch: any, data: any): Promise<void> => {
  const token =localStorage.getItem("token");
  setAuthToken(token);
  dispatch(addCmtStart());
  try {
    const res = await api.post(API.POST_COMMENT, data,    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   
    dispatch(addCmtSuccess(res.data));
  } catch (err) {
    console.error(err);
    dispatch(addCmtFailure());
  }
};
