# Simple in-memory database (for hackathon)

patients = {
    "user1": {
        "age": 25,
        "gender": "male",
        "conditions": ["diabetes"],
        "allergies": ["penicillin"]
    }
}


def get_patient(user_id="user1"):
    return patients.get(user_id, {})