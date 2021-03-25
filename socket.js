//Aquí traemos el servidor de WebSockets.io
//recuerda npm i socket.io
const socketIO = require('socket.io');

//Objeto donde guarda toda la información
//Los objetos se guardan como referencia
//Cuando algo de este objeto cambie, la variable a donde la mandemos se va a actualizar
const socket={};

//Crea una función de conexión
function connect(server) {  
    //Inicializa un parametro del objeto de socket, llamado "io"
   socket.io = socketIO(server);
}

module.exports={
    connect,
    socket
}