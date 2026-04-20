def classify_general_case(message: str) -> str:
    text = message.lower()

    moderate_keywords = [
        "fever",
        "vomiting",
        "cough",
        "headache",
        "stomach pain",
        "weakness",
        "body pain",
        "sore throat",
        "cold",
        "dizziness",
    ]

    if any(keyword in text for keyword in moderate_keywords):
        return "moderate"

    return "mild"