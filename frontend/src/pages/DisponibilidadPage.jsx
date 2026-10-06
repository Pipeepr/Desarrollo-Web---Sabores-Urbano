import { useState } from "react";
import { mesasIniciales } from "../data/mesasData";
import MesaCard from "../components/MesaCard";

export default function DisponibilidadPage() {
  // 1. Traemos todas las mesas
  const [mesas, setMesas] = useState(mesasIniciales);

  // 2. MAGIA: Filtramos SOLO las que están "disponibles"
  const mesasDisponibles = mesas.filter((mesa) => mesa.estado === "disponible");

  // 3. Función para que el selector de la tarjeta funcione y no dé error
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
        Disponibilidad Inmediata
      </h1>
      <p className="mb-6 text-gray-600">
        Vista rápida de todas las mesas que están libres en el local (RF5).
      </p>

      {/* Mostramos un texto avisando cuántas mesas hay libres */}
      <p className="mb-4 text-sm font-semibold text-[var(--color-status-disponible)]">
        ¡Hay {mesasDisponibles.length} mesas listas para usar!
      </p>

      {/* Usamos la misma grilla responsiva que tú hiciste en la otra página */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mesasDisponibles.map((mesa) => (
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
    </main>
  );
}
