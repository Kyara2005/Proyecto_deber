import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Gracias from "./pages/gracias/Gracias";
import Perfil from "./pages/perfil/Perfil";
import Contacto from "./pages/contacto/Contacto";
import { useEffect } from "react";
import Eventos from "./pages/eventos/Eventos";
import Beneficios from "./pages/beneficios/Beneficios";
import Dashboard from "./pages/dashboard/Dashboard";
import Matches from "./pages/Matches/Matches";
import { Confirm } from "./pages/confirm";
import AOS from "aos";
import 'aos/dist/aos.css';
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="gracias" element={<Gracias />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="beneficios" element={<Beneficios />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="matches" element={<Matches />} />

        {/* Confirmación de cuenta */}
        <Route path="confirmar/:token" element={<Confirm />} />

        {/* Recuperación de contraseña */}
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="recuperarpassword/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
