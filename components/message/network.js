//Este archivo es unicamente para el modulo de message
const express = require ('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();//AQUÍ SE CREA EL ROUTER

    //Get de mensajes
    router.get('/', function (req,res) {
        //Obtén el Query para obtener mensajes de x usuario
        const filterMessages = req.query.user || null;
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
    router.post('/', function (req,res) {
        //Usa la función del controller
        // controller.addMessage(req.body.user,req.body.message);
        controller.addMessage(req.body.user,req.body.message)
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