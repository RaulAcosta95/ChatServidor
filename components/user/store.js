//Trae el modelo (Recuerda npm i model)
const Model = require('./model');

//Añade un usuario a la BD
function addUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}
//Vuelve la función de obtener mensajes como asincrona, de esa manera
//no habrá problema si no consigue correctamente la lista
async function getUsers() {
    //Pide todo el modelo (los datos tipo json) de la base de datos
    const users = await Model.find();  
    return users;  
}

//Los usa controller.js
module.exports = {
    add: addUser,
    list: getUsers
}