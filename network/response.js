exports.success = function (req,res,message,status) {
    //Hace una validación. Si no recibe el status, entonces que sea 200
    res.status(status || 200).send({
        error:'',//Si es 200 pues no hay error
        body: message
    });
}

exports.error = function (req,res,message,status, details) {
    //Imprime los detalles del error en la consola
    console.log('[Details Response Error]: '+details);    
    // Hace la validación para ver si hay error
    res.status(status || 500).send({
        error: message, //si hay error (de 300 a 500) entonces el error es el mensaje
        body: ''
    });
}

