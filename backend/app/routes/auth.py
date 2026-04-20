from fastapi import APIRouter
from app.db import SessionLocal
from app.models.user import User
from app.auth import hash_password, verify_password, create_token

router = APIRouter()

# ✅ SIGNUP
@router.post("/signup")
def signup(data: dict):
    try:
        db = SessionLocal()

        existing = db.query(User).filter(User.id == data["id"]).first()

        if existing:
            db.close()
            return {"message": "User already exists"}

        new_user = User(
            id=data["id"],
            password=hash_password(data["password"]),
            age=int(data.get("age", 0)),
            gender=data.get("gender", ""),
            conditions=data.get("conditions", ""),
            allergies=data.get("allergies", "")
        )

        db.add(new_user)
        db.commit()
        db.close()

        return {"message": "Signup successful"}

    except Exception as e:
        print("SIGNUP ERROR:", e)
        return {"message": "Signup failed"}


# ✅ LOGIN
@router.post("/login")
def login(data: dict):
    try:
        db = SessionLocal()

        user = db.query(User).filter(User.id == data["id"]).first()

        if not user:
            db.close()
            return {"message": "User not found"}

        if not verify_password(data["password"], user.password):
            db.close()
            return {"message": "Wrong password"}

        token = create_token({"user_id": user.id})

        db.close()

        return {
            "message": "Login successful",
            "token": token
        }

    except Exception as e:
        print("LOGIN ERROR:", e)
        return {"message": "Login failed"}