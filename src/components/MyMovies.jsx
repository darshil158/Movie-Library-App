import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteMovie} from "../redux/actions";

function MyMovies(){
  const movies=useSelector(s=>s.movies);
  const dispatch=useDispatch();

  const remove=id=>{
    if(window.confirm("Delete this movie?"))
      dispatch(deleteMovie(id));
  };

  return(
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Movie Library</h2>
          <p className="text-muted mb-0">
            {movies.length} movies
          </p>
        </div>

        <Link
          to="/"
          className="btn btn-dark movie-list-btn"
        >
          Movie List
        </Link>
      </div>

      {!movies.length&&(
        <div className="alert alert-info">
          Your library is empty.
        </div>
      )}

      <div className="row g-4">
        {movies.map(movie=>(
          <div
            className="col-6 col-md-4 col-lg-3"
            key={movie.id}
          >
            <div className="card h-100 shadow-sm">
              {movie.poster?
                <img
                  src={movie.poster}
                  className="card-img-top movie-poster"
                  alt={movie.title}
                />:
                <div className="no-poster">
                  No Poster
                </div>
              }

              <div className="card-body">
                <h5>{movie.title}</h5>

                <p>Year: {movie.year}</p>
                <p>{movie.rating}</p>

                <Link
                  to={`/movie/${movie.tmdbId}`}
                  className="btn btn-primary btn-sm me-1"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${movie.id}`}
                  className="btn btn-warning btn-sm me-1"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={()=>remove(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyMovies;