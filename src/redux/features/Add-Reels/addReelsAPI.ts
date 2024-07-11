import API from "../../../services/API";
import {
    addReelsStart,
    addReelsFailure,
    addReelsSuccess

  } from "./addReelsSlice";
import { api, setAuthToken } from "../../../utils/setAuthToken";
import toast from "react-hot-toast";


 export const addReelss = async (dispatch: any, formData: any, type:string): Promise<void> => {
  const token =localStorage.getItem("token");
  setAuthToken(token);
  dispatch(addReelsStart());
  try {
    if(type === "video/mp4") {
      const res = await api.post(API.POST_REELS_VIDEO, formData,   {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Thêm Reels thành công!");
      dispatch(addReelsSuccess(res.data));
    }
    else {
      const res = await api.post(API.POST_REELS_IMAGE, formData,   {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      
      });  toast.success("Thêm Reels thành công!");
      dispatch(addReelsSuccess(res.data));
    }
   
   
   
  } catch (err) {
    toast.error("Thêm Reels thất bại!");
    dispatch(addReelsFailure());
  }
};
