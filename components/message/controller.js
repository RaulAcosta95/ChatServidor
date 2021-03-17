const store = require('./store');

function addMessage(user,message) {
    //...
    return new Promise((resolve,reject)=>{
        if (!user || !message) {
            console.error('[/Message/Controller] No hay usuario o mensaje correcto');
            return reject('Los datos son incorrectos')
        }
        const fullMessage={
            user:user,
            message: message,
            date: new Date()
        }
        console.log(`[${fullMessage.date}] ${fullMessage.user}: `);
        console.log(`${fullMessage.message}`);
        //De la store
        store.add(fullMessage);
        resolve(fullMessage);
    })

}
//Obten una lista de mensajes desde el store
function getMessages() {
    return new Promise((resolve,reject) => {
        resolve(store.list());
    });
}
module.exports={
    addMessage,
    getMessages
}