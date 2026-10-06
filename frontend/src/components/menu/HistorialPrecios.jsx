import {
  ArrowRight,
  History,
  X,
} from "lucide-react";

export default function HistorialPrecios({
  producto,
  historial,
  abierto,
  onCerrar,
}) {

  if (!abierto || !producto) {
    return null;
  }


  const historialProducto =
    historial.filter(
      (cambio) =>
        cambio.productoId === producto.id
    );


  return (

    <div className="fondo-modal activo">

      <section className="modal-historial-precios">

        <div className="encabezado-modal-precio">

          <div>

            <span>
              HISTORIAL
            </span>

            <h2>
              {producto.nombre}
            </h2>

          </div>

          <button
            type="button"
            onClick={onCerrar}
          >
            <X />
          </button>

        </div>


        {historialProducto.length === 0 ? (

          <div className="sin-historial">

            <History />

            <p>
              Este producto todavía no tiene
              cambios de precio registrados.
            </p>

          </div>

        ) : (

          <div className="lista-historial-precios">

            {historialProducto.map(
              (cambio) => (

                <article
                  key={cambio.id}
                  className="cambio-precio"
                >

                  <div>

                    <span>
                      Precio anterior
                    </span>

                    <strong>
                      $
                      {cambio.precioAnterior
                        .toLocaleString("es-CO")}
                    </strong>

                  </div>


                  <ArrowRight />


                  <div>

                    <span>
                      Precio nuevo
                    </span>

                    <strong>
                      $
                      {cambio.precioNuevo
                        .toLocaleString("es-CO")}
                    </strong>

                  </div>


                  <small>
                    {cambio.fecha}
                  </small>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </div>

  );
}