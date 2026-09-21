const getData = (key, def = []) => {
  return JSON.parse(localStorage.getItem(key)) || def;
};

const initialState = {
  movies: getData("movies"),
  tmdbMovies: [],
  favorites: getData("favorites"),
  watchlist: getData("watchlist")
};

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_MOVIE": {
      const movies = [...state.movies, action.payload];
      save("movies", movies);
      return { ...state, movies };
    }

    case "UPDATE_MOVIE": {
      const movies = state.movies.map(m =>
        m.id === action.payload.id ? action.payload : m
      );
      save("movies", movies);
      return { ...state, movies };
    }

    case "DELETE_MOVIE": {
      const movies = state.movies.filter(
        m => m.id !== action.payload
      );
      save("movies", movies);
      return { ...state, movies };
    }

    case "SET_TMDB_MOVIES":
      return { ...state, tmdbMovies: action.payload };

    case "TOGGLE_FAVORITE": {
      const favorites = state.favorites.includes(action.payload)
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      save("favorites", favorites);
      return { ...state, favorites };
    }

    case "TOGGLE_WATCHLIST": {
      const watchlist = state.watchlist.includes(action.payload)
        ? state.watchlist.filter(id => id !== action.payload)
        : [...state.watchlist, action.payload];
      save("watchlist", watchlist);
      return { ...state, watchlist };
    }

    default:
      return state;
  }
};

export default reducer;