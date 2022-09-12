<?php
$contraseña = "1234";
$usuario = "root";
$nombre_base_de_datos = "cotizador";
try {
    return new PDO('mysql:host=localhost;port=3306;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
} catch (Exception $e) {
    echo "Ocurrió algo con la base de datos: " . $e->getMessage();
}