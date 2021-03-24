//Este archivo es unicamente para el modulo de message
const express = require ('express');
//Para poder usar Archivos usamos multer npm i multer clase 27
//Para que los archivos no sean binarios, obtenemos la extención con path
const path = require("path");
const multer = require('multer');

const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();//AQUÍ SE CREA EL ROUTER

//Controla el destino de los archivos en el servidor
//storage = multer.diskStorage es algo que saqué de la clase
const storage = multer.diskStorage({
    destination : "public/files/",
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname)); //Obtén el nombre original y lo utiliza en lugar de volverlo binario
    }
});
const upload = multer({ storage: storage }); //Si queremos encriptar a binario, solo cambiar por multer({dest: 'uploads/',});

    //Get de mensajes
    router.get('/', function (req,res) {
        //Obtén el Query para obtener mensajes de x usuario
                            //Ahora en lugar del usuario, pide el chat
                            //const filterMessages = req.query.user || null;
        const filterMessages = req.query.chat || null;
        //Al getMessages le pasamos el filtro del query
        //Recuerda que controller es lo que exporta el archivo controller.js
        controller.getMessages(filterMessages)
            .then((messageList)=>{
                response.success(req,res,messageList,200);
            })
            .catch(error => {
                response.error(req,res,'Error Inesperado',500, error);
            });
    });

    //post de mensajes
    //upload es el midleware por el que pasa el archivo antes de entrar a la función
    router.post('/',upload.single('file'), function (req,res) {
        // console.log(req.file);//Muchos parametros del fichero
        //Usa la función del controller
        // controller.addMessage(req.body.user,req.body.message);
                            //Ahora pide el chat y un file
        controller.addMessage(req.body.chat,req.body.user,req.body.message, req.file)
            .then((fullMessage)=>{
                response.success(req,res, fullMessage,201)
            })
            .catch(error =>{
                response.error(req,res,'Error al hacer POST de MESSAGE',404,'El usuario no pudo postear el mensaje')
            }); 
    });

    //parch de mensajes (actualiza)
    //da un id para saber a cual mensaje hacer patch
    router.patch('/:id', function (req,res) {
        //obtén el id
        // console.log(req.params.id);
        //Una función de controller que vamos a crear, será con promesa
        controller.updateMessage(req.params.id, req.body.message) //Recibe el id y el parametro message
                    .then((data)=>{
                        //El resultado de la promesa es regresar la data
                        response.success(req,res,data,200);
                    })
                    .catch(error =>{
                        response.error(req,res,'Error interno',500,error);
                    });

        // res.send('Todo bien con el id:' + req.params.id)
    });

    //Elimina un mensaje por id, o por usuario??
    router.delete('/:id', function (req,res) {
        controller.deleteMessage(req.params.id)
            .then(()=>{
                response.success(req,res, `Mensaje con el id ${req.params.id} eliminado`,200)
            })
            .catch(error =>{
                response.error(req,res, 'Error interno', 500, error);
            });
      });
//Permite exportar el router hacia routes.js
module.exports = router;