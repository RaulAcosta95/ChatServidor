const Model = require('./model');

//Crea un nuevo chat en la DB
function addChat(chat) {
    const myChat = new Model(chat);
    return myChat.save();
}

//Obtiene los chats a los que pertenece un usuario
//Esto se debería llamar getChats..
function listChats(userId)
{
    return new Promise((resolve,reject)=>
    {
        let filter = {};
        if (userId)
        {
            users: userId
        }
        Model.find(filter)
            .populate('users')
            .exec((error, populated)=>{
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });
}

module.exports = {
    add: addChat,
    list: listChats
}