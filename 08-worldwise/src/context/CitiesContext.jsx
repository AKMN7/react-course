/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useContext, createContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

export function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [currentCity, setCurrentCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            setCities(data);
            setIsLoading(false);
        }

        fetchCities();
    }, []);

    async function fetchCity(id) {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
        setIsLoading(false);
    }

    return <CitiesContext.Provider value={{ cities, currentCity, fetchCity, isLoading }}>{children}</CitiesContext.Provider>;
}

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("Context used outside provider!");
    return context;
}
