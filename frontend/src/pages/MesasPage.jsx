import { useState } from "react";
import { mesasIniciales, ZONAS } from "../data/mesasData";
import MesaCard from "../components/MesaCard";

export default function MesasPage() {
  // "mesas" guarda TODAS las mesas. Al cambiar de estado, actualizamos este arreglo.
  const [mesas, setMesas] = useState(mesasIniciales);
  // "filtroZona" guarda qué botón de zona está activo ("todas" al inicio).
  const [filtroZona, setFiltroZona] = useState("todas");

  // Solo las mesas que calzan con el filtro activo se muestran.
  const mesasFiltradas = mesas.filter((mesa) =>
    filtroZona === "todas" ? true : mesa.zona === filtroZona
  );

  // Cuando una MesaCard cambia su estado, actualizamos esa mesa dentro del arreglo.
  function cambiarEstado(numero, nuevoEstado) {
    setMesas((actuales) =>
      actuales.map((mesa) =>
        mesa.numero === numero ? { ...mesa, estado: nuevoEstado } : mesa
      )
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold" style={{ fontFamily: "var(--font-headings)" }}>
        Mapa de mesas
      </h1>
      <p className="mb-6 text-gray-600">
        Administra número, zona, capacidad y estado de cada mesa (RF3).
      </p>

      {/* Filtro por zona */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["todas", ...ZONAS].map((zona) => (
          <button
            key={zona}
            onClick={() => setFiltroZona(zona)}
            className={`rounded border px-3 py-1 text-sm ${
              filtroZona === zona ? "bg-[var(--color-brand-primary)] text-white" : "bg-white"
            }`}
          >
            {zona === "todas" ? "Todas" : zona}
          </button>
        ))}
      </div>

      {/* Grilla de mesas — responsive: 1 columna en celular, 3 en PC */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mesasFiltradas.map((mesa) => (
          <MesaCard
            key={mesa.numero}
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
