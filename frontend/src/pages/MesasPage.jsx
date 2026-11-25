
import { useEffect, useState } from "react";
import { ZONAS } from "../data/mesasData";
import MesaCard from "../components/MesaCard";
import {
  obtenerMesas,
  actualizarEstadoMesa,
} from "../services/mesasService";

export default function MesasPage() {
  const [mesas, setMesas] = useState([]);
  const [filtroZona, setFiltroZona] = useState("todas");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [actualizando, setActualizando] = useState(false);

  // Obtener las mesas desde el backend
  useEffect(() => {
    async function cargarMesas() {
      try {
        const datos = await obtenerMesas();
        setMesas(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarMesas();
  }, []);

  // Filtrar las mesas por zona
  const mesasFiltradas = mesas.filter((mesa) =>
    filtroZona === "todas" ? true : mesa.zona === filtroZona
  );

  // Actualizar el estado de una mesa en MongoDB
  async function cambiarEstado(numero, nuevoEstado) {
    const mesa = mesas.find((m) => m.numero === numero);

    if (!mesa || actualizando) return;

    try {
      setError("");
      setActualizando(true);

      const mesaActualizada = await actualizarEstadoMesa(
        mesa.id,
        nuevoEstado
      );

      setMesas((actuales) =>
        actuales.map((m) =>
          m.id === mesa.id ? mesaActualizada : m
        )
      );
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
        Mapa de mesas
      </h1>

      <p className="mb-6 text-gray-600">
        Administra número, zona, capacidad y estado de cada mesa (RF3).
      </p>

      {cargando && (
        <p className="mb-4 text-gray-600">
          Cargando mesas...
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700"
        >
          {error}
        </div>
      )}

      {actualizando && (
        <p className="mb-4 text-gray-600">
          Actualizando estado...
        </p>
      )}

      {/* Filtro por zona */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["todas", ...ZONAS].map((zona) => (
          <button
            key={zona}
            onClick={() => setFiltroZona(zona)}
            className={`rounded border px-3 py-1 text-sm ${
              filtroZona === zona
                ? "bg-[var(--color-brand-primary)] text-white"
                : "bg-white"
            }`}
          >
            {zona === "todas" ? "Todas" : zona}
          </button>
        ))}
      </div>

      {!cargando && !error && mesasFiltradas.length === 0 && (
        <p className="mb-4 text-gray-500">
          No hay mesas para mostrar.
        </p>
      )}

      {/* Grilla de mesas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mesasFiltradas.map((mesa) => (
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

      <p className="mt-6 text-sm text-gray-500">
        {mesasFiltradas.length} de {mesas.length} mesas mostradas.
      </p>
    </main>
  );
}
