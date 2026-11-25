
import { useEffect, useState } from "react";
import MesaCard from "../components/MesaCard";
import {
  obtenerDisponibilidad,
  actualizarEstadoMesa,
} from "../services/mesasService";

export default function DisponibilidadPage() {
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [actualizando, setActualizando] = useState(false);

  // Consultar disponibilidad real desde el backend
  useEffect(() => {
    obtenerDisponibilidad()
      .then((datos) => {
        setMesas(datos.mesas);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Actualizar manualmente la disponibilidad
  async function refrescarDisponibilidad() {
    setCargando(true);
    setError("");

    try {
      const datos = await obtenerDisponibilidad();
      setMesas(datos.mesas);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  // Actualizar el estado de una mesa en MongoDB
  async function cambiarEstado(numero, nuevoEstado) {
    const mesa = mesas.find((m) => m.numero === numero);

    if (!mesa || actualizando) return;

    setActualizando(true);
    setError("");

    try {
      await actualizarEstadoMesa(mesa.id, nuevoEstado);

      const datos = await obtenerDisponibilidad();
      setMesas(datos.mesas);
    } catch (err) {
      setError(err.message);
    } finally {
      setActualizando(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1
        className="mb-2 text-2xl font-bold"
        style={{ fontFamily: "var(--font-headings)" }}
      >
        Disponibilidad Inmediata
      </h1>

      <p className="mb-6 text-gray-600">
        Vista rápida de todas las mesas que están libres
        en el local (RF5).
      </p>

      <button
        onClick={refrescarDisponibilidad}
        disabled={cargando || actualizando}
        className="mb-4 rounded-lg bg-gray-800 px-4 py-2
                   text-sm font-semibold text-white
                   hover:bg-gray-700 disabled:opacity-50"
      >
        Actualizar disponibilidad
      </button>

      {cargando && (
        <p className="mb-4 text-gray-600">
          Consultando disponibilidad...
        </p>
      )}

      {actualizando && (
        <p className="mb-4 text-gray-600">
          Actualizando estado de la mesa...
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}

      {!cargando && !error && (
        <p className="mb-4 text-sm font-semibold text-[var(--color-status-disponible)]">
          ¡Hay {mesas.length} mesas listas para usar!
        </p>
      )}

      {!cargando && !error && mesas.length === 0 && (
        <p className="rounded-lg bg-gray-100 p-4 text-gray-600">
          No hay mesas disponibles en este momento.
        </p>
      )}

      {!cargando && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mesas.map((mesa) => (
            <MesaCard
              key={mesa.id}
              numero={mesa.numero}
              zona={mesa.zona}
              capacidad={mesa.capacidad}
              estado={mesa.estado}
              onCambiarEstado={cambiarEstado}
            />
          ))}
        </div>
      )}
    </main>
  );
}
