import React, { useState } from 'react';
import { kpisGenerales, platosMasVendidos, ventasPorLocal } from '../data/reportesData';

export default function ReportesPage() {
  const [periodo, setPeriodo] = useState('Mes Actual');

  return (
    <div className="page-container space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#123C39]">Reportes y Métricas Consolidadas</h1>
          <p className="text-gray-600 text-sm">Resumen de ventas, rendimiento y platos más solicitados.</p>
        </div>

        <select 
          value={periodo} 
          onChange={(e) => setPeriodo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm bg-white font-semibold text-[#123C39] self-start md:self-auto"
        >
          <option value="Semana Actual">Semana Actual</option>
          <option value="Mes Actual">Mes Actual</option>
          <option value="Trimestre">Trimestre</option>
        </select>
      </div>

      {/* Tarjetas KPI de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-white border-l-4 border-l-[#123C39]">
          <p className="text-xs text-gray-500 font-bold uppercase">Ventas Totales</p>
          <p className="text-2xl font-bold text-[#123C39] mt-1">{kpisGenerales.ventasTotalesMes}</p>
          <p className="text-xs text-green-600 font-semibold mt-1">↑ +12% vs mes anterior</p>
        </div>

        <div className="card bg-white border-l-4 border-l-[#B85C38]">
          <p className="text-xs text-gray-500 font-bold uppercase">Pedidos Procesados</p>
          <p className="text-2xl font-bold text-[#B85C38] mt-1">{kpisGenerales.pedidosTotales}</p>
          <p className="text-xs text-gray-500 mt-1">En salón y para llevar</p>
        </div>

        <div className="card bg-white border-l-4 border-l-[#C49A4A]">
          <p className="text-xs text-gray-500 font-bold uppercase">Ocupación Promedio</p>
          <p className="text-2xl font-bold text-[#C49A4A] mt-1">{kpisGenerales.ocupacionPromedio}</p>
          <p className="text-xs text-gray-500 mt-1">Sedes activas</p>
        </div>

        <div className="card bg-white border-l-4 border-l-green-600">
          <p className="text-xs text-gray-500 font-bold uppercase">Plato Más Vendido</p>
          <p className="text-base font-bold text-gray-800 mt-1 truncate">{kpisGenerales.platoEstrella}</p>
          <p className="text-xs text-gray-500 mt-1">342 unidades</p>
        </div>
      </div>

      {/* Tabla 1: Desglose por Restaurante */}
      <div className="card space-y-3">
        <h2 className="text-lg font-bold text-[#123C39]">Rendimiento por Restaurante</h2>
        <div className="table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#123C39] text-white">
              <tr>
                <th className="p-3">Restaurante / Sucursal</th>
                <th className="p-3">Pedidos</th>
                <th className="p-3">Ventas Consolidadas</th>
                <th className="p-3">Ocupación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ventasPorLocal.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">{item.local}</td>
                  <td className="p-3">{item.pedidos}</td>
                  <td className="p-3 font-mono font-bold text-[#B85C38]">{item.ventas}</td>
                  <td className="p-3">
                    <span className="badge badge-disponible">{item.ocupacion}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla 2: Platos más vendidos */}
      <div className="card space-y-3">
        <h2 className="text-lg font-bold text-[#123C39]">Top 5 Platos Más Solicitados</h2>
        <div className="table-responsive">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Plato / Producto</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Unidades Vendidas</th>
                <th className="p-3">Ingresos Generados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {platosMasVendidos.map((plato, index) => (
                <tr key={plato.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-[#123C39]">{index + 1}</td>
                  <td className="p-3 font-semibold text-gray-800">{plato.nombre}</td>
                  <td className="p-3">{plato.categoria}</td>
                  <td className="p-3 font-bold">{plato.cantidad}</td>
                  <td className="p-3 font-mono text-[#B85C38] font-bold">{plato.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}