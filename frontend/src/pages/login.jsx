import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarLogin = () => {
    if (usuario === "admin" && password === "admin") {
      localStorage.setItem("auth", "true"); 
      navigate("/documento");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={container}
    >
      <div style={card}>
        <h2 style={{ marginBottom: "20px" }}>
          Auditorías Sunat - Datablitz
        </h2>

        <p style={{ marginBottom: "20px", color: "#555" }}>
          Ingreso al sistema
        </p>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: "#DC2626", marginBottom: "10px" }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={manejarLogin}
          style={boton}
        >
          Ingresar
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ESTILOS */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #1E3A5F, #2E86AB)"
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  width: "350px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  transition: "all 0.2s ease",
};

const boton = {
  width: "100%",
  background: "#2E86AB",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Login;