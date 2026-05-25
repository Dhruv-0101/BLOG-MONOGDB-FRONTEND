import axios from "axios";
import { BASE_URL as API_BASE } from "../../utils/baseEndpoint";
//create that must return a promise
const BASE_URL = `${API_BASE}/earnings`;

//! Fetch all earnings
export const fetchAllEarningsAPI = async () => {
  const posts = await axios.get(BASE_URL);
  return posts.data;
};

//! Fetch all user earnings
export const getMyEarningsAPI = async () => {
  const posts = await axios.get(`${BASE_URL}/my-earnings`, {
    withCredentials: true,
  });
  return posts.data;
};
