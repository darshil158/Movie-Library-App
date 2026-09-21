import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMovie,
  updateMovie
} from "../redux/actions";

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector(s => s.movies);

  const old = movies.find(
    m => m.id === Number(id)
  );

  const [movie, setMovie] = useState(
    old || {
      title: "",
      poster: "",
      genre: "",
      year: "",
      rating: "",
      language: "",
      description: ""
    }
  );

  const change = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const submit = e => {
    e.preventDefault();

    if (
      !movie.title ||
      !movie.genre ||
      !movie.year ||
      !movie.rating
    ) {
      alert("Fill required fields.");
      return;
    }

    if (id)
      dispatch(updateMovie(movie));
    else
      dispatch(addMovie({
        ...movie,
        id: Date.now()
      }));

    navigate("/my-movies");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="mb-4">
              {id ? "Edit Movie" : "Add Movie"}
            </h2>

            <form onSubmit={submit}>
              <input
                className="form-control mb-3"
                name="title"
                placeholder="Movie title"
                value={movie.title}
                onChange={change}
              />

              <input
                className="form-control mb-3"
                name="poster"
                placeholder="Poster URL"
                value={movie.poster}
                onChange={change}
              />

              <select
                className="form-select mb-3"
                name="genre"
                value={movie.genre}
                onChange={change}
              >
                <option value="">Select Genre</option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Animation</option>
              </select>

              <div className="row">
                <div className="col">
                  <input
                    className="form-control mb-3"
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={movie.year}
                    onChange={change}
                  />
                </div>

                <div className="col">
                  <input
                    className="form-control mb-3"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name="rating"
                    placeholder="Rating"
                    value={movie.rating}
                    onChange={change}
                  />
                </div>
              </div>

              <input
                className="form-control mb-3"
                name="language"
                placeholder="Language"
                value={movie.language}
                onChange={change}
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                name="description"
                placeholder="Description"
                value={movie.description}
                onChange={change}
              />

              <button className="btn btn-primary me-2">
                {id ? "Update" : "Add Movie"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/my-movies")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;