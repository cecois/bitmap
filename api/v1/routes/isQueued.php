<?php

/* ----------
All we want to do here is allow a check of whether a given handle is in a queue (and hasn't been removed).
If it is inded queued, we return the handle, its queued state (should be true, given it's part of our mongo query), and when it's set to expire.
If it's not in there we return false
------------ */
$connection = new Mongo();
$monclx_dlss = $connection->dlsessions->dlss;

function isQueued($apikey, $sessionid, $handle){

global $connection;
global $monclx_dlss;

// response object
$resp=null;

$query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "handle" => $handle,
        "queued" => true
    );

    $cursor = $monclx_dlss->findOne($query,array('queued' => true, 'handle' => true, 'expiration' => true));

if(!is_null($cursor)){

            $resp=true;

} else {$resp=false;}
 
    header('Content-type: application/json', true);
    echo json_encode($resp);

}

?>