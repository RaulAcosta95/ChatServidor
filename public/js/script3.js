console.log('JavaScript 3');
//Conexión
const SERVIDOR_LOCAL_USERS = 'http://localhost:3000/user';
//Datos
var usuarios_Tabla = [];
var contador_Usuarios = 0;
//Estas variables deberían ser constantes en la función
var reciboNombresNuevoUsuario;
var reciboApellidoNuevoUsuario;
var reciboTelefonoNuevoUsuario;
var reciboMásNuevoUsuario;
var identificadoresUsuario=[];


//Funciones JQuery
$(document).ready(function() {
    $('#formularioNuevoUsuario').addClass('d-none');
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
        //Obtén los datos
        const response= await obtén_Usuarios_Promesa.then((resultado)=>{
            contador_Usuarios = resultado.body.length;
            //Asigna Id
            for (let i = 0; i < resultado.body.length; i++) {
                identificadoresUsuario.push(
                    {
                        numeroEnListaIdentificador:10,
                        idIdentificador:resultado.body[i]._id,
                        nombreIdentificador:resultado.body[i].name
                    }
                    );
            }
            identificadoresUsuario
            console.log(`Contador de usuarios: ${contador_Usuarios}`);
            //Tabla de usuarios html
            for (let i = 0; i < resultado.body.length; i++) {
                usuarios_Tabla.push(
                    `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${resultado.body[i].name}</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <button type="button" class="btn btn-success" id="botonEditar${i}" onClick="return editarUsuario(${i})">Editar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn btn-danger" id="botonEliminar${i}" onClick="return eliminarUsuario(${i})">Eliminar</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" id="botonVerMas${i}" onClick="return mostrarMasDelUsuario(${i})">Ver Más</button>
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
    //Toggles formularios
    $('#AñadirUsuario').click(function (e) 
    { //Formulario Nuevo Usuario
            e.preventDefault();
            $('#formularioNuevoUsuario').toggleClass('d-none');
    });
    $('#cerrarFormularioNuevoUsuario').click(function (e) 
    { //Formulario Nuevo Usuario
            e.preventDefault();
            $('#formularioNuevoUsuario').toggleClass('d-none');
    });

});
//Funciones de contról
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
                swal('Bien Hecho!', `Se agrego el usuario: \n${reciboNombresNuevoUsuario}`,'success')
                .then(()=>{
                    window.location.reload();
                });
            },
        });
    });
}
function eliminarUsuario(id) 
{  
    console.log('Eliminar usuario '+id);
    console.log(SERVIDOR_LOCAL_USERS+"/"+identificadoresUsuario[id].idIdentificador);
    $(document).ready(function () {
        $.ajax({
            type: 'DELETE',
            url: SERVIDOR_LOCAL_USERS+"/"+identificadoresUsuario[id].idIdentificador,
            data: {
                '_id': identificadoresUsuario[id].idIdentificador,
            },
            success: function(data) {
                swal('Se ha eliminado el usuario ' + identificadoresUsuario[id].nombreIdentificador, 'Success Alert','success')
                .then(()=>{
                    window.location.reload();
                });
            }
        });
    });
    return false;
}
function editarUsuario(id) 
{   
    console.log('Editar usuario '+id);
    $(document).ready(function () {
        $('#formularioEditarUsuario').append(
            `
            <div id="FormularioEditar${id}">
            <h5>Editar Usuario ${id}</h5>
            <form>
                <div class="mb-3">
                  <label for="editanombreUsuarioForm" class="form-label">Nombre</label>
                  <input placeholder="Tu nombre(s)" type="text" class="form-control" id="editanombreUsuarioForm">
                </div>
                <div class="mb-3">
                  <label for="editaapellidoUsuarioForm" class="form-label">Apellidos</label>
                  <input placeholder="Tus apellidos" type="text" class="form-control" id="editaapellidoUsuarioForm">
                </div>
                <div class="mb-3">
                    <label for="editatelefonoUsuarioForm" class="form-label">Telefono</label>
                    <input placeholder="Número de telefono 10 digitos" type="number" class="form-control" id="editatelefonoUsuarioForm">
                  </div>
                <div class="mb-3">
                    <label for="editamásUsuarioForm" class="form-label">Más</label>
                    <input placeholder="Más información" type="text" class="form-control" id="editamásUsuarioForm">
                </div>
                <button type="submit" class="btn btn-primary" onclick="return subirEdiciónUsuario(${id})">Enviar Modificación</button>
              </form>
              <button type="button" class="btn btn-secondary" onclick="return cerrarFormularioEditar(${id})">Cerrar</button>
              <hr>
            `
        );
    });

}
function subirEdiciónUsuario(id) 
{  
    console.log('Se quiere editar '+ "/"+identificadoresUsuario[id].idIdentificador);
    reciboNombresNuevoUsuario=document.getElementById('editanombreUsuarioForm').value;
    reciboApellidoNuevoUsuario=document.getElementById('editaapellidoUsuarioForm').value;
    reciboTelefonoNuevoUsuario=document.getElementById('editatelefonoUsuarioForm').value;
    reciboMásNuevoUsuario=document.getElementById('editamásUsuarioForm').value;
    $(document).ready(function () {
        $.ajax({
            type: 'PATCH',
            url: SERVIDOR_LOCAL_USERS+"/"+identificadoresUsuario[id].idIdentificador,
            data: {
                'name': reciboNombresNuevoUsuario
            },
            success: function(data) {
                swal('Bien Hecho!', `Se editó el usuario: \n${reciboNombresNuevoUsuario} \n Refrescando página...`,'success')
                .then(()=>{
                    window.location.reload();
                });
            },
        });
    });
    console.log(`Se editó el usuario ${id} \n Nuevo nombre: ${reciboNombresNuevoUsuario} \n Nuevo apellido: ${reciboApellidoNuevoUsuario} \n Nuevo telefono: ${reciboTelefonoNuevoUsuario} \n Nueva info extra: ${reciboMásNuevoUsuario}`);
    
    return false;
}
function cerrarFormularioEditar(id) 
{  
    $(document).ready(function () {
        $('#FormularioEditar'+id).remove();
    });
}
function mostrarMasDelUsuario(id) 
{  
    swal(
        'Datos del usuario '+id,
        'Este es un mensaje pre-determinado'
      )
    return false;
}