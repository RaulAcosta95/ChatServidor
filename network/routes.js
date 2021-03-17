const message = require('../components/message/network');//SE MANDA EL ROUTER DE NETWORK.JS

const routes = function (server) {
    //La ruta para /message usa el router de la variable message (Le hace un import)
    server.use('/message' , message);
  }

module.exports = routes;//ARROJA LAS RUTAS EXISTENTES