import { useEffect, useState } from "react";

import {
  DollarSign,
  Save,
  X,
} from "lucide-react";

export default function ModalCambiarPrecio({
  producto,
  abierto,
  onCerrar,
  onGuardar,
}) {

  const [nuevoPrecio, setNuevoPrecio] =
    useState("");


  // Cuando se selecciona un producto,
  // colocamos su precio actual en el campo.
  useEffect(() => {

    if (producto) {
      setNuevoPrecio(producto.precio);
    }

  }, [producto]);


  if (!abierto || !producto) {
    return null;
  }


  function manejarSubmit(evento) {

    evento.preventDefault();

    const precioConvertido =
      Number(nuevoPrecio);


    if (
      !precioConvertido ||
      precioConvertido <= 0
    ) {
      return;
    }


    onGuardar(
      producto,
      precioConvertido
    );

  }


  return (

    <div className="fondo-modal activo">

      <section className="modal-precio">

        <div className="encabezado-modal-precio">

          <div>
            <span>
              ACTUALIZAR PRECIO
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


        <form
          onSubmit={manejarSubmit}
          className="formulario-precio"
        >

          <div className="precio-anterior">

            <span>
              Precio actual
            </span>

            <strong>
              ${producto.precio.toLocaleString("es-CO")}
            </strong>

          </div>


          <div className="grupo-formulario">

            <label htmlFor="nuevoPrecio">
              <DollarSign />
              Nuevo precio
            </label>

            <input
              id="nuevoPrecio"
              type="number"
              min="1"
              value={nuevoPrecio}
              onChange={(evento) =>
                setNuevoPrecio(
                  evento.target.value
                )
              }
              required
            />

          </div>


          <div className="mensaje-historico">

            Los pedidos realizados anteriormente
            conservarán el precio registrado
            al momento de su creación.

          </div>


          <div className="acciones-modal">

            <button
              type="button"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="boton-confirmar-precio"
            >
              <Save />

              Guardar nuevo precio
            </button>

          </div>

        </form>

      </section>

    </div>

  );
}