//mongoose sirve para declarar los schema y definir la estructura (npm i mongoose)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    //Parametros del componente User
    name: String
});

//Manda el schema a la base de datos
//Este es el modelo(Colección) de User
const model = mongoose.model('User',mySchema);
//El modelo lo usa store.js
module.exports = model;