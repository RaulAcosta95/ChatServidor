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
async function updateUser(id, user) {
    //Encuentra el usuario con el id en la base de datos MongoDb Atlas
    const foundUser = await Model.findOne({
        _id: id
    });
    //Modifica el message del mensaje encontrado (message es un parámetro)
    foundUser.name = user;
    //Guarda en la DB, y esa instrucción la guarda en una variable
    const newUser = await foundUser.save();
    //Lo guardó en la variable para poder retornarlo
    return newUser;
}
async function removeUsers(id) {
    //Pide todo el modelo (los datos tipo json) de la base de datos
    return Model.deleteOne({
        _id: id
    }); 
}
//Los usa controller.js
module.exports = {
    add: addUser,
    list: getUsers,
    updateText: updateUser,
    remove: removeUsers
}