import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../components/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        <div className="icon">🐾</div>

        <h2>Bine ai venit!</h2>
        <p className="subtitle">Conectează-te pentru a continua</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Parola"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login →</button>

        </form>

        <p>
          Nu ai cont?{" "}
          <span onClick={() => navigate("/register")}>
            Creează unul
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;