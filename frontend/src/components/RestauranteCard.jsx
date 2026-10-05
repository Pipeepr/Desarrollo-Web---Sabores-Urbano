import React from 'react';

export default function RestauranteCard({ restaurante, onEliminar, onCambiarEstado }) {
  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'Operativo':
        return 'badge-disponible';
      case 'En Mantención':
        return 'badge-reservado';
      default:
        return 'badge-ocupado';
    }
  };

  return (
    <div className="card flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-mono text-[#B85C38] font-bold">{restaurante.codigo}</span>
          <span className={`badge ${getBadgeClass(restaurante.estado)}`}>
            {restaurante.estado}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#123C39] mb-2">{restaurante.nombre}</h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p>📍 <strong>Dirección:</strong> {restaurante.direccion}</p>
          <p>📞 <strong>Teléfono:</strong> {restaurante.telefono}</p>
          <p>⏰ <strong>Horario:</strong> {restaurante.horario}</p>
          <p>🪑 <strong>Capacidad:</strong> {restaurante.capacidadMesas} mesas</p>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button 
          onClick={() => onCambiarEstado(restaurante.id)} 
          className="btn-secondary text-xs flex-1"
        >
          Cambiar Estado
        </button>
        <button 
          onClick={() => onEliminar(restaurante.id)} 
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}