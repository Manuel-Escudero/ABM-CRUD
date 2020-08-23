<?php

include('conexionBD.php');
$query = "SELECT * FROM tabla_ejemplo Where campo1 <> '' ";
$result = mysqli_query($con,$query);

if(!$result){
    die('falle mi pana!: ' . mysqli_error($con) );
}else{

$json = array();
while($row = mysqli_fetch_array($result)) {
    $json[] =array(
        'id' => $row['ID'],
        'nombre' => $row['campo1'],
        'descripcion' => $row['campo2'],
        'detalle' => $row['campo3'],
    );
    }

$jsonstring = json_encode($json);
echo $jsonstring;
}
?>