import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addMovie, setTMDBMovies } from "../redux/actions";
import { getPopularMovies } from "../api/tmdb";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector(s => s.movies);
  const data = useSelector(s => s.tmdbMovies);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("rating");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getPopularMovies();
        dispatch(setTMDBMovies(result));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dispatch]);

  const sorted = [...data].sort((a, b) => {
    if (sort === "rating") return b.vote_average - a.vote_average;
    return new Date(b.release_date || 0) - new Date(a.release_date || 0);
  });

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

    alert("Movie added.");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">Popular Movies</h2>
          <p className="text-muted mb-0">
            Browse movies and add them to your library.
          </p>
        </div>

        <Link
          to="/my-movies"
          className="btn btn-dark my-library-btn"
        >
          My Library
        </Link>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Link to="/search" className="btn btn-primary">
          Search Movies
        </Link>

        <select
          className="form-select w-auto"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="rating">Sort by Rating</option>
          <option value="year">Sort by Newest</option>
        </select>
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" />
          <p>Loading movies...</p>
        </div>
      )}

      {!loading && (
        <div className="row g-4">
          {sorted.map(movie => (
            <div
              className="col-6 col-md-4 col-lg-3"
              key={movie.id}
            >
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

                  <p className="text-muted">
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "Unknown"}
                  </p>

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

export default MovieList;