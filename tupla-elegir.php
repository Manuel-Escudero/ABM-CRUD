<?php
include('conexionBD.php');
 edicion();    



########################################################################################
function edicion(){
    include('conexionBD.php');
    $id = $_POST['id'];
        $query = "SELECT *  from tabla_ejemplo WHERE id = $id LIMIT 1 ";
        $result= mysqli_query($con,$query);
        if(!$result){
            die('he fallado mi pana!');
        }
        $json=array();
        while($row = mysqli_fetch_array($result)){
            $json[]=array(
                'id' => $row['ID'],
                'nombre' => $row['campo1'],
                'descripcion' => $row['campo2'],
                'detalle' => $row['campo3']
            );
        }
        
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
}

?>