export const addMovie = movie => ({
  type: "ADD_MOVIE",
  payload: movie
});

export const updateMovie = movie => ({
  type: "UPDATE_MOVIE",
  payload: movie
});

export const deleteMovie = id => ({
  type: "DELETE_MOVIE",
  payload: id
});

export const setTMDBMovies = movies => ({
  type: "SET_TMDB_MOVIES",
  payload: movies
});

export const toggleFavorite = id => ({
  type: "TOGGLE_FAVORITE",
  payload: id
});

export const toggleWatchlist = id => ({
  type: "TOGGLE_WATCHLIST",
  payload: id
});