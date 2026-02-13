import { useState } from "react";

function App() {
  const [datos, setDatos] = useState([]);

  const cargarDatos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/sap-datos");
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const exportarPDF = () => {
    window.open("http://127.0.0.1:9000/generar-pdf", "_blank");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Datos de SAP</h1>

      <button onClick={cargarDatos} style={{ marginRight: "10px" }}>
        Cargar datos
      </button>

      <button onClick={exportarPDF}>
        Exportar a PDF
      </button>

      <hr />

      <h2>Previsualización</h2>

      <ul>
        {datos.map((item) => (
          <li key={item.id}>
            {item.id} - {item.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
