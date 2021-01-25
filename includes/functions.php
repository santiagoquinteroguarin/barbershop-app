<?php

// esta funcion va retornar un array
function getServices() : array {
    try {
        // ? Importar una conexión
        require('database.php');

        // ? consulta SQL
        $sql = 'SELECT * FROM services';

        // * mysqli_query --> recibe la conexión a la db y la consulta a realizar
        $query = mysqli_query($db, $sql);

        // * Arreglo vacio
        $services = [];
        $i = 0;

        // ? Obtener los resultados
        // * mysqli_fetch_ --> diferentes formas de mostrar los resultados
        while($row = mysqli_fetch_assoc($query)) {
            $services[$i]['id'] = $row['id'];
            $services[$i]['name'] = $row['name'];
            $services[$i]['price'] = $row['price'];

            $i++;
        }

        return $services;

    } catch (\Throwable $th) {
        var_dump($th);
    }
}

getServices();