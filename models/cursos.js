const {model, Schema} = require('mongoose');


const CursosSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    autor: {
        type: String,
        required: [true, 'El autor es obligatorio'],
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis del libre es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    urlFoto: {
        type: String,
        required: [true, 'La url de la fotografia es obligatoria']
    },
    urlCompra: {
        type: String,
        required: [true, 'El link de descarga es obligatorio']
    },
    categoria: {
        type: String,
        required: true,
        enum: ['TECNOLOGIA', 'COCINA', 'MECANICA', 'SALUD', 'PERIODISMO']
    }
});

module.exports = model('Cursos', CursosSchema);