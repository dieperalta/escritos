import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#1E3A5F",
      color: "white",
      position: "fixed",
      left: 0,
      top: 0,
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* CONTENIDO SCROLLEABLE */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>

        <h2 style={{ marginBottom: "30px" }}>
          Datablitz
        </h2>

        <button
          onClick={() => navigate("/formulario")}
          style={btn(location.pathname === "/formulario")}
        >
          Formulario
        </button>

        <button
          onClick={() => navigate("/documento")}
          style={btn(location.pathname === "/documento")}
        >
          Documento
        </button>

        <button
          onClick={() => navigate("/historial")}
          style={btn(location.pathname === "/historial")}
        >
          Historial
        </button>

        <div style={{ marginTop: "auto" }} />

        <button onClick={logout} style={logoutBtn}>
          Salir
        </button>

      </div>
    </div>
  );
}

const btn = (active) => ({
  background: active ? "#2E86AB" : "transparent",
  color: "white",
  border: "none",
  padding: "10px",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: "5px",
  marginBottom: "10px"
});

const logoutBtn = {
  background: "#F26419",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Navbar;