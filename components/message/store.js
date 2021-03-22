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
async function getMessages(filterUser) {
    //Si no se le pasa el filterUser, entonces es una cadena sin filtros
    let filter = {};
    //Identifica si hay filtro de usuario
    if (filterUser !== null) {
        //Solo trae los usuarios que user = filterUser
        filter = { user: filterUser };
    }
    //Pide todo el modelo (los datos tipo json) de la base de datos
    const messages = await Model.find(filter);  
    return messages;  
}

//Edita un mensaje en la BD
async function updateText(id, body) {
    //Encuentra el mensaje con el id en la base de datos MongoDb Atlas
    const foundMessage = await Model.findOne({
        _id: id
    });
    //Modifica el message del mensaje encontrado (message es un parámetro)
    foundMessage.message = body;
    //Guarda en la DB, y esa instrucción la guarda en una variable
    const newMessage = await foundMessage.save();
    //Lo guardó en la variable para poder retornarlo
    return newMessage;
}

//Esta función de removeMessage se exporta como "remove", que es como lo usa controller.js
function removeMessage(id) {
    //Esta es una función de la base de datos... en este archivo están esas funciones
    return Model.deleteOne({
        _id: id
    });
}

//Los usa controller.js
module.exports = {
    add: addMessage,
    list: getMessages,
    //Funciones a futuro...
    //get para obtener un mensaje
    //update para editar un mensaje
    updateText: updateText,
    //delete para eliminar un mensaje
    remove: removeMessage
}