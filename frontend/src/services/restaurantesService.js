import { apiRequest } from "./api";

export function obtenerRestaurantes({ token, estado, buscar } = {}) {
  const params = new URLSearchParams();

  if (estado && estado !== "Todos") {
    params.set("estado", estado);
  }

  if (typeof buscar === "string" && buscar.trim() !== "") {
    params.set("buscar", buscar.trim());
  }

  const query = params.toString();
  return apiRequest(query ? `/restaurantes?${query}` : "/restaurantes", {
    token,
  });
}

export function obtenerRestaurantePorId(id, token) {
  return apiRequest(`/restaurantes/${encodeURIComponent(id)}`, { token });
}

export function crearRestaurante(restaurante, token) {
  return apiRequest("/restaurantes", {
    method: "POST",
    token,
    body: restaurante,
  });
}

export function actualizarRestaurante(id, restaurante, token) {
  return apiRequest(`/restaurantes/${encodeURIComponent(id)}`, {
    method: "PUT",
    token,
    body: restaurante,
  });
}

export function cambiarEstadoRestaurante(id, estado, token) {
  return apiRequest(`/restaurantes/${encodeURIComponent(id)}/estado`, {
    method: "PATCH",
    token,
    body: { estado },
  });
}

export function eliminarRestaurante(id, token) {
  return apiRequest(`/restaurantes/${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
  });
}
