<?php
include('conexionBD.php');

$busqueda=$_POST['buscado'];

if(!empty($busqueda)) {
    $query = "SELECT * FROM tabla_ejemplo where campo1 LIKE '%$busqueda%'  ";
    $result = mysqli_query($con,$query);
    if(!$result){
    
        die('Falle mi pana!: ' . mysqli_error($con));
    
    }

    $json = array();
    
    while($row = mysqli_fetch_array($result)){
    
        $json[] = array(
            'Id' => $row['ID'],
            'Nombre' => $row['campo1'],
            'Descripcion' => $row['campo2'],
            'Detalle' => $row['campo3']
        );

    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}

?>