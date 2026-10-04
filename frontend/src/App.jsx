import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos las páginas de prueba que creamos recién
import MesasPage from './pages/MesasPage';
import ReservasPage from './pages/ReservasPage';
import PedidosPage from './pages/PedidosPage';
import CocinaPage from './pages/CocinaPage';

function App() {
  return (
    <BrowserRouter>
      {/* Aquí Alonso más adelante colocará el <Header /> */}
      
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<MesasPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/cocina" element={<CocinaPage />} />
          {/* Aquí tus compañeros irán agregando las demás rutas */}
        </Routes>
      </main>

      {/* Aquí Alonso más adelante colocará el <Footer /> */}
    </BrowserRouter>
  );
}

export default App;