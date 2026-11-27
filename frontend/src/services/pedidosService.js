// Servicio de integración con el backend - RF9, RF10 y RF11 (Pedidos y Cocina)

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api"
).replace(/\/+$/, "");

const PEDIDOS_URL = `${API_BASE_URL}/pedidos`;

async function request(url, { method = "GET", body } = {}) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(
      "No se pudo conectar con el servidor. Verifica que el backend esté disponible.",
      { cause: error },
    );
  }

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch {
    // Respuesta sin cuerpo JSON
  }

  if (!respuesta.ok) {
    throw new Error(datos?.mensaje || "La solicitud no pudo completarse.");
  }

  return datos;
}

export function obtenerPedidos() {
  return request(PEDIDOS_URL);
}

export function crearPedido(pedido) {
  return request(PEDIDOS_URL, { method: "POST", body: pedido });
}

export function actualizarPedido(id, cambios) {
  return request(`${PEDIDOS_URL}/${id}`, { method: "PUT", body: cambios });
}

export function eliminarPedido(id) {
  return request(`${PEDIDOS_URL}/${id}`, { method: "DELETE" });
}

export function obtenerIdPedido(pedido) {
  return pedido._id || pedido.id;
}
