import React, { useState } from 'react';
import { restaurantesIniciales } from '../data/restaurantesData';
import RestauranteCard from '../components/RestauranteCard';

export default function RestaurantsPage() {
  const [restaurantes, setRestaurantes] = useState(restaurantesIniciales);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [mostrarForm, setMostrarForm] = useState(false);

  // Formulario local
  const [nuevoLocal, setNuevoLocal] = useState({
    codigo: '',
    nombre: '',
    direccion: '',
    telefono: '',
    horario: '12:00 - 23:00',
    capacidadMesas: 10,
    estado: 'Operativo'
  });

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este restaurante?')) {
      setRestaurantes(restaurantes.filter(r => r.id !== id));
    }
  };

  const handleCambiarEstado = (id) => {
    setRestaurantes(restaurantes.map(r => {
      if (r.id === id) {
        const nuevoEstado = r.estado === 'Operativo' ? 'En Mantención' : 'Operativo';
        return { ...r, estado: nuevoEstado };
      }
      return r;
    }));
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoLocal.nombre || !nuevoLocal.codigo) return;

    const restauranteCreado = {
      ...nuevoLocal,
      id: Date.now(),
      capacidadMesas: Number(nuevoLocal.capacidadMesas)
    };

    setRestaurantes([...restaurantes, restauranteCreado]);
    setNuevoLocal({
      codigo: '',
      nombre: '',
      direccion: '',
      telefono: '',
      horario: '12:00 - 23:00',
      capacidadMesas: 10,
      estado: 'Operativo'
    });
    setMostrarForm(false);
  };

  const localesFiltrados = restaurantes.filter(r => 
    filtroEstado === 'Todos' ? true : r.estado === filtroEstado
  );

  return (
    <div className="page-container space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#123C39]">Gestión de Restaurantes</h1>
          <p className="text-gray-600 text-sm">Administra las sucursales de la cadena Sabores Urbano.</p>
        </div>
        
        <button 
          onClick={() => setMostrarForm(!mostrarForm)} 
          className="btn-primary self-start md:self-auto"
        >
          {mostrarForm ? '✕ Cerrar Formulario' : '+ Nuevo Restaurante'}
        </button>
      </div>

      {/* Formulario desplegable */}
      {mostrarForm && (
        <form onSubmit={handleAgregar} className="card bg-white p-6 space-y-4 border-l-4 border-l-[#123C39]">
          <h2 className="text-lg font-bold text-[#123C39]">Registrar Nueva Sucursal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Código Local</label>
              <input 
                type="text" 
                placeholder="Ej: LOC-04" 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.codigo}
                onChange={e => setNuevoLocal({...nuevoLocal, codigo: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Sucursal</label>
              <input 
                type="text" 
                placeholder="Ej: Sucursal Ñuñoa" 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.nombre}
                onChange={e => setNuevoLocal({...nuevoLocal, nombre: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dirección</label>
              <input 
                type="text" 
                placeholder="Ej: Av. Irarrázaval 2000" 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.direccion}
                onChange={e => setNuevoLocal({...nuevoLocal, direccion: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono</label>
              <input 
                type="text" 
                placeholder="+56 9 1234 5678" 
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.telefono}
                onChange={e => setNuevoLocal({...nuevoLocal, telefono: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Capacidad Mesas</label>
              <input 
                type="number" 
                min="1"
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.capacidadMesas}
                onChange={e => setNuevoLocal({...nuevoLocal, capacidadMesas: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Estado Inicial</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.estado}
                onChange={e => setNuevoLocal({...nuevoLocal, estado: e.target.value})}
              >
                <option value="Operativo">Operativo</option>
                <option value="En Mantención">En Mantención</option>
                <option value="Fuera de Servicio">Fuera de Servicio</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-secondary w-full md:w-auto">
            Guardar Sucursal
          </button>
        </form>
      )}

      {/* Filtros de Estado */}
      <div className="flex gap-2 border-b border-gray-300 pb-2 overflow-x-auto">
        {['Todos', 'Operativo', 'En Mantención', 'Fuera de Servicio'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
              filtroEstado === estado 
                ? 'bg-[#123C39] text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Grilla Responsiva de Locales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localesFiltrados.map(local => (
          <RestauranteCard 
            key={local.id} 
            restaurante={local} 
            onEliminar={handleEliminar}
            onCambiarEstado={handleCambiarEstado}
          />
        ))}
      </div>
    </div>
  );
}
