import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../components/Auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Parolele nu coincid!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cont creat cu succes!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        <div className="icon">🐾</div>

        <h2>Creează cont</h2>
        <p className="subtitle">Completează datele pentru a continua</p>

        <form onSubmit={handleRegister}>

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

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmă parola"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register →</button>

        </form>

        <p>
          Ai deja cont?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;