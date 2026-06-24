from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models.user import User
from app.crud.notification import (
    get_notifications,
    mark_as_read,
    mark_all_as_read,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("/")
def read_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_notifications(db, current_user.id)


@router.patch("/{notification_id}/read")
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    notification = mark_as_read(
        db,
        notification_id,
        current_user.id,
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    return notification


@router.patch("/read-all")
def read_all_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    mark_all_as_read(db, current_user.id)

    return {
        "message": "All notifications marked as read"
    }