//Este archivo es unicamente para el modulo de message
const express = require ('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();//AQUÍ SE CREA EL ROUTER

    //Get de mensajes
    router.get('/', function (req,res) {
        controller.getMessages()
        .then((messageList)=>{
            response.success(req,res,messageList,200);
        })
        .catch(error => {
            response.error(req,res,'Error Inesperado',500, error);
        })
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

//Permite exportar el router hacia donde se necesite TN8bUAh505RoiGAK
module.exports = router;