const store = require ('./store');

//Añade un usuario con el metodo post
function addUser(name) {  
    if (!name) {
        return Promise.reject('Nombre Invalido');
    }
    const user = {
        name,
    };
    //Del archivo store.js
    return store.add(user);
}

function getUsers() {
    return new Promise((resolve,reject) => {
        //store.list es lo que exporta store.js, pero la función se llama getMessages en store.js
        resolve(store.list());
    });
}
module.exports= {
    addUser,
    getUsers
}