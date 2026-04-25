from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatRequest(BaseModel):
    message: str
@app.get("/")
def home():
    return {"message": "ArogyaAI backend running"}
@app.get("/health")
def health():
    return {"status": "ok"}
@app.post("/chat")
def chat(req: ChatRequest):
    text = req.message.lower()
    if "fever" in text:
        reply = "Stay hydrated, rest, and monitor temperature."
    elif "headache" in text:
        reply = "Rest, hydrate, and reduce screen time."
    elif "cold" in text or "cough" in text:
        reply = "Warm fluids, steam inhalation, and rest may help."
    elif "chest pain" in text:
        reply = "Seek urgent medical care immediately."
    else:
        reply = "Please describe your symptoms in more detail."
    return {"reply": stay}
