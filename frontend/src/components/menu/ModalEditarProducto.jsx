import { useEffect, useState } from "react";
import {
  Clock,
  Image,
  ImageOff,
  Save,
  Sparkles,
  Tag,
  Type,
  X,
} from "lucide-react";

export default function ModalEditarProducto({
  abierto,
  producto,
  categorias,
  onCerrar,
  onGuardar,
}) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: "",
    imagen: "",
    tiempoPreparacion: "",
    disponible: true,
    destacado: false,
  });

  const [imagenConError, setImagenConError] =
    useState(false);

  useEffect(() => {
    if (!producto) {
      return;
    }

    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoriaId: producto.categoriaId,
      imagen: producto.imagen || "",
      tiempoPreparacion: producto.tiempoPreparacion,
      disponible: producto.disponible,
      destacado: Boolean(producto.destacado),
    });

    setImagenConError(false);
  }, [producto]);

  if (!abierto || !producto) {
    return null;
  }

  function actualizarCampo(campo, valor) {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));

    if (campo === "imagen") {
      setImagenConError(false);
    }
  }

  function manejarSubmit(evento) {
    evento.preventDefault();

    const precio = Number(formulario.precio);
    const tiempoPreparacion =
      Number(formulario.tiempoPreparacion);

    if (
      !formulario.nombre.trim() ||
      !formulario.descripcion.trim() ||
      !precio ||
      precio <= 0 ||
      !tiempoPreparacion ||
      tiempoPreparacion <= 0
    ) {
      return;
    }

    onGuardar({
      ...producto,
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio,
      categoriaId: Number(formulario.categoriaId),
      imagen: formulario.imagen.trim(),
      tiempoPreparacion,
      disponible: formulario.disponible,
      destacado: formulario.destacado,
    });
  }

  const mostrarImagen =
    formulario.imagen && !imagenConError;

  return (
    <div
      className="fondo-modal-menu"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) {
          onCerrar();
        }
      }}
    >
      <section className="modal-editar-producto">
        <div className="encabezado-modal-producto">
          <div>
            <span>EDITAR PRODUCTO</span>
            <h2>{producto.nombre}</h2>
          </div>

          <button
            type="button"
            className="boton-cerrar-modal"
            onClick={onCerrar}
            aria-label="Cerrar modal"
          >
            <X />
          </button>
        </div>

        <form
          className="formulario-editar-producto"
          onSubmit={manejarSubmit}
        >
          <div className="preview-producto-modal">
            {mostrarImagen ? (
              <img
                src={formulario.imagen}
                alt={formulario.nombre}
                onError={() => setImagenConError(true)}
              />
            ) : (
              <div className="preview-producto-placeholder">
                <ImageOff />
                <span>Foto pendiente</span>
              </div>
            )}
          </div>

          <div className="campos-producto-modal">
            <div className="grupo-modal-producto campo-completo">
              <label htmlFor="editarNombreProducto">
                <Type />
                Nombre
              </label>
              <input
                id="editarNombreProducto"
                type="text"
                value={formulario.nombre}
                onChange={(evento) =>
                  actualizarCampo(
                    "nombre",
                    evento.target.value
                  )
                }
                required
              />
            </div>

            <div className="grupo-modal-producto campo-completo">
              <label htmlFor="editarDescripcionProducto">
                <Tag />
                Descripcion
              </label>
              <textarea
                id="editarDescripcionProducto"
                rows="3"
                value={formulario.descripcion}
                onChange={(evento) =>
                  actualizarCampo(
                    "descripcion",
                    evento.target.value
                  )
                }
                required
              />
            </div>

            <div className="grupo-modal-producto">
              <label htmlFor="editarCategoriaProducto">
                <Tag />
                Categoria
              </label>
              <select
                id="editarCategoriaProducto"
                value={formulario.categoriaId}
                onChange={(evento) =>
                  actualizarCampo(
                    "categoriaId",
                    evento.target.value
                  )
                }
              >
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="grupo-modal-producto">
              <label htmlFor="editarPrecioProducto">
                <Tag />
                Precio
              </label>
              <input
                id="editarPrecioProducto"
                type="number"
                min="1"
                value={formulario.precio}
                onChange={(evento) =>
                  actualizarCampo(
                    "precio",
                    evento.target.value
                  )
                }
                required
              />
            </div>

            <div className="grupo-modal-producto">
              <label htmlFor="editarTiempoProducto">
                <Clock />
                Tiempo
              </label>
              <input
                id="editarTiempoProducto"
                type="number"
                min="1"
                value={formulario.tiempoPreparacion}
                onChange={(evento) =>
                  actualizarCampo(
                    "tiempoPreparacion",
                    evento.target.value
                  )
                }
                required
              />
            </div>

            <div className="grupo-modal-producto">
              <label htmlFor="editarImagenProducto">
                <Image />
                Imagen
              </label>
              <input
                id="editarImagenProducto"
                type="text"
                value={formulario.imagen}
                onChange={(evento) =>
                  actualizarCampo(
                    "imagen",
                    evento.target.value
                  )
                }
                placeholder="/images/menu/plato.jpg"
              />
            </div>

            <label className="interruptor-producto">
              <input
                type="checkbox"
                checked={formulario.disponible}
                onChange={(evento) =>
                  actualizarCampo(
                    "disponible",
                    evento.target.checked
                  )
                }
              />
              <span />
              Disponible
            </label>

            <label className="interruptor-producto">
              <input
                type="checkbox"
                checked={formulario.destacado}
                onChange={(evento) =>
                  actualizarCampo(
                    "destacado",
                    evento.target.checked
                  )
                }
              />
              <span />
              <Sparkles />
              Destacado
            </label>
          </div>

          <div className="acciones-modal-producto">
            <button
              type="button"
              onClick={onCerrar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="boton-guardar-producto"
            >
              <Save />
              Guardar cambios
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
