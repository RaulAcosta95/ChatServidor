//mongoose sirve para declarar los schema y definir la estructura (npm i mongoose)
const mongoose = require('mongoose');

//Usamos la clase schema aparte
const Schema = mongoose.Schema;

const mySchema = new Schema({
    //Ahora añadimos la entidad (componente) de chat
    chat:{
        type: Schema.ObjectId,
        ref: 'Chat',
        required: true
    },
    //Ahora user va a ser el componente user y no solo un nombre
    user: {
        type: Schema.ObjectId,//Ahora recibe un id de la bd
        ref: 'User', //Le dice de cuál modelo es el Id
        required: true
    },
    message: {
        type: String,
        required: true
    },
    file: {
        type: String//El file puede venir o no venir, no usa required: true
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