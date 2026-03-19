import { motion } from "framer-motion";

const colores = {
  primary: "#1E3A5F",
  secondary: "#2E86AB",
  accent: "#F26419",
  success: "#16A34A",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#1F2937",
  transition: "all 0.2s ease"
};

function Historial({ historial }) {
  return (
    <div style={{
      marginLeft: "220px",
      height: "100vh",
      overflowY: "auto",   // 👈 SCROLL AQUÍ
      background: colores.bg,
      padding: "30px"
    }}>
      <h2>Historial de Cambios</h2>

      {historial.length === 0 && <p>No hay cambios aún.</p>}

      {historial.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          style={histItem}
        >
          <p><strong>{item.tipo}</strong></p>
          <p>{item.fecha} - {item.hora}</p>

          {item.precio && (
            <p><strong>Precio:</strong> {item.precio}</p>
          )}

          {item.imagen && (
            <img
              src={item.imagen}
              alt="historial"
              style={{
                maxWidth: "200px",
                marginTop: "10px",
                borderRadius: "5px"
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default Historial;