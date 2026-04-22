import os
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

API_KEY = os.getenv("GEMINI_API_KEY")

print("Gemini key loaded:", bool(API_KEY))

genai.configure(api_key=API_KEY)


def generate_response(message: str, user_id="user1"):
    try:
        if not API_KEY:
            return "⚠ API key missing"

        model = genai.GenerativeModel("gemini-2.5-flash")

        prompt = f"""
You are ArogyaAI medical assistant.

User symptom: {message}

Give short helpful advice:
1. Possible causes
2. Basic care
3. When to see doctor
"""

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:
        print("GEMINI ERROR:", e)
        return "⚠ AI service failed"