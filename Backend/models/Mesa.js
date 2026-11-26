
import mongoose from 'mongoose';

const mesaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  numero: {
    type: String,
    required: true
  },
  zona: {
    type: String,
    required: true
  },
  capacidad: {
    type: Number,
    required: true,
    min: 1
  },
  restauranteCodigo: {
    type: String,
    trim: true,
    uppercase: true,
    default: null
  },
  estado: {
    type: String,
    enum: [
      'disponible',
      'reservada',
      'ocupada',
      'limpieza',
      'fuera'
    ],
    default: 'disponible'
  }
}, {
  timestamps: true,
  collection: 'mesas'
});

export const Mesa = mongoose.model('Mesa', mesaSchema);
