import React from 'react';
import { Clock, Check } from 'lucide-react';

export default function PedidoCard({ pedido, onUpdateStatus }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 transition-transform hover:-translate-y-1 ${
        pedido.estado === 'Pendiente' ? 'border-status-ocupado' : 'border-brand-accent'
      }`}
    >
      {/* Cabecera Tarjeta */}
      <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-brand-primary">{pedido.mesaNombre}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {pedido.hora}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          pedido.estado === 'Pendiente' 
            ? 'bg-red-100 text-status-ocupado' 
            : 'bg-yellow-100 text-brand-accent'
        }`}>
          {pedido.estado}
        </span>
      </div>
      
      {/* Lista de Productos */}
      <div className="p-5">
        <ul className="space-y-4 mb-6">
          {pedido.items.map(item => (
            <li key={item.id} className="flex gap-3">
              <span className="font-bold text-brand-primary text-lg w-6 flex-shrink-0">
                {item.cantidad}x
              </span>
              <div>
                <p className="font-medium text-gray-800">{item.nombre}</p>
                {item.observaciones && (
                  <p className="text-sm text-status-ocupado italic mt-1 bg-red-50 p-1.5 rounded border border-red-100">
                    ⚠️ {item.observaciones}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Acciones de Estado */}
        <div className="pt-4 border-t border-gray-100">
          {pedido.estado === 'Pendiente' ? (
            <button 
              onClick={() => onUpdateStatus(pedido.id, 'Preparando')}
              className="w-full bg-brand-accent text-white py-2.5 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Comenzar Preparación
            </button>
          ) : (
            <button 
              onClick={() => onUpdateStatus(pedido.id, 'Listo')}
              className="w-full bg-status-disponible text-white py-2.5 rounded-md font-medium hover:bg-opacity-90 transition-colors flex justify-center items-center gap-2"
            >
              <Check className="w-5 h-5" /> Marcar como Listo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
