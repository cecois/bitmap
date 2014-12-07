<?php
$connection = new Mongo();
$monclx_geodata = $connection->lllgeo->geodata;
include_once 'lib/formatSize.php';
require_once 'lib/getCurl.php';
function getMeta($series,$handle) {
    global $connection;
    global $monclx_geodata;
    $meta = array();
    $query = array(
        "handle" => $handle,
        "series" => $series
    );
    $cursor = $monclx_geodata->find($query);
    
    foreach ($cursor as $obj) {
        $meta[] = $obj;
    }
    // header('Content-type: application/json', true);
    echo json_encode($meta);
}
?>