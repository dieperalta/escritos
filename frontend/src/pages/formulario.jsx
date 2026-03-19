import { useState } from "react";
import { motion } from "framer-motion";

function Formulario() {
  const [form, setForm] = useState({
    precio: "",
    costo: "",
    proveedor: "",
    fecha: "",
    imagen: null
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imagen: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    console.log("FORM DATA:", form);
    alert("Formulario guardado (demo)");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginLeft: "220px",
        height: "100vh",
        overflowY: "auto",
        background: "#F5F7FA",
        padding: "30px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Formulario de Registro</h2>

      <div style={card}>
        
        <label>Proveedor</label>
        <input
          name="proveedor"
          value={form.proveedor}
          onChange={manejarCambio}
          style={input}
        />

        <label>Precio</label>
        <input
          name="precio"
          value={form.precio}
          onChange={manejarCambio}
          style={input}
        />

        <label>Costo</label>
        <input
          name="costo"
          value={form.costo}
          onChange={manejarCambio}
          style={input}
        />

        <label>Fecha</label>
        <input
          name="fecha"
          value={form.fecha}
          onChange={manejarCambio}
          placeholder="Ej: 19/03/2026"
          style={input}
        />

        <label>Adjuntar sustento</label>
        <input type="file" onChange={manejarImagen} />

        {form.imagen && (
          <img
            src={form.imagen}
            alt="preview"
            style={{
              marginTop: "15px",
              maxWidth: "300px",
              borderRadius: "8px"
            }}
          />
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={guardar}
          style={btnPrimario}
        >
          Guardar
        </motion.button>

      </div>
    </motion.div>
  );
}

/* ESTILOS */
const card = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  maxWidth: "500px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btnPrimario = {
  background: "#2E86AB",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px"
};

export default Formulario;