def is_emergency_case(message: str) -> bool:
    text = message.lower()

    emergency_keywords = [
        "chest pain",
        "shortness of breath",
        "breathing difficulty",
        "difficulty breathing",
        "unconscious",
        "fainted",
        "severe bleeding",
        "stroke",
        "heart attack",
        "seizure",
        "vomiting blood",
        "blood in vomit",
        "severe burn",
        "suicidal",
    ]

    return any(keyword in text for keyword in emergency_keywords)


def emergency_guidance(message: str) -> str:
    return (
        "Possible concern: Your symptoms may indicate an urgent medical problem.\n"
        "Basic advice: Seek immediate medical attention or go to the nearest hospital.\n"
        "Next step: If symptoms are severe or worsening, contact emergency services right away."
    )