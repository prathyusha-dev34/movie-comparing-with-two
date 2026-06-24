import React from "react";

function NotificationCard({
  notification,
  onRead,
  onDelete
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        background: notification.is_read
          ? "#f8f8f8"
          : "#e8f5ff"
      }}
    >
      <h4>{notification.message}</h4>

      <p>
        Type:
        {" "}
        {notification.notification_type}
      </p>

      <p>
        {new Date(notification.created_at).toLocaleString()}
      </p>

      {!notification.is_read && (
        <button onClick={() => onRead(notification.id)}>
          Mark as Read
        </button>
      )}

      <button
        onClick={() => onDelete(notification.id)}
        style={{
          marginLeft: 10,
          background: "red",
          color: "white"
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default NotificationCard;