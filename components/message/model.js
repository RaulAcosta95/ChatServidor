//mongoose sirve para declarar los schema y definir la estructura (npm i mongoose)
const mongoose = require('mongoose');

//Usamos la clase schema aparte
const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

//Manda el schema a la base de datos
//Este es el modelo(Colección) de Message
const model = mongoose.model('Messages',mySchema);
//El modelo lo usa store.js
module.exports = model;