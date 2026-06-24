from sqlalchemy.orm import Session

from app.models.notification import Notification


def send_notification(
    db: Session,
    user_id: int,
    message: str,
    notification_type: str,
):
    notification = Notification(
        user_id=user_id,
        message=message,
        notification_type=notification_type,
        is_read=False,
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification