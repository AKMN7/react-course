import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "c2a2f3ff";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    const [query, setQuery] = useState("");
    const [selectedID, setSelectedID] = useState("tt1375666");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function addWatchedMovie(movie) {
        setWatched((curr) => [...curr, movie]);
    }

    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setError("");
                    setIsLoading(true);
                    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
                    const data = await res.json();

                    if (data.Response === "False") {
                        throw new Error("⛔ Movie Not Found!");
                    }

                    setMovies(data.Search);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                console.log("Resetting");
                setMovies([]);
                setError("");
                return;
            }

            fetchMovies();
        },
        [query]
    );

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                <BoxLayout>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} onSelect={setSelectedID} />}
                    {error && <ErrorMessage msg={error} />}
                </BoxLayout>

                <BoxLayout>
                    {selectedID ? (
                        <MovieDetails selectedID={selectedID} onClose={() => setSelectedID(null)} onUserRating={addWatchedMovie} />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList watched={watched} />
                        </>
                    )}
                </BoxLayout>
            </Main>
        </>
    );
}

function Loader() {
    return <p className="loader">Loading ...</p>;
}

function ErrorMessage({ msg }) {
    return <p className="error">{msg}</p>;
}

function NavBar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
}

function Search({ query, setQuery }) {
    return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function BoxLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function MovieList({ movies, onSelect }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie info={movie} key={movie.imdbID} onSelect={onSelect} />
            ))}
        </ul>
    );
}

function Movie({ info, onSelect }) {
    return (
        <li onClick={() => onSelect(info.imdbID)}>
            <img src={info.Poster} alt={`${info.Title} poster`} />
            <h3>{info.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{info.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieDetails({ selectedID, onClose, onUserRating }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function () {
            async function fetchMovieDetails() {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`);
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }

            fetchMovieDetails();
        },
        [selectedID]
    );

    function handleUserRating(rating) {
        const watchedMove = { ...movie, userRating: rating };
        onUserRating(watchedMove);
        onClose();
    }

    return isLoading ? (
        <Loader />
    ) : (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onClose}>
                    &larr;
                </button>

                <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />

                <div className="details-overview">
                    <h2>{movie.Title}</h2>
                    <p>
                        {movie.Released} &bull; {movie.Runtime}
                    </p>

                    <p>{movie.genre}</p>

                    <p>
                        <span>⭐</span> {movie.imdbRating} IMDB Rating
                    </p>
                </div>
            </header>

            <section>
                <div className="rating">
                    <StarRating max={10} size={24} onSet={handleUserRating} />
                </div>
                <p>
                    <em>{movie.Plot}</em>
                </p>
                <p>Starring {movie.Actors}</p>
                <p>Directed By: {movie.Director}</p>
            </section>
        </div>
    );
}

function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie }) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.Runtime}</span>
                </p>
            </div>
        </li>
    );
}
