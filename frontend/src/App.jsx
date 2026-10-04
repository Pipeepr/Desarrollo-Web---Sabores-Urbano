import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MesasPage from './pages/MesasPage';
import ReservasPage from './pages/ReservasPage';
import PedidosPage from './pages/pedidos/PedidosPage';
import CocinaPage from './pages/cocina/CocinaPage';

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<MesasPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/cocina" element={<CocinaPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;