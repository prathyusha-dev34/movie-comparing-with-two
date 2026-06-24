from sqlalchemy.orm import Session

from app.models.notification import Notification


def create_notification(
    db: Session,
    user_id: int,
    message: str,
    notification_type: str
):
    notification = Notification(
        user_id=user_id,
        message=message,
        notification_type=notification_type
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(db: Session, user_id: int):
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )


def mark_as_read(db: Session, notification_id: int, user_id: int):
    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == user_id
        )
        .first()
    )

    if notification:
        notification.is_read = True
        db.commit()
        db.refresh(notification)

    return notification


def mark_all_as_read(db: Session, user_id: int):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        )
        .all()
    )

    for notification in notifications:
        notification.is_read = True

    db.commit()

    return notifications