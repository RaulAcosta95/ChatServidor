//Trae las rutas de los componentes a través de...
const message = require('../components/message/network');//SE MANDA EL ROUTER DE NETWORK.JS
const user = require('../components/user/network');

const routes = function (server) {
    //La ruta para /message usa el router de la variable message (Le hace un import)
    server.use('/message' , message);
    //Añade la nueva ruta que creamos en la clase 25 user
    server.use('/user' , user);

  }

module.exports = routes;//ARROJA LAS RUTAS EXISTENTES