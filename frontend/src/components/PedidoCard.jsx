import React from 'react';
import { Clock, Check } from 'lucide-react';

export default function PedidoCard({ pedido, onUpdateStatus }) {
  const isPendiente = pedido.estado === 'Pendiente';
  const borderColor = isPendiente ? 'border-t-status-ocupado' : 'border-t-brand-accent';
  const badgeColor = isPendiente ? 'bg-red-50 text-status-ocupado border-status-ocupado/20' : 'bg-orange-50 text-brand-accent border-brand-accent/20';

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${borderColor} border-t-4 flex flex-col h-full`}>
      <div className="p-5 flex justify-between items-start border-b border-gray-50">
        <div>
          <h3 className="font-bold text-xl text-brand-primary mb-1">{pedido.mesaNombre}</h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Clock className="w-4 h-4" /> {pedido.hora}
          </div>
        </div>
        <div className={`${badgeColor} border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
          {pedido.estado}
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        <ul className="space-y-4">
          {pedido.items.map(item => (
            <li key={item.id} className={`flex gap-3 items-start ${item.estado === 'Listo' ? 'opacity-50' : ''}`}>
              <div className="bg-gray-50 text-brand-primary font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                {item.cantidad}
              </div>
              <div className="pt-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${item.estado === 'Listo' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {item.nombre}
                  </p>
                  {item.estado === 'Pendiente' && pedido.items.some(i => i.estado !== 'Pendiente') && (
                    <span className="bg-red-100 text-status-ocupado text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Nuevo
                    </span>
                  )}
                </div>
                {item.observaciones && (
                  <p className="mt-1 text-sm text-gray-500 italic">
                    * {item.observaciones}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 pt-0 mt-auto">
        {isPendiente ? (
          <button 
            onClick={() => onUpdateStatus(pedido.id, 'Preparando')}
            className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition-opacity"
          >
            Comenzar Preparación
          </button>
        ) : (
          <button 
            onClick={() => onUpdateStatus(pedido.id, 'Listo')}
            className="w-full bg-status-disponible text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
          >
            <Check className="w-5 h-5" /> Marcar como Listo
          </button>
        )}
      </div>
    </div>
  );
}
