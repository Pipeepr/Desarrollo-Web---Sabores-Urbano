import {
  History,
  Pencil,
  Tag,
} from "lucide-react";

export default function ProductoPrecioCard({
  producto,
  onCambiarPrecio,
  onVerHistorial,
}) {
  return (
    <article className="producto-precio-card">

      <div className="producto-precio-info">

        <span className="categoria-precio">
          {producto.categoria}
        </span>

        <h3>
          {producto.nombre}
        </h3>

        <div className="precio-actual">
          <Tag />

          <strong>
            ${producto.precio.toLocaleString("es-CO")}
          </strong>
        </div>

      </div>

      <div className="acciones-precio">

        <button
          type="button"
          className="boton-cambiar-precio"
          onClick={() =>
            onCambiarPrecio(producto)
          }
        >
          <Pencil />

          Cambiar precio
        </button>

        <button
          type="button"
          className="boton-historial-precio"
          onClick={() =>
            onVerHistorial(producto)
          }
        >
          <History />

          Historial
        </button>

      </div>

    </article>
  );
}