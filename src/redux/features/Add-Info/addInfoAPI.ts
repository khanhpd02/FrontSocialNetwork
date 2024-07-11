
import API from "../../../services/API";
import {
    addInfoStart,
    addInfoFailure,
    addInfoSuccess

  } from "./addInfoSlice";
import { api, setAuthToken } from "../../../utils/setAuthToken";


 export const addInfo = async (dispatch: any, data: any): Promise<void> => {
  const token =localStorage.getItem("token");
  setAuthToken(token);
  dispatch(addInfoStart());
  try {
    const res = await api.post(API.ADD_INFO, data,   {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addInfoSuccess(res.data));
  } catch (err) {
    console.error(err);
    dispatch(addInfoFailure());
  }
};
