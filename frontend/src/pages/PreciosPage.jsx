import { useState } from "react";

import {
  ReceiptText,
  Tags,
} from "lucide-react";

import ProductoPrecioCard
  from "../components/menu/ProductoPrecioCard";

import ModalCambiarPrecio
  from "../components/menu/ModalCambiarPrecio";

import HistorialPrecios
  from "../components/menu/HistorialPrecios";

import {
  historialPreciosInicial,
  pedidosHistoricos,
  productosIniciales,
} from "../data/preciosData";

import "../styles/precios.css";


export default function PreciosPage() {

  // =========================================================
  // PRODUCTOS
  // =========================================================

  const [
    productos,
    setProductos,
  ] = useState(productosIniciales);


  // =========================================================
  // HISTORIAL DE PRECIOS
  // =========================================================

  const [
    historialPrecios,
    setHistorialPrecios,
  ] = useState(historialPreciosInicial);


  // =========================================================
  // PRODUCTO SELECCIONADO
  // =========================================================

  const [
    productoSeleccionado,
    setProductoSeleccionado,
  ] = useState(null);


  // =========================================================
  // MODALES
  // =========================================================

  const [
    modalPrecioAbierto,
    setModalPrecioAbierto,
  ] = useState(false);


  const [
    historialAbierto,
    setHistorialAbierto,
  ] = useState(false);


  // =========================================================
  // ABRIR MODAL PARA CAMBIAR PRECIO
  // =========================================================

  function abrirCambioPrecio(producto) {

    setProductoSeleccionado(producto);

    setModalPrecioAbierto(true);

  }


  // =========================================================
  // ABRIR HISTORIAL
  // =========================================================

  function abrirHistorial(producto) {

    setProductoSeleccionado(producto);

    setHistorialAbierto(true);

  }


  // =========================================================
  // CAMBIAR PRECIO
  // =========================================================

  function cambiarPrecio(
    producto,
    nuevoPrecio
  ) {

    const cambio = {

      id: Date.now(),

      productoId:
        producto.id,

      precioAnterior:
        producto.precio,

      precioNuevo:
        nuevoPrecio,

      fecha:
        new Date()
          .toISOString()
          .split("T")[0],

    };


    // Guardamos el cambio en el historial.
    setHistorialPrecios(
      (historialActual) => [
        ...historialActual,
        cambio,
      ]
    );


    // Cambiamos solamente el precio actual
    // del producto.
    setProductos(
      (productosActuales) =>
        productosActuales.map(
          (item) => {

            if (
              item.id === producto.id
            ) {

              return {
                ...item,
                precio: nuevoPrecio,
              };

            }

            return item;

          }
        )
    );


    setModalPrecioAbierto(false);

    setProductoSeleccionado(null);

  }


  return (

    <main className="pagina-precios">

      <section className="contenedor-precios">


        {/* ===================================================
            CABECERA
        =================================================== */}

        <header className="cabecera-precios">

          <div>

            <span className="etiqueta-precios">
              RF8
            </span>

            <h1>
              Gestión de precios
            </h1>

            <p>
              Actualiza los precios de los productos
              conservando el valor histórico de
              los pedidos realizados.
            </p>

          </div>

          <Tags />

        </header>


        {/* ===================================================
            PRODUCTOS
        =================================================== */}

        <section className="seccion-precios">

          <h2>
            Productos
          </h2>


          <div className="grid-productos-precios">

            {productos.map(
              (producto) => (

                <ProductoPrecioCard
                  key={producto.id}
                  producto={producto}
                  onCambiarPrecio={
                    abrirCambioPrecio
                  }
                  onVerHistorial={
                    abrirHistorial
                  }
                />

              )
            )}

          </div>

        </section>


        {/* ===================================================
            PEDIDOS HISTÓRICOS
        =================================================== */}

        <section className="seccion-pedidos-historicos">

          <div className="titulo-seccion">

            <ReceiptText />

            <div>
              <h2>
                Pedidos realizados
              </h2>

              <p>
                Estos precios no cambian aunque
                se modifique el producto.
              </p>
            </div>

          </div>


          <div className="lista-pedidos-historicos">

            {pedidosHistoricos.map(
              (pedido) => (

                <article
                  key={pedido.id}
                  className="pedido-historico"
                >

                  <div className="pedido-historico-cabecera">

                    <strong>
                      Pedido #{pedido.id}
                    </strong>

                    <span>
                      {pedido.fecha}
                    </span>

                  </div>


                  {pedido.productos.map(
                    (producto) => (

                      <div
                        key={
                          `${pedido.id}-${producto.productoId}`
                        }
                        className="producto-pedido-historico"
                      >

                        <div>

                          <strong>
                            {producto.nombre}
                          </strong>

                          <span>
                            Cantidad:
                            {" "}
                            {producto.cantidad}
                          </span>

                        </div>

                        <strong>
                          $
                          {producto.precioUnitario
                            .toLocaleString("es-CO")}
                        </strong>

                      </div>

                    )
                  )}

                </article>

              )
            )}

          </div>

        </section>


      </section>


      {/* =====================================================
          MODAL CAMBIAR PRECIO
      ===================================================== */}

      <ModalCambiarPrecio

        abierto={
          modalPrecioAbierto
        }

        producto={
          productoSeleccionado
        }

        onCerrar={() => {
          setModalPrecioAbierto(false);
          setProductoSeleccionado(null);
        }}

        onGuardar={
          cambiarPrecio
        }

      />


      {/* =====================================================
          HISTORIAL
      ===================================================== */}

      <HistorialPrecios

        abierto={
          historialAbierto
        }

        producto={
          productoSeleccionado
        }

        historial={
          historialPrecios
        }

        onCerrar={() => {
          setHistorialAbierto(false);
          setProductoSeleccionado(null);
        }}

      />


    </main>

  );

}