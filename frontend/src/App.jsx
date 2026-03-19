import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login";
import Documento from "./pages/documento";
import Historial from "./pages/historial";
import Navbar from "./components/navbar";
import Formulario from "./pages/formulario";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const isAuth = localStorage.getItem("auth") === "true";
  const location = useLocation();
  const [historial, setHistorial] = useState([]);

  return (
    <>
      {isAuth && location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/documento"
          element={
            isAuth ? (
              <Documento historial={historial} setHistorial={setHistorial} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/historial"
          element={
            isAuth ? (
              <Historial historial={historial} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/formulario"
          element={
            isAuth ? (
              <Formulario />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;