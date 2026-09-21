import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import { addMovie, setTMDBMovies } from "../redux/actions";

function MovieSearch() {
    const dispatch = useDispatch();
    const results = useSelector(s => s.tmdbMovies);
    const movies = useSelector(s => s.movies);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            dispatch(setTMDBMovies([]));
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                const data = await searchMovies(query);
                dispatch(setTMDBMovies(data));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, dispatch]);

    const add = movie => {
        if (movies.some(m => m.tmdbId === movie.id)) {
            alert("Movie already exists.");
            return;
        }

        dispatch(addMovie({
            id: Date.now(),
            tmdbId: movie.id,
            title: movie.title,
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "",
            genre: "Movie",
            year: movie.release_date
                ? movie.release_date.substring(0, 4)
                : "",
            rating: movie.vote_average?.toFixed(1) || "0",
            language: movie.original_language || "",
            description: movie.overview || ""
        }));
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
                <h2>Search Movies</h2>
                <Link to="/" className="btn btn-secondary">
                    Back
                </Link>
            </div>

            <input
                className="form-control mb-4"
                placeholder="Type movie name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {loading && <p>Searching...</p>}

            {!loading && query && (
                <div className="row g-4">
                    {results.map(movie => (
                        <div className="col-6 col-md-4 col-lg-3"
                            key={movie.id}>
                            <div className="card h-100 shadow-sm">
                                {movie.poster_path ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        className="card-img-top movie-poster"
                                        alt={movie.title}
                                    /> :
                                    <div className="no-poster">
                                        No Poster
                                    </div>
                                }

                                <div className="card-body">
                                    <h5>{movie.title}</h5>
                                    <p>{movie.vote_average?.toFixed(1)}</p>

                                    <Link
                                        to={`/movie/${movie.id}`}
                                        className="btn btn-outline-primary btn-sm me-2"
                                    >
                                        Details
                                    </Link>

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => add(movie)}
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieSearch;