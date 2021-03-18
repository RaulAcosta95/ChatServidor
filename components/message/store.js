//Trae mongoose 
const db = require('mongoose');
//Trae el modelo
const Model = require('./model');
//Usa las promesas globales
db.Promise = global.Promise;

//Conecta con la base de datos en la nube 
//Aquí podria ir un try catch...
db.connect(         //usuario creado en https://cloud.mongodb.com/v2/60524d7d8413225466480184#clusters
                    //usuario : contraseña del usuario@cluster..../colección
     'mongodb+srv://db_user_raulacosta:ACZdd3N8X4@node1chat.ut3ep.mongodb.net/Telegrom',
    {   //Unas instrucciónes que permiten mayor compatibilidad
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
);
console.log(`[DB] Conectada con éxito`);

function addMessage(message) {
    //Crea un nuevo modelo con la información del mensaje que mandemos.
    //Este modelo está en model.js y se conecta a la db en la nube
    //MongoDB crea un ID en automático, no hace falta declararlo en el model.js
    const myMessage = new Model(message);
    myMessage.save();
}

//Vuelve la función de obtener mensajes como asincrona, de esa manera
//no habrá problema si no consigue correctamente la lista
async function getMessages() {
    //Pide todo el modelo (los datos tipo json) de la base de datos
    const messages = await Model.find();  
    return messages;  
}

module.exports = {
    add: addMessage,
    list: getMessages
    //Funciones a futuro...
    //get para obtener un mensaje
    //update para editar un mensaje
    //delete para eliminar un mensaje
}