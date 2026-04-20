import requests

def get_nearby_hospitals(lat: float, lon: float):
    url = "https://overpass-api.de/api/interpreter"

    query = f"""
    [out:json];
    (
      node["amenity"="hospital"](around:5000,{lat},{lon});
    );
    out;
    """

    response = requests.get(url, params={"data": query})
    data = response.json()

    hospitals = []

    for el in data.get("elements", []):
        name = el.get("tags", {}).get("name", "Unknown Hospital")

        hospitals.append({
            "name": name,
            "lat": el["lat"],
            "lon": el["lon"]
        })

    return hospitals