import React from 'react';
import { Clock, Check } from 'lucide-react';

export default function PedidoCard({ pedido, onUpdateStatus }) {
  // Configuración visual según el estado (KDS Moderno)
  const isPendiente = pedido.estado === 'Pendiente';
  const headerBg = isPendiente ? 'bg-red-500' : 'bg-brand-accent';
  // El Dorado (brand-accent) necesita texto oscuro para poder leerse bien
  const headerText = isPendiente ? 'text-white' : 'text-gray-900';
  const badgeBg = isPendiente ? 'bg-white/20' : 'bg-white/40 text-gray-900';

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col h-full border border-gray-100/50">
      {/* Cabecera Estilo Ticket/KDS (Header completamente relleno de color) */}
      <div className={`${headerBg} ${headerText} px-6 py-4 flex justify-between items-start`}>
        <div>
          <h3 className="font-bold text-xl mb-1 tracking-tight">{pedido.mesaNombre}</h3>
          <div className="flex items-center gap-1.5 text-sm opacity-90 font-medium">
            <Clock className="w-4 h-4" /> {pedido.hora}
          </div>
        </div>
        <div className={`${badgeBg} px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-sm`}>
          {pedido.estado}
        </div>
      </div>
      
      {/* Lista de Productos */}
      <div className="p-6 flex-grow flex flex-col">
        <ul className="space-y-5 mb-6 flex-grow">
          {pedido.items.map(item => (
            <li key={item.id} className={`flex gap-4 items-start group ${item.estado === 'Listo' ? 'opacity-40' : ''}`}>
              <div className={`font-bold text-lg w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                item.estado === 'Listo' ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 group-hover:bg-brand-primary group-hover:text-white'
              }`}>
                {item.cantidad}
              </div>
              <div className="pt-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-lg leading-tight ${item.estado === 'Listo' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {item.nombre}
                  </p>
                  {item.estado === 'Pendiente' && pedido.items.some(i => i.estado !== 'Pendiente') && (
                    <span className="bg-red-100 text-status-ocupado text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Nuevo
                    </span>
                  )}
                </div>
                {item.observaciones && (
                  <div className={`mt-2 text-sm font-medium px-3 py-2 rounded-lg border inline-block ${
                    item.estado === 'Listo' ? 'text-gray-400 bg-gray-50 border-gray-100' : 'text-status-ocupado bg-red-50/50 border-red-100/50'
                  }`}>
                    {item.observaciones}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Acciones de Estado */}
        <div className="pt-5 mt-auto">
          {isPendiente ? (
            <button 
              onClick={() => onUpdateStatus(pedido.id, 'Preparando')}
              className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
              Comenzar Preparación
            </button>
          ) : (
            <button 
              onClick={() => onUpdateStatus(pedido.id, 'Listo')}
              className="w-full bg-status-disponible text-white py-3.5 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              <Check className="w-5 h-5 stroke-[3]" /> Marcar como Listo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
