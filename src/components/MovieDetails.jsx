import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { toggleFavorite, toggleWatchlist } from "../redux/actions";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ movie, setMovie ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const favorites = useSelector(s => s.favorites);
  const watchlist = useSelector(s => s.watchlist);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } 
      catch (error) {
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return <p>Loading details...</p>;

  if (!movie)
    return <div className="alert alert-danger">
      Movie not found.
    </div>;

  const favorite = favorites.includes(movie.id);
  const saved = watchlist.includes(movie.id);

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back
      </Link>

      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-4">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="img-fluid details-poster"
                alt={movie.title}
              />
            )}
          </div>

          <div className="col-md-8">
            <div className="card-body p-4">
              <h1>{movie.title}</h1>

              <p>
                {movie.vote_average?.toFixed(1)}/10
              </p>

              <p>
                <b>Release:</b> {movie.release_date}
              </p>

              <p>
                <b>Genre:</b>{" "}
                {movie.genres?.map(g => g.name).join(", ")}
              </p>

              <p>
                <b>Language:</b>{" "}
                {movie.original_language}
              </p>

              <hr />

              <h5>Description</h5>
              <p>{movie.overview}</p>

              <h5>Cast</h5>
              <p>
                {movie.credits?.cast
                  ?.slice(0, 5)
                  .map(p => p.name)
                  .join(", ")}
              </p>

              <button
                className="btn btn-warning me-2"
                onClick={() =>
                  dispatch(toggleFavorite(movie.id))
                }
              >
                {favorite ?
                  "Remove Favorite" :
                  "Favorite"}
              </button>

              <button
                className="btn btn-success"
                onClick={() =>
                  dispatch(toggleWatchlist(movie.id))
                }
              >
                {saved ?
                  "Remove Watchlist" :
                  "Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;