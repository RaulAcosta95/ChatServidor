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
function deleteUser(id) {
    return new Promise((resolve, reject)=>{
        if (!id) {//Por si no viene el id
            reject(`Id no reconocido`);
            return false;
        }
        store.remove(id)//función en el Store
            .then(()=>{
                resolve();
            })
            .catch(error=>{
                reject(error);
            });
    });
}
function updateUser(id, user) {
    console.log('id: ' + id +"| user: " + user);
     //La vuelve async y permite que los mensajes salgan en orden
    return new Promise(async(resolve,reject)=>{
        //Validación
        if (!id || !user) {
            reject('Datos invalidos');
            return false;
        }
        //usa una función de store que actualice un mensaje
        // result es la lista de mensajes en orden gracias a await
        //Recuerda que store es de store.js, así que la función  updateText está en el archivo
        const result = await store.updateText(id,user);
        //Resuelve la promesa con result
        resolve(result);
    });//Fin de promesa
}
module.exports= {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}