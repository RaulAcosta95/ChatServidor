const express = require ('express');
const app = express();
//Ahora trae el servidor http como en el servidor de WebSocket
const server = require('http').Server(app);

//Ahora trae el cors que permite restringir el acceso a usuarios por nivel
//habilita la cabecera allow-cross origin, recuerda npm i cors
const cors = require('cors');


//Ahora conecta con la BD a través de aquí y el archivo db.js
const db = require('./db');
db('mongodb+srv://db_user_raulacosta:ACZdd3N8X4@node1chat.ut3ep.mongodb.net/Telegrom');
//Ahora obtén el router de /network/routes.js
const router = require('./network/routes')//RECIBE LAS RUTAS EXISTENTES DE ROUTES.JS

//Ahora trae el objeto socket de socket.js para poder usar socket.io (de la función connect)
const socket = require ('./socket');

//permite a la app usar el cors, y lo ejecuta a su vez
app.use(cors());
//Permite usar objetos tipo json
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Le pasamos el servidor http al socket
socket.connect(server);

//Ahora en lugar de usar app.use(router), le pasaremos el
//servidor de express que creamos al router
router(app);

//Asigna un puerto para Express, 3000 es el más usado
// app.listen(3000);
//Ahora usa server en lugar de app, pues trae el servidor http y reemplaza a app, o la absorve
server.listen(3000, function () {//Recuerda, esto es un callback
    //Mensaje para la consola al ejecutar correctamente
    console.log(`La aplicación se escucha en el http://localhost:3000`);
    }
);

    //Permite a Express responder con Archivos Estáticos
    app.use('/app', express.static('public')); 

//Ahora Ejecuta en la consola de visual estudio "node server.js (el archivo)"
//Ahora Ejecuta en la consola de visual estudio "nodemon server.js (el archivo)"