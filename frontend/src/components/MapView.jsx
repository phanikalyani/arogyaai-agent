import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

function MapView() {
  const [hospitals, setHospitals] = useState([]);
  const [position, setPosition] = useState([17.3850, 78.4867]); // default

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      setPosition([lat, lon]);

      axios
        .get(`http://localhost:8000/hospitals?lat=${lat}&lon=${lon}`)
        .then((res) => setHospitals(res.data));
    });
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hospitals.map((h, i) => (
        <Marker key={i} position={[h.lat, h.lon]}>
          <Popup>{h.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;