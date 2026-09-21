import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import MyMovies from "./components/MyMovies";
import MovieForm from "./components/MovieForm";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Navbar />
              <main className="container py-4">
                <Routes>
                  <Route
                    path="/"
                    element={<MovieList />}
                  />

                  <Route
                    path="/search"
                    element={<MovieSearch />}
                  />

                  <Route
                    path="/movie/:id"
                    element={<MovieDetails />}
                  />

                  <Route
                    path="/my-movies"
                    element={<MyMovies />}
                  />

                  <Route
                    path="/add"
                    element={<MovieForm />}
                  />

                  <Route
                    path="/edit/:id"
                    element={<MovieForm />}
                  />
                </Routes>
              </main>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;