import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:8000";

function App() {
    const [cities, setCities] = useState([]);
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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
