import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en-US"
    }
});

export const getPopularMovies = async () => {
    const res = await api.get("/movie/popular");
    return res.data.results;
};

export const searchMovies = async (query) => {
    const res = await api.get("/search/movie", {
        params: { query }
    });
    return res.data.results;
};

export const getMovieDetails = async (id) => {
    const res = await api.get(`/movie/${id}`, {
        params: { append_to_response: "credits" }
    });
    return res.data;
};

export default api;