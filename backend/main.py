# backend/main.py
import os
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# Optional Gemini support
GEMINI_AVAILABLE = True
try:
    import google.generativeai as genai
except Exception:
    GEMINI_AVAILABLE = False

app = FastAPI(
    title="ArogyaAI Backend",
    version="1.0.0"
)
# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://phanikalyani-arogyaai-agent.vercel.app",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------
# Request Models
# -----------------------------
class ChatRequest(BaseModel):
    message: str
# -----------------------------
# Gemini Config
# -----------------------------
gemini_model: Optional[object] = None

if GEMINI_AVAILABLE:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    if api_key:
        try:
            genai.configure(api_key=api_key)
            gemini_model = genai.GenerativeModel("gemini-1.5-flash")
        except Exception:
            gemini_model = None
# -----------------------------
# Utility Rules Engine
# -----------------------------
def local_health_response(user_text: str) -> str:
    text = user_text.lower()

    if "fever" in text:
        return (
            "Fever may be caused by viral or bacterial infection.\n"
            "• Stay hydrated\n"
            "• Rest well\n"
            "• Monitor temperature\n"
            "• Seek medical care if fever is high or lasts more than 3 days."
        )
    if "headache" in text:
        return (
            "Headache may be related to stress, dehydration, or lack of sleep.\n"
            "• Drink water\n"
            "• Rest in a quiet room\n"
            "• Avoid screen strain\n"
            "• Seek care if severe or sudden."
        )
    if "cold" in text or "cough" in text:
        return (
            "Cold symptoms are often viral.\n"
            "• Warm fluids\n"
            "• Steam inhalation\n"
            "• Rest\n"
            "• Seek care if breathing difficulty develops."
        )
    if "chest pain" in text:
        return (
            "Chest pain can be serious.\n"
            "⚠ Seek urgent medical evaluation immediately, especially if associated with sweating, shortness of breath, or radiating pain."
        )
    if "diabetes" in text or "sugar" in text:
        return (
            "For diabetes management:\n"
            "• Monitor blood glucose regularly\n"
            "• Follow balanced diet\n"
            "• Exercise regularly\n"
            "• Continue prescribed medications\n"
            "• Follow up with doctor."
        )
    if "bp" in text or "blood pressure" in text:
        return (
            "For blood pressure care:\n"
            "• Reduce salt intake\n"
            "• Exercise regularly\n"
            "• Manage stress\n"
            "• Take medications as prescribed\n"
            "• Monitor BP regularly."
        )
    if "skin rash" in text:
        return (
            "Skin rash may be due to allergy, irritation, infection, or heat.\n"
            "• Keep area clean and dry\n"
            "• Avoid scratching\n"
            "• Use mild soap\n"
            "• Seek care if spreading, painful, or with fever."
        )
return (
        "Thank you for your question.\n"
        "Please describe your symptoms in more detail including duration, severity, age, and related issues so I can guide you better."
    )
# -----------------------------
# AI Response Generator
# -----------------------------
def generate_response(user_text: str) -> str:
    # Use Gemini if available
    if gemini_model:
        try:
            prompt = f"""
You are ArogyaAI, a helpful health assistant.
Give short, safe, practical health guidance.
Avoid diagnosis certainty.
Encourage doctor consultation when needed.
User: {user_text}
"""
          response = gemini_model.generate_content(prompt)

            if response and getattr(response, "text", None):
                return response.text.strip()
        except Exception:
            pass
    # Fallback local logic
    return local_health_response(user_text)
# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "ArogyaAI backend running successfully"
    }
@app.get("/health")
def health():
    return {
        "status": "ok"
    }
@app.post("/chat")
def chat(req: ChatRequest):
    reply = generate_response(req.message)

       return {
        "reply": reply
    }
# -----------------------------
# Local Run
# -----------------------------
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
