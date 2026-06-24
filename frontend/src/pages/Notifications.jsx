import React, { useEffect, useState } from "react";

import NotificationCard from "../components/NotificationCard";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    await markAsRead(id);
    loadNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    loadNotifications();
  };

  const handleMarkAsRead = async (id) => {
  await markAsRead(id);
  fetchNotifications();
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onRead={handleRead}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Notifications;