// src/data/mesasData.js
// Datos simulados de mesas — RF3. Sin backend: viven en este arreglo.
// Portado desde la versión HTML/JS original del Taller 1.

export const ESTADOS = {
  disponible: { label: "Disponible", color: "var(--color-status-disponible)" },
  reservada: { label: "Reservada", color: "var(--color-brand-accent)" },
  ocupada: { label: "Ocupada", color: "var(--color-status-ocupado)" },
  limpieza: { label: "Pendiente de limpieza", color: "#9a9a9a" },
  fuera: { label: "Fuera de servicio", color: "#5c5c5c" },
};

export const ZONAS = ["Terraza", "Salón principal", "Barra"];

export const mesasIniciales = [
  { id: "T-01", numero: "T-01", zona: "Terraza", capacidad: 4, estado: "disponible" },
  { id: "T-02", numero: "T-02", zona: "Terraza", capacidad: 2, estado: "ocupada" },
  { id: "T-03", numero: "T-03", zona: "Terraza", capacidad: 6, estado: "reservada" },
  { id: "T-04", numero: "T-04", zona: "Terraza", capacidad: 4, estado: "disponible" },
  { id: "M-05", numero: "M-05", zona: "Salón principal", capacidad: 4, estado: "ocupada" },
  { id: "M-06", numero: "M-06", zona: "Salón principal", capacidad: 4, estado: "disponible" },
  { id: "M-07", numero: "M-07", zona: "Salón principal", capacidad: 2, estado: "limpieza" },
  { id: "M-08", numero: "M-08", zona: "Salón principal", capacidad: 6, estado: "ocupada" },
  { id: "M-09", numero: "M-09", zona: "Salón principal", capacidad: 8, estado: "reservada" },
  { id: "M-10", numero: "M-10", zona: "Salón principal", capacidad: 4, estado: "fuera" },
  { id: "M-11", numero: "M-11", zona: "Salón principal", capacidad: 4, estado: "disponible" },
  { id: "M-12", numero: "M-12", zona: "Salón principal", capacidad: 4, estado: "ocupada" },
  { id: "B-13", numero: "B-13", zona: "Barra", capacidad: 3, estado: "ocupada" },
];
