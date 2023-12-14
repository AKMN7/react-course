import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";

function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);

    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng]);

    return (
        <div className={styles.mapContainer}>
            <MapContainer className={styles.map} center={mapPosition} zoom={5} scrollWheelZoom={true}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                {cities.map((el) => (
                    <Marker position={[el.position.lat, el.position.lng]} key={el.id}>
                        <Popup>{el.cityName}</Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position, 5);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });
}

export default Map;
