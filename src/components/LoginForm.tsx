import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="card max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-lg">Iniciar sesión</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Entrar
      </button>
      <div className="register-link">
  ¿No tienes cuenta?
  <Link to="/register">
    <button className="btn-register">Registrarse</button>
  </Link>
</div>

    </form>
  );
};

export default LoginForm;