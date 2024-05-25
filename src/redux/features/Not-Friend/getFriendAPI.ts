import API from "../../../services/API";
import { api, setAuthToken } from "../../../utils/setAuthToken";
const getFriend = async () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const response = await api.get(API.GET_NOT_FRIEND);
  console.log(response)
  return response.data;
};

export default getFriend;
