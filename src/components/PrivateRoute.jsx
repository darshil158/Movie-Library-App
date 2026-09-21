import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const login = localStorage.getItem("isLoggedIn");

    return login ?
        children : <Navigate to="/login" replace />;
}

export default PrivateRoute;