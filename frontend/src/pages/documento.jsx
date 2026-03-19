import { useState } from "react";
import { motion } from "framer-motion";

const colores = {
  primary: "#1E3A5F",
  secondary: "#2E86AB",
  accent: "#F26419",
  success: "#16A34A",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#1F2937"
};

function Documento({ historial, setHistorial }) {
  const [datos, setDatos] = useState([]);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  const [precio, setPrecio] = useState("");
  const [precioConfirmado, setPrecioConfirmado] = useState("");

  const [imagen, setImagen] = useState(null);
  const [imagenConfirmada, setImagenConfirmada] = useState(null);

  const cargarDatos = async () => {
    const response = await fetch("http://127.0.0.1:9000/sap-datos");
    const data = await response.json();
    setDatos(data);
    setMostrarTexto(true);
  };

  const exportarPDF = async () => {
    const proveedor = datos[0]?.nombre || "XXX";
    const factura = datos[1]?.id || "XXX";

    const response = await fetch("http://127.0.0.1:9000/generar-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proveedor,
        factura,
        precio: precioConfirmado,
        imagen: imagenConfirmada,
      }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte.pdf";
    a.click();
  };

  const confirmarDatos = () => {
    const ahora = new Date();

    if (precio) setPrecioConfirmado(precio);
    if (imagen) setImagenConfirmada(imagen);

    setHistorial([
      {
        tipo: "Actualización",
        precio,
        imagen,
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString(),
      },
      ...historial,
    ]);

    setPrecio("");
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImagen(reader.result);
    reader.readAsDataURL(file);
  };

  const proveedor = datos[0]?.nombre || "XXX";
  const factura = datos[1]?.id || "XXX";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginLeft: "220px",
        height: "100vh",
        overflowY: "auto",   
        background: colores.bg,
        padding: "30px"
    }}>
      

      {/* CONTENIDO */}
      <div style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
        width: "100%",
        flex: 1
      }}>

        {/* BOTONES */}
        <div style={{ marginBottom: "20px" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={btnPrimario}
            onClick={cargarDatos}
            >
            Cargar datos
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={btnPrimario}
            onClick={exportarPDF}
            >
            Exportar PDF
          </motion.button>
        </div>

        {mostrarTexto && (
          <div style={{ display: "flex", gap: "20px" }}>

            {/* IZQUIERDA */}
            <motion.div
              transition={{ duration: 0.2 }}
              style={card}
            >
              <p><strong>Punto 6:</strong> Crédito fiscal...</p>

              <p>
                SUNAT desconoce el crédito fiscal por proveedor{" "}
                <span style={rojo}>{proveedor}</span> con factura{" "}
                <span style={rojo}>{factura}</span>.
              </p>

              <p>
                Precios <span style={rojo}>{precioConfirmado || "XXX"}</span>
              </p>

              {imagenConfirmada && (
                <img src={imagenConfirmada} style={{
                  marginTop: "20px",
                  maxWidth: "100%",
                  borderRadius: "8px"
                }} />
              )}

              <hr />

              <h3>Agregar datos manualmente</h3>

              <label>Precios:</label>
              <input
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                style={input}
              />

              <label>Cargar imagen:</label>
              <input type="file" onChange={manejarImagen} />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={btnPrimario}
                onClick={confirmarDatos}
                >
                Confirmar
              </motion.button>
            </motion.div>

          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ESTILOS */
const btnPrimario = {
  background: "#2E86AB",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const btnExito = {
  background: "#16A34A",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease"
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const rojo = {
  color: "red",
  fontWeight: "bold"
};

const histItem = {
  border: "1px solid #eee",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px"
};

export default Documento;