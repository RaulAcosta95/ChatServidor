const express = require ('express');
const router = express.Router();
var app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended : false}));
const response = require('./network/response.js')
    //Permite a Express responder con Archivos Estáticos
    app.use('/app', express.static('public')); 
    //Añade el router a la aplicación (Debe ir a lo último)
    app.use(router);
    router.get('/', function (req,res) {
      if (req.query.error=="ok") {
        response.error(req,res,'Mensaje Error del Front, no puede acceder al SERVIDOR',404, 'Error Simulado (mensaje de details)')
      } else {
        response.success(req,res, 'Accedió al SERVIDOR')
      }
    });

    //El get de la app entra directamente al index, por lo tanto no manda mensaje
    router.get('/app', function (req,res) {
      if (req.query.error=="ok") {
        response.error(req,res,'Mensaje Error del Front, no puede acceder a la página web',404,'Error Simulado en la app (mensaje del details)')
      } else {
        console.log('Un usuario accedió a la página web');
        response.success(req,res, 'Accedió a la página web',201)
      }
    });

//Asigna un puerto para Express, 3000 es el más usado
app.listen(3000);
//Mensaje para la consola al ejecutar correctamente
console.log(`La aplicación se escucha en el http://localhost:3000`);
//Ahora Ejecuta en la consola de visual estudio "node server.js (el archivo)"