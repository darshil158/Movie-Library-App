import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = e => {
        e.preventDefault();

        if (!username || !password) {
            alert("Enter username and password.");
            return;
        }
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        navigate("/");
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <div className="card shadow">
                    <div className="card-body p-4">
                        <h2 className="mb-4">
                            MovieZone Login
                        </h2>

                        <form onSubmit={login}>
                            <input
                                className="form-control mb-3"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <input
                                className="form-control mb-3"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;