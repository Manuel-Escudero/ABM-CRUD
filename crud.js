$(document).ready(function(){
///////////////////////////////////////////////////
    let editar = false; //variable necesarias para manejar el funcionamiento de #formulario-ingreso
    console.log('jQery ta añadido master '); //comprueba que exista jquery
    $('#resultados-tuplas').hide(); //esconde el campo de las busquedas
    comienzo(); //muestra todas las tuplas en la base de datos de tabla_ejemplo
///////////////////////////////////////////////////
    $('#busqueda').keyup(function(){
       if($('#busqueda').val()){
        let buscador = $('#busqueda').val();
        $.ajax({
            url: 'tupla-busqueda.php',
            type: 'POST',
            data:{ buscador },
            success: function(respuesta){
               let tuplas = JSON.parse(respuesta);
               let template = '';
               //console.log(tuplas);
               tuplas.forEach(tupla => {
                   //console.log(tupla);
                   template += `<li>${tupla.Nombre}</li>`;
               });
 
               $('#contenedor').html(template);
               $('#resultados-tuplas').show();
            }
        });
       }else{
           console.log('busqueda vacía');
           $('#resultados-tuplas').hide();
       }
    }); //funcion para buscar las tuplas, es automatica
    $('#formulario-ingreso').submit(function (e){
        e.preventDefault();
       const tupladatos = {
           nombre: $('#nombre').val(),
           descripcion: $('#descripcion').val(),
           detalle:  $('#detalle').val(),
           id: $('#escondido').val()
       };
       let url =  editar === false ? 'tupla-agregar.php'  : 'tupla-edicion.php';
       $.post(url, tupladatos, function(respuesta) {
           comienzo();
           $('#formulario-ingreso').trigger('reset');
           editar = false;
           if(editar===false){
            let templateaux = ' <i class="fas fa-chevron-circle-up h3"></i>'
            $('#cambiante').html(templateaux);
        }else{
         let templateaux = '<i class="fas fa-exchange-alt"></i>'
         $('#cambiante').html(templateaux);
        };
       } )
    }); //funcion para agregar/actualizar una tupla en la base de datos (depende del estadpo de la variable editar)
    function comienzo(){
        
        $.ajax({
            url:'tupla-mostrar.php',
            type: "GET",
            success: function(respuesta){
                let tuplas = JSON.parse(respuesta);
                let template ="";
                tuplas.forEach( tupla =>{
                    template +=
                    `<tr tuplaID="${tupla.id}">
                        <td><a href="#" class="tupla-item text-light">${tupla.id}</a></td>
                        <td><a href="#" class="tupla-item text-light" NOM="${tupla.nombre}">${tupla.nombre}</a></td>
                        <td><a href="#" class="tupla-item text-light" DES="${tupla.descripcion}">${tupla.descripcion}</a></td>
                        <td><a href="#" class="tupla-item text-light" DET="${tupla.detalle}">${tupla.detalle}</a></td>
                        <td><button class="tupla-borrador btn btn-danger"><i class="fas fa-trash"></i></button></td>
                    </tr>`
    
                });
                $('#tuplas').html(template);
            }
        });
    }; // esta function controla la vista de la tabla_ejemplo
    $(document).on('click','.tupla-borrador', function(){
        //console.log('borrando una tarea...');
        if(confirm('vas a borrar este juego ¡será imposible de recuperar desde este menú!')){
            let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('tuplaID');
        $.post('tupla-borrar.php',{id}, function(respuesta) {
            //console.log(respuesta);
            comienzo();
        });
        }

    } )//funcion para eliminar una tupla al presionar el boton en el renglon correspondiente

    $(document).on('click','.tupla-item',function(){
        //console.log('editando..');
        let elemento = $(this)[0].parentElement.parentElement;
        let id=$(elemento).attr('tuplaID');
        console.log(id);
        $.post('tupla-elegir.php',{id},function(respuesta) {
            const tupla = JSON.parse(respuesta);
            $('#nombre').val(tupla.nombre);
            $('#descripcion').val(tupla.descripcion);
            $('#detalle').val(tupla.detalle);
            $('#escondido').val(tupla.id);
            editar=true;
            if(editar===false){
                let templateaux = ' <i class="fas fa-chevron-circle-up h3"></i>'
                $('#cambiante').html(templateaux);
            }else{
             let templateaux = '<i class="fas fa-exchange-alt"></i>'
             $('#cambiante').html(templateaux);
            };
        });
    });//funcion preliminar para editar una tupla, clickeando sobre algún dato de las tuplas se insertan los mismos dentro de los campos de texto de #formulario-ingreso, ademas controla el comportamiento del boton en #formulario-ingreso.
});