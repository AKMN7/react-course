/* eslint-disable react-refresh/only-export-components */
import { useCallback } from "react";
import { useEffect, useReducer, useContext, createContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false
};

function reducer(state, action) {
    if (action.type === "loading") {
        return { ...state, isLoading: true };
    }

    if (action.type === "cities/loaded") {
        return { ...state, isLoading: false, cities: action.payload };
    }

    if (action.type === "city/loaded") {
        return { ...state, isLoading: false, currentCity: action.payload };
    }

    if (action.type === "city/created") {
        return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
    }

    if (action.type === "city/deleted") {
        return { ...state, isLoading: false, cities: state.cities.filter((el) => el.id !== action.payload) };
    }
}

export function CitiesProvider({ children }) {
    const [{ cities, currentCity, isLoading }, dispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        fetchCities();
    }, []);

    async function fetchCities() {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
    }

    const fetchCity = useCallback(
        async function (id) {
            if (id === currentCity.id) return;
            dispatch({ type: "loading" });
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data });
        },
        [currentCity.id]
    );

    async function createCity(newCity) {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        dispatch({ type: "city/created", payload: data });
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        await fetch(`${BASE_URL}/cities/${id}`, {
            method: "DELETE"
        });
        dispatch({ type: "city/deleted", payload: id });
    }

    return <CitiesContext.Provider value={{ cities, currentCity, fetchCity, createCity, deleteCity, isLoading }}>{children}</CitiesContext.Provider>;
}

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("Context used outside provider!");
    return context;
}
