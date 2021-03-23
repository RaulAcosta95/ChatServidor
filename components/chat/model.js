//mongoose sirve para declarar los schema y definir la estructura (npm i mongoose)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    //Parametros del componente Chat
    //Arreglo de objetos usuarios (1 o más)
    users:
        [{ 
            type: Schema.ObjectId, 
            ref:'User'
        }]
        
});

//Manda el schema a la base de datos
//Este es el modelo(Colección) del chat
const model = mongoose.model('Chat',mySchema);
//El modelo lo usa store.js
module.exports = model;