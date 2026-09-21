# Movie Library

A React-based Movie Library application built with React, Redux, React Router, Axios, Bootstrap, and the TMDB API.

## Features

- User login and protected routes
- TMDB popular movie integration
- Dynamic movie search with debouncing
- Movie details with cast, genres, language, rating, release date, and description
- Personal movie library
- Add, edit, and delete movies
- Favorites and watchlist management
- Redux global state management
- LocalStorage data persistence
- Movie sorting by rating and release date
- Loading and error handling
- Responsive Bootstrap interface
- Client-side routing
- Environment-based API configuration
- Direct API integration without Redux Thunk

## Technology Stack

| Technology | Usage |
|---|---|
| React | UI development |
| Vite | Development and build tool |
| Redux | Global state management |
| React Redux | React-Redux integration |
| React Router DOM | Client-side routing |
| Axios | HTTP/API requests |
| Bootstrap | Responsive UI |
| TMDB API | Movie data |
| LocalStorage | Local persistence |

## Project Structure

```text
movie-library/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── tmdb.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieList.jsx
│   │   ├── MovieSearch.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── MyMovies.jsx
│   │   ├── MovieForm.jsx
│   │   ├── Login.jsx
│   │   └── PrivateRoute.jsx
│   │
│   ├── redux/
│   │   ├── actions.js
│   │   ├── reducer.js
│   │   └── store.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
