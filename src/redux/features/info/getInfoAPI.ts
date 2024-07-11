import API from "../../../services/API";
import { api, setAuthToken } from "../../../utils/setAuthToken";
const getInfo = async () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const response = await api.get(API.GET_MY_INFO);

  return response.data;
};

export default getInfo;

