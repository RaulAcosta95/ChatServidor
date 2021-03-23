//A partir de la clase 24, la conexión se hará por aquí y no por store.js
//Trae mongoose 
const db = require('mongoose');

//Usa las promesas globales
db.Promise = global.Promise;

//Usa una función para poder controlar la conexión en server.js
async function connect(url) 
{
    //Conecta con la base de datos en la nube 
    //Aquí podria ir un try catch...
    await db.connect(         
        //usuario creado en https://cloud.mongodb.com/v2/60524d7d8413225466480184#clusters
        //usuario : contraseña del usuario@cluster..../colección
        //'mongodb+srv://db_user_raulacosta:ACZdd3N8X4@node1chat.ut3ep.mongodb.net/Telegrom'
    url,
    {//Unas instrucciónes que permiten mayor compatibilidad
    useNewUrlParser:true,
    useUnifiedTopology: true
    }
    );
}

console.log(`[DB] Conectada con éxito`);

//Exporta la función de conexión para que la use server.js a conveniencia
//Como es la única función, directamente la usa haciendo así, db('mongodb+srv://db_user_raulacosta:ACZdd3N8X4@node1chat.ut3ep.mongodb.net/Telegrom');
module.exports=connect;