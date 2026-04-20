from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ Database
from app.db import Base, engine

# ✅ Import ALL models (VERY IMPORTANT)
from app.models.user import User
from app.models.chat_history import ChatHistory

# ✅ Routes
from app.routes.chat import router as chat_router
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.routes.hospital import router as hospital_router

# 🚀 Create tables
Base.metadata.create_all(bind=engine)

# 🚀 App instance
app = FastAPI()

# ✅ CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register routes
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(hospital_router)

# ✅ Health check
@app.get("/")
def home():
    return {"message": "ArogyaAI Backend Running 🚀"}