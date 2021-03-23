const store = require('./store');

//Crear el chat
function addChat(users) {  
    //Si no recibe un array de usuarios correcto
    if (!users || !Array.isArray(users)) {
        return Promise.reject('Lista de usuarios inválida');
    }
    //Crea el chat
    const chat = {
        users: users
    }
    //manda a store el chat a la función add (la que exporta)
    return store.add(chat);
}

//Para el get de chat, manda una lista de los chat del usuario...ya entendí
function listChat(userId){
    return store.list(userId);
}
module.exports = {
    addChat,
    listChat
}