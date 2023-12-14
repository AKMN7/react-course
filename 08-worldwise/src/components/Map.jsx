import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";

import Button from "../components/Button";

function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [searchParams] = useSearchParams();
    const { isLoading: geoIsLoading, position: geoPosition, getPosition } = useGeolocation();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng]);

    useEffect(() => {
        if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
    }, [geoPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geoPosition && (
                <Button type="position" onClick={getPosition}>
                    {geoIsLoading ? "Loading" : "Use your position"}
                </Button>
            )}
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
