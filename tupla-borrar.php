<?php

include('conexionBD.php');
if(isset($_POST['id'])){
$id = $_POST['id'];
$query = "DELETE FROM tabla_ejemplo WHERE ID=$id";
$result = mysqli_query($con,$query);
if(!$result){
    die('falle mi pana! :' . mysqli_error($con));
}
echo "Tupla Borrada";

}
?>