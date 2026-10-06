import { ESTADOS } from "../data/mesasData";

// Componente reutilizable: dibuja UNA mesa.
// Recibe sus datos por props y avisa al padre cuando cambia el estado.
export default function MesaCard({ numero, zona, capacidad, estado, onCambiarEstado }) {
  const colorEstado = ESTADOS[estado].color;
  const nombreEstado = ESTADOS[estado].label;

  return (
    <div className="rounded-lg border-2 bg-white p-4 shadow-sm" style={{ borderColor: colorEstado }}>
      <p className="text-lg font-bold">{numero}</p>
      <p className="text-sm text-gray-600">
        {zona} · {capacidad} personas
      </p>

      <p className="mt-2 text-sm font-semibold" style={{ color: colorEstado }}>
        {nombreEstado}
      </p>

      <select
        value={estado}
        onChange={(e) => onCambiarEstado(numero, e.target.value)}
        className="mt-3 w-full rounded border p-1 text-sm"
      >
        {Object.keys(ESTADOS).map((clave) => (
          <option key={clave} value={clave}>
            {ESTADOS[clave].label}
          </option>
        ))}
      </select>
    </div>
  );
}
