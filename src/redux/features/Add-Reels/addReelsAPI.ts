import API from "../../../services/API";
import {
    addReelsStart,
    addReelsFailure,
    addReelsSuccess

  } from "./addReelsSlice";
import { api, setAuthToken } from "../../../utils/setAuthToken";


 export const addReelss = async (dispatch: any, formData: any, type:string): Promise<void> => {
  const token =localStorage.getItem("token");
  setAuthToken(token);
  dispatch(addReelsStart());
  console.log(formData)
  try {
    if(type === "video/mp4") {
      console.log(2)
      const res = await api.post(API.POST_REELS_VIDEO, formData,   {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addReelsSuccess(res.data));
    }
    else {
      console.log(1)
      const res = await api.post(API.POST_REELS_IMAGE, formData,   {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addReelsSuccess(res.data));
    }
   
   
   
  } catch (err) {
    console.error(err);
    dispatch(addReelsFailure());
  }
};
