console.log('JavaScript 3');
const SERVIDOR_LOCAL_USERS = 'http://localhost:3000/user'
var usuarios_Tabla = []
var contador_Usuarios = 0;
var reciboNombresNuevoUsuario;
var reciboApellidoNuevoUsuario;
var reciboTelefonoNuevoUsuario;
var reciboMásNuevoUsuario;

$(document).ready(function() {
    $('#formuladoNuevoUsuario').addClass('d-none');
    console.log('Entra al JQuery');
    //Obtiene los datos con getJson
    async function obtenerUsuarios() 
    {  
        let obtén_Usuarios_Promesa = new Promise((resolve,reject)=>{
            $.getJSON(SERVIDOR_LOCAL_USERS, function (resultado) 
            {  
                console.log('Intenta obtener datos');
                resolve(resultado);
                reject(`No pudo obtener usuarios`);
            } 
        );
        });
        
        const response= await obtén_Usuarios_Promesa.then((resultado)=>{
            contador_Usuarios = resultado.body.length;
            console.log(`Contador de usuarios: ${contador_Usuarios}`);
            for (let i = 0; i < resultado.body.length; i++) {
                usuarios_Tabla.push(
                    `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${resultado.body[i].name}</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <button type="button" class="btn btn-success" id="botonEditar${i}">Editar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn btn-danger" id="botonEliminar${i}">Eliminar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" id="botonVerMas${i}">Ver Más</button>
                        </td>
                    </tr>
                    `
                    );
            }
        }).catch((error)=>{console.log(error);})
        return response;
    }
    function imprime_Usuarios_Tabla() 
    {  
        console.log(contador_Usuarios);
        for (let i = 0; i < contador_Usuarios; i++) {
            $('#lista').append(
                `
                ${usuarios_Tabla[i]}
                `
            );
        }
    }
    async function Ejecuta() //Se puede hacer que se ejecute cada cierto tiempo
    {  
        await obtenerUsuarios();
        await imprime_Usuarios_Tabla();
    }
    Ejecuta();
    $('#AñadirUsuario').click(function (e) { //Formulario Nuevo Usuario
            e.preventDefault();
            $('#formuladoNuevoUsuario').toggleClass('d-none');
    });
});
function agregarUsuario() 
{  
    reciboNombresNuevoUsuario=document.getElementById('nombreUsuarioForm').value;
    reciboApellidoNuevoUsuario=document.getElementById('apellidoUsuarioForm').value;
    reciboTelefonoNuevoUsuario=document.getElementById('telefonoUsuarioForm').value;
    reciboMásNuevoUsuario=document.getElementById('másUsuarioForm').value;
    console.log(reciboNombresNuevoUsuario);
    subirUsuario();
    return false;
}
function subirUsuario() 
{  
    $(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: SERVIDOR_LOCAL_USERS,
            data: {
                'name': reciboNombresNuevoUsuario
            },
            success: function(data) {
                swal('Bien Hecho!', `Se agrego el usuario: \n${reciboNombresNuevoUsuario}`,'success');
            },
        });
    });
}