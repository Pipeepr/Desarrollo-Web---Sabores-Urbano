import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

// Importamos las páginas que ya tenías
import MesasPage from './pages/MesasPage';
import ReservasPage from './pages/ReservasPage';
import RestaurantsPage from './pages/RestaurantsPage';
import ReportesPage from './pages/ReportesPage';

// 1. AQUÍ ESTÁ IMPORTADA TU NUEVA PÁGINA
import DisponibilidadPage from './pages/DisponibilidadPage';

export default function App() {
  return (
    <BrowserRouter>
      {/* El menú de arriba */}
      <Header />

      {/* Las rutas (URLs) de la aplicación */}
      <Routes>
        <Route path="/" element={<MesasPage />} /> {/* Página de inicio temporal */}
        <Route path="/mesas" element={<MesasPage />} />
        
        {/* 2. AQUÍ ESTÁ CONECTADA TU NUEVA PÁGINA */}
        <Route path="/disponibilidad" element={<DisponibilidadPage />} />
        
        <Route path="/reservas" element={<ReservasPage />} />
        <Route path="/restaurantes" element={<RestaurantsPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
      </Routes>

      {/* El pie de página */}
      <Footer />
    </BrowserRouter>
  );
}
