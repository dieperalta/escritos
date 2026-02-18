import { useState } from "react";

function App() {
  const [datos, setDatos] = useState([]);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  const [precio, setPrecio] = useState("");
  const [precioConfirmado, setPrecioConfirmado] = useState("");

  const [imagen, setImagen] = useState(null);
  const [imagenConfirmada, setImagenConfirmada] = useState(null);

  const [historial, setHistorial] = useState([]);

  const cargarDatos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/sap-datos");
      const data = await response.json();
      setDatos(data);
      setMostrarTexto(true);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
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
        precio: precioConfirmado || "XXX",
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
    let nuevosCambios = [];

    if (precio) {
      nuevosCambios.push({
        tipo: "Actualización de precio",
        precio: precio,
        imagen: null,
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString(),
      });

      setPrecioConfirmado(precio);
    }

    if (imagen) {
      nuevosCambios.push({
        tipo: "Carga de imagen",
        precio: null,
        imagen: imagen,
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString(),
      });

      setImagenConfirmada(imagen);
    }

    setHistorial((prev) => [...nuevosCambios.reverse(), ...prev]);
    setPrecio("");
  };

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const proveedor = datos[0]?.nombre || "XXX";
  const factura = datos[1]?.id || "XXX";

  return (
    <div className="container">
      <div style={{ padding: "40px", fontFamily: "Arial", lineHeight: "1.6" }}>
        <h1 className="titulo">Proyecto Auditorías (SAP)</h1>

        <button className="btn-primario" onClick={cargarDatos}>
          Cargar datos
        </button>

        <button className="btn-exito" onClick={exportarPDF}>
          Exportar PDF
        </button>

        <hr />

        {mostrarTexto && (
          <div style={{ marginTop: "30px", display: "flex", gap: "30px" }}>
            {/* COLUMNA IZQUIERDA */}
            <div style={{ flex: 2 }}>
              <p>
                <strong>Punto 6:</strong> Crédito fiscal por operaciones que no
                cumplen con el Principio de Causalidad (S/ 371, 073.00)
              </p>

              <p>
                <strong>a) Posición de la Administración Tributaria</strong>
              </p>

              <p>
                SUNAT desconoce el crédito fiscal relacionado al IGV
                efectivamente cancelado por nuestra empresa por concepto de las
                regalías pagadas a nuestro proveedor{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {proveedor}
                </span>
                , empresa domiciliada en Chile, mediante las facturas Nos.{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {factura}
                </span>
                .
              </p>

              <p>
                Tal como se puede apreciar en los numerales 6.2.1 y 6.2.2 del
                punto 2 del Anexo No. 1 del Resultado del Requerimiento No.
                0122190000793, citados como base del Requerimiento No.
                0122190002200, el cuestionamiento de la Administración
                Tributaria a nuestro crédito fiscal se basa únicamente en que
                no hemos cumplido con sustentar el cumplimiento del Principio
                de Causalidad. Precios{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {precioConfirmado || "XXX"}
                </span>
              </p>

              {/* IMAGEN */}
              {imagenConfirmada && (
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <img
                    src={imagenConfirmada}
                    alt="Cargada"
                    style={{
                      maxWidth: "300px",
                      border: "1px solid black",
                    }}
                  />
                </div>
              )}

              {/* INGRESO MANUAL */}
              <div style={{ marginTop: "20px" }}>
                <h3>Agregar datos manualmente</h3>

                <div style={{ marginBottom: "10px" }}>
                  <label style={{ marginRight: "10px" }}>
                    <strong>Precios:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label style={{ marginRight: "10px" }}>
                    <strong>Cargar imagen:</strong>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={manejarImagen}
                  />
                </div>

                <button onClick={confirmarDatos}>Confirmar</button>
              </div>
            </div>

            {/* COLUMNA DERECHA - HISTORIAL */}
            <div
              style={{
                flex: 1,
                borderLeft: "2px solid #ccc",
                paddingLeft: "20px",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              <h2>Historial de cambios</h2>

              {historial.length === 0 && <p>No hay cambios aún.</p>}

              {historial.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    backgroundColor:
                      index === 0 ? "#e8f4ff" : "#f9f9f9",
                  }}
                >
                  <p>
                    <strong>{item.tipo}</strong>
                  </p>
                  <p>
                    <strong>Fecha:</strong> {item.fecha}
                  </p>
                  <p>
                    <strong>Hora:</strong> {item.hora}
                  </p>

                  {item.precio && (
                    <p>
                      <strong>Precio:</strong> {item.precio}
                    </p>
                  )}

                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt="Historial"
                      style={{
                        marginTop: "10px",
                        maxWidth: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
