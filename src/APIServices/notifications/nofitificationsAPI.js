import axios from "axios";
import { BASE_URL as API_BASE } from "../../utils/baseEndpoint";
//create that must return a promise
const BASE_URL = `${API_BASE}/notifications`;

//!fetch all notifications
export const fetchNotificationsAPI = async (postData) => {
  const response = await axios.get(`${BASE_URL}`, {
    withCredentials: true,
  });
  return response.data;
};

//! Read notification
export const readNotificationAPI = async (notificationId) => {
  const posts = await axios.put(`${BASE_URL}/${notificationId}`, {});
  return posts.data;
};
