// =========================================================
// PRODUCTOS DE EJEMPLO
// =========================================================

export const productosIniciales = [
  {
    id: 1,
    nombre: "Hamburguesa Especial",
    categoria: "Platos principales",
    precio: 18000,
  },
  {
    id: 2,
    nombre: "Papas de la Casa",
    categoria: "Entradas",
    precio: 9000,
  },
  {
    id: 3,
    nombre: "Limonada Natural",
    categoria: "Bebidas",
    precio: 6000,
  },
];


// =========================================================
// PEDIDOS REALIZADOS ANTERIORMENTE
// =========================================================
// IMPORTANTE:
// Cada pedido guarda el precio que tenía el producto
// cuando el cliente realizó el pedido.
// =========================================================

export const pedidosHistoricos = [
  {
    id: 101,
    fecha: "2026-10-01",
    productos: [
      {
        productoId: 1,
        nombre: "Hamburguesa Especial",
        cantidad: 1,
        precioUnitario: 18000,
      },
    ],
  },

  {
    id: 102,
    fecha: "2026-10-02",
    productos: [
      {
        productoId: 2,
        nombre: "Papas de la Casa",
        cantidad: 2,
        precioUnitario: 9000,
      },
      {
        productoId: 3,
        nombre: "Limonada Natural",
        cantidad: 1,
        precioUnitario: 6000,
      },
    ],
  },
];


// =========================================================
// HISTORIAL INICIAL DE CAMBIOS
// =========================================================

export const historialPreciosInicial = [];