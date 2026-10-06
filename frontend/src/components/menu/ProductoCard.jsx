import { useState } from "react";
import {
  Clock,
  Pencil,
  Eye,
  EyeOff,
  ImageOff,
} from "lucide-react";

export default function ProductoCard({
  producto,
  categoria,
  onEditar,
  onCambiarDisponibilidad,
}) {
  const [imagenConError, setImagenConError] =
    useState(false);

  const mostrarImagen =
    producto.imagen && !imagenConError;

  return (
    <article className="producto-card">

      <div className="imagen-producto">
        {mostrarImagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={() =>
              setImagenConError(true)
            }
          />
        ) : (
          <div className="imagen-producto-placeholder">
            <ImageOff />
            <span>Foto pendiente</span>
          </div>
        )}
      </div>

      <div className="producto-card-superior">

        <div>
          <span className="categoria-producto">
            {categoria}
          </span>

          <h3>
            {producto.nombre}
          </h3>
        </div>

        <span
          className={
            producto.disponible
              ? "estado-producto disponible"
              : "estado-producto no-disponible"
          }
        >
          {producto.disponible
            ? "Disponible"
            : "No disponible"}
        </span>

      </div>

      <p className="descripcion-producto">
        {producto.descripcion}
      </p>

      <div className="datos-producto">

        <strong>
          ${producto.precio.toLocaleString("es-CO")}
        </strong>

        <span>
          <Clock />
          {producto.tiempoPreparacion} min
        </span>

      </div>

      <div className="acciones-producto">

        <button
          type="button"
          onClick={() => onEditar(producto)}
        >
          <Pencil />
          Editar
        </button>

        <button
          type="button"
          onClick={() =>
            onCambiarDisponibilidad(producto.id)
          }
        >
          {producto.disponible
            ? <EyeOff />
            : <Eye />}

          {producto.disponible
            ? "Deshabilitar"
            : "Habilitar"}
        </button>

      </div>

    </article>
  );
}
