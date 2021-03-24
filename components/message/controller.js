const store = require('./store');

//Añade un mensaje a la base de datos tipo json
                                        //Ahora recibe un file (antes solo lo guardaba)
function addMessage(chat, user, message, file) {
    return new Promise((resolve,reject)=>{
        if (!chat || !user || !message) {
            console.error('[/Message/Controller] No hay usuario, chat o mensaje correcto');
            return reject('Los datos son incorrectos')
        }

        //Crea un url para el file que mande
        let fileUrl = '';
        if (file) {
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }
        const fullMessage={
            chat: chat,
            user: user,
            message: message,
            file: fileUrl,//Si hay un file, lo guarda en el url
            date: new Date()
        };
        //Luego borrar estos log que no son necesarios en consola
        // console.log(`[${fullMessage.date}] ${fullMessage.user}: `);
        // console.log(`${fullMessage.message}`);
        //Añade un mensaje en el chat
        store.add(fullMessage);
        resolve(fullMessage);
    })

}

//Obten una lista de mensajes desde el store
        //Ahora filtrará los msg por chat (si le llega el parámetro)
function getMessages(filterChat) {
    return new Promise((resolve,reject) => {
        //store.list es lo que exporta store.js, pero la función se llama getMessages en store.js
        resolve(store.list(filterChat));
    });
}

//Edita el mensaje con el id dado, y pone el nuevo body
 function updateMessage(id, body) {
     //La vuelve async y permite que los mensajes salgan en orden
    return new Promise(async(resolve,reject)=>{
        //Validación
        if (!id || !body) {
            reject('Datos invalidos');
            return false;
        }
        //usa una función de store que actualice un mensaje
        // result es la lista de mensajes en orden gracias a await
        //Recuerda que store es de store.js, así que la función  updateText está en el archivo
        const result = await store.updateText(id,body);
        //Resuelve la promesa con result
        resolve(result);
    });//Fin de promesa
}

//Para eliminar mensajes con el id
function deleteMessage(id) {
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

//Los usa el archivo network.js
module.exports={
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}