
// Servicio de integración con el backend - RF3

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

// Obtener todas las mesas
export async function obtenerMesas() {
  const respuesta = await fetch(`${API_BASE_URL}/mesas`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las mesas.");
  }

  return respuesta.json();
}

// Actualizar el estado de una mesa
export async function actualizarEstadoMesa(id, estado) {
  const respuesta = await fetch(
    `${API_BASE_URL}/mesas/${encodeURIComponent(id)}/estado`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado }),
    }
  );

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.mensaje || "No se pudo actualizar la mesa."
    );
  }

  return datos.mesa;
}

// Obtener mesas disponibles - RF5
export async function obtenerDisponibilidad() {
  const respuesta = await fetch(
    `${API_BASE_URL}/mesas/disponibilidad`
  );

  if (!respuesta.ok) {
    throw new Error(
      "No se pudo consultar la disponibilidad de mesas."
    );
  }

  return respuesta.json();
}
