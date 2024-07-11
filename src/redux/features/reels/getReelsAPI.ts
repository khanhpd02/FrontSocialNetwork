import API from "../../../services/API";
import { api, setAuthToken } from "../../../utils/setAuthToken";
const getReels = async () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const response = await api.get(API.GET_ALL_REELS);

  return response.data;
};

export default getReels;
