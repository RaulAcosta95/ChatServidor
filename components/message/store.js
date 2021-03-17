const list = [];

function addMessage(message) {
    list.push(message);
}

function getMessages() {
    return list;
}

module.exports = {
    add: addMessage,
    list: getMessages
    //Funciones a futuro...
    //get para obtener un mensaje
    //update para editar un mensaje
    //delete para eliminar un mensaje
}