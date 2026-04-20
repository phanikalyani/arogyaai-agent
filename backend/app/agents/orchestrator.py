from app.agents.emergency_agent import is_emergency_case, emergency_guidance
from app.agents.general_agent import classify_general_case


def route_case(message: str) -> dict:
    if is_emergency_case(message):
        return {
            "agent": "emergency",
            "severity": "high",
            "template": emergency_guidance(message),
        }

    severity = classify_general_case(message)

    return {
        "agent": "general",
        "severity": severity,
        "template": "",
    }