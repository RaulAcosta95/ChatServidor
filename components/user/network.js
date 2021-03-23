//Este archivo es unicamente para el modulo de user
const express = require ('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();//AQUÍ SE CREA EL ROUTER

//Crea las rutas
router.get('/',function (req,res) {  
            //Recuerda que controller es lo que exporta el archivo controller.js
            //En la clase usa listUsers pero soy revelde
            controller.getUsers()
                .then((userList)=>{
                    response.success(req,res,userList,200);
                })
                .catch(error => {
                    response.error(req,res,'Error Inesperado',500, error);
                });
});
router.post('/', function (req,res) {  
    //No olvidar que si usamos req.body.name es porque en el Json de la petición post le estamos pasando un parámetro llamado name
    controller.addUser(req.body.name)
        .then(data=>{
            //en response hay una promesa que se cumple aquí (siempre en las rutas)
            response.success(req,res,data,201);
        })
        .catch(error=>{
            response.error(req,res, 'Error interno', 500, error);
        });
});

module.exports = router;