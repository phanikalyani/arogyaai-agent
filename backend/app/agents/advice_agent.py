def basic_advice(risk):
    if risk == "HIGH":
        return "🚨 Emergency! Go to hospital immediately."
    elif risk == "MEDIUM":
        return "⚠️ Consult a doctor soon."
    else:
        return "✅ Rest and monitor symptoms."