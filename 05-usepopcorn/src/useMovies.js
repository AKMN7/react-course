import { useEffect, useState } from "react";

const API_KEY = "c2a2f3ff";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setError("");
                    setIsLoading(true);
                    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, { signal: controller.signal });
                    const data = await res.json();

                    if (data.Response === "False") {
                        throw new Error("⛔ Movie Not Found!");
                    }

                    setMovies(data.Search);
                    setError();
                } catch (error) {
                    if (error.name !== "AbortError") setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            fetchMovies();

            return () => controller.abort();
        },
        [query]
    );

    return { movies, isLoading, error };
}
