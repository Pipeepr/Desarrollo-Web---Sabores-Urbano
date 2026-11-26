import React, { useCallback, useEffect, useMemo, useState } from 'react';
import RestauranteCard from '../components/RestauranteCard';
import { useAuth } from '../auth/useAuth';
import { ROLES } from '../auth/roles';
import {
  actualizarRestaurante,
  cambiarEstadoRestaurante,
  crearRestaurante,
  eliminarRestaurante,
  obtenerRestaurantes,
} from '../services/restaurantesService';

const ESTADOS_RESTAURANTE = [
  'Operativo',
  'En Mantención',
  'Fuera de Servicio',
  'Cerrado',
];

const FORMULARIO_INICIAL = {
  codigo: '',
  nombre: '',
  direccion: '',
  telefono: '',
  horario: '12:00 - 23:00',
  capacidadMesas: 10,
  estado: 'Operativo',
};

function formatearError(error) {
  const detalles = error?.errors
    ?.map((item) => item.message || item.msg)
    .filter(Boolean)
    .join(' ');

  return detalles ? `${error.message} ${detalles}` : error?.message || 'Ocurrió un error inesperado.';
}

export default function RestaurantsPage() {
  const { session } = useAuth();
  const token = session?.token;
  const rolUsuario = session?.usuario?.rol;

  // Según CU2 / RF2 del Caso 4, el Administrador General administra restaurantes (si no hay sesión activa en modo demo, se permite interactuar)
  const puedeGestionar = !rolUsuario || rolUsuario === ROLES.ADMIN_GENERAL;

  const [restaurantes, setRestaurantes] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoLocal, setNuevoLocal] = useState(FORMULARIO_INICIAL);

  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarRestaurantes = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const data = await obtenerRestaurantes({ token });
      setRestaurantes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(formatearError(err));
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    cargarRestaurantes();
  }, [cargarRestaurantes]);

  const abrirNuevoFormulario = () => {
    if (mostrarForm && !editandoId) {
      setMostrarForm(false);
      return;
    }
    setEditandoId(null);
    setNuevoLocal(FORMULARIO_INICIAL);
    setError('');
    setMensaje('');
    setMostrarForm(true);
  };

  const handleEditar = (restaurante) => {
    setEditandoId(restaurante._id || restaurante.id);
    setNuevoLocal({
      codigo: restaurante.codigo || '',
      nombre: restaurante.nombre || '',
      direccion: restaurante.direccion || '',
      telefono: restaurante.telefono || '',
      horario: restaurante.horario || '12:00 - 23:00',
      capacidadMesas: restaurante.capacidadMesas ?? 10,
      estado: restaurante.estado || 'Operativo',
    });
    setError('');
    setMensaje('');
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setNuevoLocal(FORMULARIO_INICIAL);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!nuevoLocal.nombre.trim() || !nuevoLocal.codigo.trim()) return;

    setProcesando(true);
    setError('');
    setMensaje('');

    const payload = {
      codigo: nuevoLocal.codigo.trim().toUpperCase(),
      nombre: nuevoLocal.nombre.trim(),
      direccion: nuevoLocal.direccion.trim(),
      telefono: nuevoLocal.telefono.trim(),
      horario: nuevoLocal.horario.trim(),
      capacidadMesas: Number(nuevoLocal.capacidadMesas),
      estado: nuevoLocal.estado,
    };

    try {
      if (editandoId) {
        const actualizado = await actualizarRestaurante(editandoId, payload, token);
        setRestaurantes((prev) =>
          prev.map((r) => ((r._id || r.id) === (actualizado._id || actualizado.id) ? actualizado : r)),
        );
        setMensaje(`Restaurante "${actualizado.nombre}" actualizado correctamente.`);
      } else {
        const creado = await crearRestaurante(payload, token);
        setRestaurantes((prev) =>
          [...prev, creado].sort((a, b) => (a.codigo || '').localeCompare(b.codigo || '')),
        );
        setMensaje(`Restaurante "${creado.nombre}" registrado correctamente.`);
      }
      cerrarFormulario();
    } catch (err) {
      setError(formatearError(err));
    } finally {
      setProcesando(false);
    }
  };

  const handleCambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'Operativo' ? 'En Mantención' : 'Operativo';
    setProcesando(true);
    setError('');
    setMensaje('');

    try {
      const actualizado = await cambiarEstadoRestaurante(id, nuevoEstado, token);
      setRestaurantes((prev) =>
        prev.map((r) => ((r._id || r.id) === (actualizado._id || actualizado.id) ? actualizado : r)),
      );
      setMensaje(`Estado de "${actualizado.nombre}" cambiado a ${actualizado.estado}.`);
    } catch (err) {
      setError(formatearError(err));
    } finally {
      setProcesando(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que deseas eliminar el restaurante "${nombre || ''}"?`)) {
      return;
    }

    setProcesando(true);
    setError('');
    setMensaje('');

    try {
      await eliminarRestaurante(id, token);
      setRestaurantes((prev) => prev.filter((r) => (r._id || r.id) !== id));
      setMensaje('Restaurante eliminado correctamente.');
    } catch (err) {
      setError(formatearError(err));
    } finally {
      setProcesando(false);
    }
  };

  const localesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return restaurantes.filter((r) => {
      const coincideEstado = filtroEstado === 'Todos' ? true : r.estado === filtroEstado;
      const coincideBusqueda =
        !termino ||
        (r.nombre || '').toLowerCase().includes(termino) ||
        (r.codigo || '').toLowerCase().includes(termino) ||
        (r.direccion || '').toLowerCase().includes(termino);

      return coincideEstado && coincideBusqueda;
    });
  }, [restaurantes, filtroEstado, busqueda]);

  return (
    <div className="page-container space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#123C39]">Gestión de Restaurantes</h1>
          <p className="text-gray-600 text-sm">
            Administra las sucursales de la cadena Sabores Urbanos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="Buscar código, nombre o dirección..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm bg-white md:w-64"
          />

          {puedeGestionar && (
            <button
              type="button"
              onClick={abrirNuevoFormulario}
              className="btn-primary self-start md:self-auto"
            >
              {mostrarForm && !editandoId ? '✕ Cerrar Formulario' : '+ Nuevo Restaurante'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {mensaje && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          role="status"
        >
          {mensaje}
        </div>
      )}

      {/* Formulario desplegable de creación o edición */}
      {mostrarForm && puedeGestionar && (
        <form
          onSubmit={handleGuardar}
          className="card bg-white p-6 space-y-4 border-l-4 border-l-[#123C39]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#123C39]">
              {editandoId ? 'Editar Sucursal' : 'Registrar Nueva Sucursal'}
            </h2>
            <button
              type="button"
              onClick={cerrarFormulario}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Código Local
              </label>
              <input
                type="text"
                placeholder="Ej: LOC-04"
                required
                minLength={2}
                maxLength={20}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.codigo}
                onChange={(e) =>
                  setNuevoLocal({ ...nuevoLocal, codigo: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nombre Sucursal
              </label>
              <input
                type="text"
                placeholder="Ej: Sucursal Ñuñoa"
                required
                minLength={2}
                maxLength={120}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.nombre}
                onChange={(e) =>
                  setNuevoLocal({ ...nuevoLocal, nombre: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                placeholder="Ej: Av. Irarrázaval 2000"
                required
                minLength={4}
                maxLength={200}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.direccion}
                onChange={(e) =>
                  setNuevoLocal({ ...nuevoLocal, direccion: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                placeholder="+56 2 2233 4455"
                required
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.telefono}
                onChange={(e) =>
                  setNuevoLocal({ ...nuevoLocal, telefono: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Horario de Funcionamiento
              </label>
              <input
                type="text"
                placeholder="Ej: 12:00 - 23:00"
                required
                minLength={3}
                maxLength={80}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.horario}
                onChange={(e) =>
                  setNuevoLocal({ ...nuevoLocal, horario: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Capacidad Mesas
              </label>
              <input
                type="number"
                min="1"
                required
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.capacidadMesas}
                onChange={(e) =>
                  setNuevoLocal({
                    ...nuevoLocal,
                    capacidadMesas: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Estado
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={nuevoLocal.estado}
                onChange={(e) =>
                  setNuevoLocal({ ...nuevoLocal, estado: e.target.value })
                }
              >
                {ESTADOS_RESTAURANTE.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={procesando}
              className="btn-secondary w-full md:w-auto disabled:opacity-50"
            >
              {procesando
                ? 'Guardando...'
                : editandoId
                  ? 'Actualizar Sucursal'
                  : 'Guardar Sucursal'}
            </button>
          </div>
        </form>
      )}

      {/* Filtros de Estado */}
      <div className="flex gap-2 border-b border-gray-300 pb-2 overflow-x-auto">
        {['Todos', ...ESTADOS_RESTAURANTE].map((estado) => (
          <button
            key={estado}
            type="button"
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
      {cargando ? (
        <div className="card bg-white p-8 text-center text-gray-600" role="status">
          Cargando restaurantes desde el servidor...
        </div>
      ) : localesFiltrados.length === 0 ? (
        <div className="card bg-white p-8 text-center text-gray-500">
          No se encontraron restaurantes para los filtros seleccionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localesFiltrados.map((local) => (
            <RestauranteCard
              key={local._id || local.id}
              restaurante={local}
              onEliminar={handleEliminar}
              onCambiarEstado={handleCambiarEstado}
              onEditar={handleEditar}
              puedeGestionar={puedeGestionar}
              procesando={procesando}
            />
          ))}
        </div>
      )}
    </div>
  );
}
