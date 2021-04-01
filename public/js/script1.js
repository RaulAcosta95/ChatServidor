console.log('Todo bien');
const SERVIDOR_LOCAL_USERS = 'http://localhost:3000/user'

function obténUsuarios() 
    {  
        //POST DELETE UPDATE ??
        fetch(SERVIDOR_LOCAL_USERS)//GET
        .then
        (
                function (respuesta) 
                {  
                    return respuesta.json();
                }
        )
        .then
        (
            function (respuesta) 
            {  console.log('Lista de usuarios:');
                for (let i = 0; i < respuesta.body.length; i++) {
                    console.log(respuesta.body[i].name);
                }
            }
        )
    }
obténUsuarios();