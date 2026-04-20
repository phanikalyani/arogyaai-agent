from fastapi import APIRouter
from app.services.hospital_service import get_nearby_hospitals

router = APIRouter()

@router.get("/hospitals")
def hospitals(lat: float, lon: float):
    return get_nearby_hospitals(lat, lon)