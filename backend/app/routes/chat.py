from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import generate_response

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    user_id: str = "user1"


@router.post("/chat")
async def chat(req: ChatRequest):
    # No outer fallback now
    reply = generate_response(req.message, req.user_id)
    return {"reply": reply}