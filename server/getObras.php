<?php
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin *');
$bd = include_once "bd.php";
$sentencia = $bd->query("select * from obra;");
$obras = $sentencia->fetchAll(PDO::FETCH_OBJ);
echo json_encode($obras);