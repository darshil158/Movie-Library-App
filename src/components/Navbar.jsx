import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand fw-bold">
                    MovieZone
                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Movies
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/search" className="nav-link">
                                Search
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/my-movies" className="nav-link">
                                My Library
                            </Link>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link">
                                {username}
                            </span>
                        </li>

                        <li className="nav-item">
                            <button
                                className="btn btn-danger btn-sm mt-1"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;