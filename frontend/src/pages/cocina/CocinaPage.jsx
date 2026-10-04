import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, Check, UtensilsCrossed } from 'lucide-react';

const getStoredPedidos = () => {
  const stored = localStorage.getItem('pedidos_sabores_urbano');
  if (stored) return JSON.parse(stored);
  return [];
};

const savePedidos = (pedidos) => {
  localStorage.setItem('pedidos_sabores_urbano', JSON.stringify(pedidos));
};

import PedidoCard from '../../components/PedidoCard';

export default function CocinaPage() {
  const [pedidos, setPedidos] = useState([]);

  // Load periodically to simulate real-time kitchen display (RF11)
  useEffect(() => {
    const loadPedidos = () => {
      setPedidos(getStoredPedidos());
    };
    loadPedidos();
    const interval = setInterval(loadPedidos, 3000); // refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = (pedidoId, nuevoEstado) => {
    const updatedPedidos = pedidos.map(p => {
      if (p.id === pedidoId) {
        return { 
          ...p, 
          estado: nuevoEstado,
          items: p.items.map(item => {
            if (nuevoEstado === 'Listo') return { ...item, estado: 'Listo' };
            if (nuevoEstado === 'Preparando' && item.estado === 'Pendiente') return { ...item, estado: 'Preparando' };
            return item;
          })
        };
      }
      return p;
    });
    setPedidos(updatedPedidos);
    savePedidos(updatedPedidos);
  };

  // Cocina solo ve pedidos que no estén "Pagado" (y filtramos los que no tienen items)
  const pedidosCocina = pedidos.filter(p => p.items.length > 0 && p.estado !== 'Listo' && p.estado !== 'Pagado');
  const pedidosListos = pedidos.filter(p => p.items.length > 0 && p.estado === 'Listo');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Top Bar KDS */}
      <div className="bg-brand-primary text-white px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center shadow-md z-10 relative">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <ChefHat className="w-6 h-6 text-brand-accent" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wide uppercase">KDS Sabores Urbano</h1>
        </div>
        
        {/* Status Legend */}
        <div className="flex gap-4 bg-black/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-status-ocupado shadow-[0_0_8px_rgba(230,57,70,0.8)]"></div>
            <span>PENDIENTE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(196,154,74,0.8)]"></div>
            <span>PREPARANDO</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {pedidosCocina.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 max-w-sm">
              <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-1">Sin Tickets Activos</h3>
              <p className="text-gray-500 font-medium">La cocina está al día. ¡Buen trabajo!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 items-start">
            {pedidosCocina.map(pedido => (
              <PedidoCard key={pedido.id} pedido={pedido} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        )}

        {/* Recientemente Listos (Compact Footer Grid) */}
        {pedidosListos.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-gray-200 border-dashed">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Tickets Completados Recientemente</h3>
            <div className="flex flex-wrap gap-3">
              {pedidosListos.map(pedido => (
                <div key={pedido.id} className="bg-white rounded-md shadow-sm border-l-4 border-status-disponible px-4 py-2 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <Check className="w-4 h-4 text-status-disponible" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm leading-tight">{pedido.mesaNombre}</h4>
                    <p className="text-xs text-gray-500 font-medium">{pedido.items.length} ítems</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
