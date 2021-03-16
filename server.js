//Trae el paquete de express (Como importar)
const express = require ('express');
//Define el router
const router = express.Router();
//Inicializa express
var app = express();
//Añade el uso de Json
app.use(express.json());
//Añade el uso de nose
app.use(express.urlencoded({extended : false}));
//Responde a las peticiones a través de response.js
const response = require('./network/response.js')
//Permite a Express responder con Archivos Estáticos
//ARCHIVOS FRONT END en public
app.use('/app', express.static('public')); 
//Añade el router a la aplicación (Debe ir a lo último)
app.use(router);


//Controla las respuestas para cada método y cada ruta
router.get('/index', function (req,res) { 
    console.log(req.headers);
    
    //Validación en la respuesta
    if (req.query.error=="ok") {//En caso que encuentre que el error es... ok...???
      response.error(req,res,'Un Error Simulado', 400);
    } else {//En caso que no haya error ok..??? que forma tan rara de hacer validación es esta
      response.success(req,res,'Todo bien',200);
    }
  });

router.post('/index', function (req,res) {
    console.log(req.headers);
    response.success(req,res,'Se creó un recurso en el post')

  //Validación en la respuesta
  if (req.query.error=="ok") {//En caso que encuentre que el error es... ok...???
    response.error(req,res,'Error en el post', 400);
  } else {//En caso que no haya error ok..??? que forma tan rara de hacer validación es esta
    response.success(req,res,'Todo bien',200);
  }
});

//Asigna un puerto para Express, 3000 es el más usado
app.listen(3000);
//Mensaje para la consola al ejecutar correctamente
console.log(`La aplicación se escucha en el http://localhost:3000`);
//Ahora Ejecuta en la consola de visual estudio "node server.js (el archivo)"