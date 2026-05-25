import axios from "axios";
import { BASE_URL as API_BASE } from "../../utils/baseEndpoint";
//create that must return a promise
const BASE_URL = `${API_BASE}/comments`;

//!Create comment api
export const createCommentAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/create`, data, {
    withCredentials: true,
  });
  return response.data;
};
