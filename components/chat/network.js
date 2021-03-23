//Este archivo es unicamente para el modulo de chat
const express = require ('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();//AQUÍ SE CREA EL ROUTER

//Las rutas para el chat

//Obtén solo el chat de un usuario que le demos
router.get('/:userId', function (req,res) {  
    controller.listChat(req.params.userId)
        .then(users=>{
            response.success(req,res,users,200);
        })
        .catch(error=>{
            response.error(req,res,'Error interno', 500, error);
        });
});

//Crea un nuevo chat con más de un usuario (body.users)
router.post('/', function (req,res) {  
    //el parametro body.users debe ser un arreglo de id de usuarios
    controller.addChat(req.body.users)
        .then(data=>{//Responde con el chat (data)
            response.success(req,res,data,201);
        })
        .catch(error=>{
            response.error(req, res, 'Error interno', 500, console.error);
        });
});

module.exports = router;