export const mesasData = [
  { id: 1, numero: "Mesa 1", estado: "ocupado" },
  { id: 2, numero: "Mesa 2", estado: "disponible" },
  { id: 3, numero: "Mesa 3", estado: "disponible" },
];

export const clientesData = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María Gómez" },
  { id: 3, nombre: "Cliente General" },
];

export const productosData = [
  { id: 1, nombre: "Lomo Saltado", precio: 12000, categoria: "Fondos" },
  { id: 2, nombre: "Ceviche Mixto", precio: 15000, categoria: "Entradas" },
  { id: 3, nombre: "Pisco Sour", precio: 5000, categoria: "Bebidas" },
  { id: 4, nombre: "Chupe de Camarones", precio: 14000, categoria: "Fondos" },
];

export const pedidosIniciales = [
  {
    id: 101,
    mesaId: 1,
    mesaNombre: "Mesa 1",
    cliente: "Juan Pérez",
    estado: "Preparando", // Preparando, Listo, Entregado
    hora: new Date().toLocaleTimeString(),
    items: [
      { id: 1, producto: "Lomo Saltado", cantidad: 2, precio: 12000, observaciones: "Sin cebolla" },
      { id: 3, producto: "Pisco Sour", cantidad: 2, precio: 5000, observaciones: "" }
    ]
  }
];
