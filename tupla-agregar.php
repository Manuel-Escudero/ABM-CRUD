<?php
include('conexionBD.php');

if(isset($_POST['nombre'])){
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $detalle = $_POST['detalle'];
    $query = "INSERT INTO tabla_ejemplo(campo1, campo2, campo3) Values ('$nombre','$descripcion','$detalle')";
    $result = mysqli_query($con,$query);
    if(!$result){
        die('Fallé mi pana!:' .mysqli_error($con));
    }else{
        echo ' Tupla Agregada ';
    }
}
    ?>