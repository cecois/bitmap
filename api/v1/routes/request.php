<?php
$nosubmit = false;
$connection = new Mongo();
$monclx_requests = $connection->feedback->requests;
function requestPurchase() {
    /*
    should be simple, just sock away whatever comes through the call
    */
    global $connection;
    global $monclx_requests;
    global $app;
    $request = $app->request();
    $body = $request->getBody();

    $mongoBody = json_decode($body);
    $mongoBodyArr = array();
    array_push($mongoBodyArr, $mongoBody);

    try {
        $monclx_requests->insert($mongoBodyArr[0], array(
            "w" => 1
        ));
        echo "success";
    }
    catch(MongoCursorException $e) {
        /* handle the exception */
        // print_r($e);
        echo "failure";
    }
}
?>
