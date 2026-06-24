import axios from "axios";

const API = "http://127.0.0.1:8000";

const getToken = () => localStorage.getItem("token");

export const getNotifications = async () => {
  const res = await axios.get(`${API}/notifications`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.data;
};

export const markAsRead = async (id) => {
  const res = await axios.patch(
    `${API}/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

export const deleteNotification = async (id) => {
  const res = await axios.delete(
    `${API}/notifications/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};
export const getUnreadCount = async () => {
  const res = await axios.get(
    `${API}/notifications/unread-count`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};