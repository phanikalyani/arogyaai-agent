def analyze_symptoms(text: str):
    text = text.lower()

    if "chest pain" in text or "breathing" in text:
        return "HIGH"
    elif "fever" in text:
        return "MEDIUM"
    return "LOW"