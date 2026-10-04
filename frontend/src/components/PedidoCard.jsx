import React from 'react';
import { Clock, Check } from 'lucide-react';

export default function PedidoCard({ pedido, onUpdateStatus }) {
  // Configuración visual según el estado (KDS Moderno)
  const isPendiente = pedido.estado === 'Pendiente';
  const headerBg = isPendiente ? 'bg-status-ocupado' : 'bg-brand-accent';
  const headerText = isPendiente ? 'text-white' : 'text-gray-900';

  return (
    <div className="bg-white rounded shadow-sm border border-gray-300 flex flex-col h-full overflow-hidden">
      {/* Cabecera Estilo Ticket (Compacta y Profesional) */}
      <div className={`${headerBg} ${headerText} px-3 py-2 flex justify-between items-center border-b border-black/10`}>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-none tracking-tight">{pedido.mesaNombre}</span>
          <span className="text-[11px] opacity-90 mt-1 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3" /> {pedido.hora}
          </span>
        </div>
        <div className="bg-black/15 px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase">
          {pedido.estado}
        </div>
      </div>
      
      {/* Lista de Productos tipo Comanda */}
      <div className="p-0 flex-grow">
        <ul className="divide-y divide-gray-100">
          {pedido.items.map(item => (
            <li key={item.id} className={`flex items-start p-3 ${item.estado === 'Listo' ? 'bg-gray-50 opacity-40' : 'bg-white'}`}>
              <div className={`w-8 font-black text-lg text-center ${
                item.estado === 'Listo' ? 'text-gray-400' : (isPendiente ? 'text-status-ocupado' : 'text-brand-accent')
              }`}>
                {item.cantidad}
              </div>
              <div className="flex-1 ml-1">
                <div className="flex justify-between items-start gap-2">
                  <span className={`font-bold text-base leading-tight ${item.estado === 'Listo' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {item.nombre}
                  </span>
                  {item.estado === 'Pendiente' && pedido.items.some(i => i.estado !== 'Pendiente') && (
                    <span className="bg-red-50 text-status-ocupado border border-status-ocupado/30 text-[9px] font-black px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                      Nuevo
                    </span>
                  )}
                </div>
                {item.observaciones && (
                  <div className={`mt-1 text-sm font-semibold ${item.estado === 'Listo' ? 'text-gray-400' : 'text-red-600'}`}>
                    <span className="uppercase text-[10px] bg-red-100 text-red-700 px-1 py-0.5 rounded mr-1">Mod</span> 
                    {item.observaciones}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Acción de Estado en Footer (Barra de acción) */}
      <div className="p-2 bg-gray-100 border-t border-gray-200 mt-auto">
        <button 
          onClick={() => onUpdateStatus(pedido.id, isPendiente ? 'Preparando' : 'Listo')}
          className={`w-full py-2 rounded font-bold text-sm tracking-wide transition-colors flex justify-center items-center gap-2 ${
            isPendiente 
              ? 'bg-gray-800 hover:bg-black text-white' 
              : 'bg-status-disponible hover:bg-emerald-700 text-white'
          }`}
        >
          {isPendiente ? (
             'EMPEZAR A PREPARAR'
          ) : (
             <><Check className="w-4 h-4 stroke-[3]" /> MARCAR COMO LISTO</>
          )}
        </button>
      </div>
    </div>
  );
}
