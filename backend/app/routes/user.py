from fastapi import APIRouter
from app.db import SessionLocal
from app.models.user import User
from app.models.user import User

router = APIRouter()

@router.post("/create-user")
def create_user(data: dict):
    db = SessionLocal()

    user = User(
        id=data["id"],
        age=data["age"],
        gender=data["gender"],
        conditions=data.get("conditions", ""),
        allergies=data.get("allergies", "")
    )

    db.add(user)
    db.commit()
    db.close()

    return {"message": "User created"}