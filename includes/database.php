<?php

$db = mysqli_connect('localhost','root','','barbershop');

if(!$db) {
    echo('Conexión fallida');
    exit;
}

// echo('Conexión Correcta');