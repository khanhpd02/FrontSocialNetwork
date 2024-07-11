import API from "../../../services/API";
import { api, setAuthToken } from "../../../utils/setAuthToken";
const getPost = async (numberOfPosts:string) => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const response = await api.get(API.GET_ALL_POST, {
    params: { numberOfPosts: numberOfPosts }, // Use params to send data in the query string
  });
  return response.data;
};

export default getPost;
