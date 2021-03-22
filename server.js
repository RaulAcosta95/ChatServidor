const express = require ('express');
//Ahora obtén el router de /network/routes.js
const router = require('./network/routes')//RECIBE LAS RUTAS EXISTENTES DE ROUTES.JS
 
var app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended : false}));

    //Ahora en lugar de usar app.use(router), le pasaremos el
    //servidor de express que creamos al router
    router(app);

    //Asigna un puerto para Express, 3000 es el más usado
    app.listen(3000);

    //Permite a Express responder con Archivos Estáticos
    app.use('/app', express.static('public')); 

//Mensaje para la consola al ejecutar correctamente
console.log(`La aplicación se escucha en el http://localhost:3000`);
//Ahora Ejecuta en la consola de visual estudio "node server.js (el archivo)"
//Ahora Ejecuta en la consola de visual estudio "nodemon server.js (el archivo)"