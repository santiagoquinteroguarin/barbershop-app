<?php

// importar services
require './includes/functions.php';

$services = getServices();

echo json_encode($services);