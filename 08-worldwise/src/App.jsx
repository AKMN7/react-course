import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";

import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="login" element={<Login />} />
                        <Route path="app" element={<AppLayout />}>
                            <Route index element={<Navigate replace to="cities" />} />
                            <Route path="cities" element={<CityList />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
