<?php
header("Access-Control-Allow-Origin: http://localhost:4200/welcome", "http://localhost/Web-Cotizador/getObras.php");
$bd = include_once "bd.php";
$sentencia = $bd->query("select * from cotizador.obra;");
$obras = $sentencia->fetchAll(PDO::FETCH_OBJ);
echo json_encode($obras);