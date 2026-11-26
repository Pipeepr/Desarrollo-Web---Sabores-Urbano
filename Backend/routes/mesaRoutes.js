
import { Router } from 'express';

import {
  obtenerMesas,
  obtenerDisponibilidad,
  actualizarEstadoMesa,
  crearMesa,
  actualizarMesa,
  eliminarMesa
} from '../controllers/mesaController.js';

import {
  validarEstadoMesa,
  validarIdMesa
} from '../middleware/validarMesa.js';

const router = Router();

// RF3: Obtener todas las mesas
router.get('/', obtenerMesas);

// RF5: Consultar mesas disponibles
router.get('/disponibilidad', obtenerDisponibilidad);

// RF3: Crear una mesa
router.post('/', crearMesa);

// RF3: Editar una mesa
router.put('/:id', validarIdMesa, actualizarMesa);

// RF3: Eliminar una mesa
router.delete('/:id', validarIdMesa, eliminarMesa);

// RF3: Actualizar el estado de una mesa
router.patch(
  '/:id/estado',
  validarIdMesa,
  validarEstadoMesa,
  actualizarEstadoMesa
);

export default router;
