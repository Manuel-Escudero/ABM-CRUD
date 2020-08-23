<?php
include('conexionBD.php');
$id = $_POST['id'];

$nombre = $_POST['nombre'];

$descripcion =  $_POST['descripcion'];

$detalle = $_POST['detalle'];

$query = "UPDATE tabla_ejemplo SET campo1 = '$nombre', campo2 = '$descripcion', campo3 = '$detalle' WHERE id = $id";
$result = mysqli_query($con,$query);
if (!$result) {
    die('falle mi pana!');
}

echo "Lo hice mi pana amigo!";