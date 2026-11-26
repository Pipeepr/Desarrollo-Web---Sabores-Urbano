import React from 'react';

export default function RestauranteCard({
  restaurante,
  onEliminar,
  onCambiarEstado,
  onEditar,
  puedeGestionar = true,
  procesando = false,
}) {
  const idRestaurante = restaurante._id || restaurante.id;

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
          <span className="text-xs font-mono text-[#B85C38] font-bold">
            {restaurante.codigo}
          </span>
          <span className={`badge ${getBadgeClass(restaurante.estado)}`}>
            {restaurante.estado}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#123C39] mb-2">
          {restaurante.nombre}
        </h3>

        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p>
            📍 <strong>Dirección:</strong> {restaurante.direccion}
          </p>
          <p>
            📞 <strong>Teléfono:</strong> {restaurante.telefono}
          </p>
          <p>
            ⏰ <strong>Horario:</strong> {restaurante.horario}
          </p>
          <p>
            🪑 <strong>Capacidad:</strong> {restaurante.capacidadMesas} mesas
          </p>
        </div>
      </div>

      {puedeGestionar && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
          {onEditar && (
            <button
              type="button"
              onClick={() => onEditar(restaurante)}
              disabled={procesando}
              className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Editar
            </button>
          )}
          <button
            type="button"
            onClick={() => onCambiarEstado(idRestaurante, restaurante.estado)}
            disabled={procesando}
            className="btn-secondary text-xs flex-1 disabled:opacity-50"
          >
            Cambiar Estado
          </button>
          <button
            type="button"
            onClick={() => onEliminar(idRestaurante, restaurante.nombre)}
            disabled={procesando}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
