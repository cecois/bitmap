<?php
$connection = new Mongo();
$monclx_dlss = $connection->dlsessions->dlss;
$monclx_geodata = $connection->lllgeo->geodata;
include_once 'lib/formatSize.php';
require_once 'lib/getCurl.php';

function getDownloadObj($apikey, $sessionid, $dlid){

global $connection;
global $monclx_dlss;
$mongid = new MongoId($dlid);

$query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongid
    );

    $cursor = $monclx_dlss->find($query);

// var_dump($query);die();
    // var_dump(iterator_to_array($cursor));die();

    foreach ($cursor as $obj) {
        // $fakeid = $obj['_id']->__toString();
        // $obj['_fakeid']=$fakeid;
        // unset($obj['_fakeid']);
        $downloads[] = $obj;
    }

    header('Content-type: application/json', true);
    echo json_encode($downloads[0]);

}

function getQueue($apikey, $sessionid) {
    global $connection;
    global $monclx_dlss;
    $downloads = array();
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid
    );
    $cursor = $monclx_dlss->find($query);
    $cursor->sort(array('queued'=>-1,'expiration'=>1));

/* ----------
this is some #returnto business, perhaps:
mongo's id is an object that can't be passed by backbone in a url without some stringifying
here we grab the actual _id value and store it in _fakeid, which we then tell backbone
to use as the id for crud ops
------------ */
    foreach ($cursor as $obj) {
        $fakeid = $obj['_id']->__toString();
        $obj['_fakeid']=$fakeid;
        $downloads[] = $obj;
    }

    header('Content-type: application/json', true);
    echo json_encode($downloads);
}

function triageQueue($apikey,$sessionid,$id){
    global $monclx_geodata;

    if(!isset($id)){
        echo "no d!";die();
    } else {        

if($_SERVER['REQUEST_METHOD'] == 'PUT') {

global $apihost;  
global $app;
// grab json from incoming put
$json = $app->request()->getBody();

// we should always verify any calculable fields
// sourceuris
// outfiles
// loadsize
// dlcnt

// so first we convert incoming json to array
$jsonoverride = json_decode($json,true);
// grab the handle we'll use to query mongo geodata for meta
$handle = $jsonoverride['handle'];
$series = $jsonoverride['series'];
$howmuch = $jsonoverride['howmuch'];
$outform = $jsonoverride['outform'];
$mongoid = $jsonoverride['_id']['$id'];

// echo $mongoid;
// var_dump($jsonoverride);die();

$format = getMongoFormat($handle);

// what follows is mostly repeated code, btw - #returnto
$sourceURIs = array();
$outfileArrFinal = array();

        if ($format == 'raster') {
            // note accounting for optional outform, which currently doesn't work (old Slim?) #returnto
            if(!isset($outform) || ($outform == 'default')){$outform = 'tiff';}
            $resp = json_decode(getCurl($apihost."rasterpaths/" . $series . "/" . $handle . "/" . $howmuch . "/json"));

            $query = array(
                "handle" => $handle
            );
            $cursor = $monclx_geodata->find($query);

            foreach ($cursor as $obj) {
                /*
                a little sloppy here; loop here bc mongo returns as such -- maybe later an interator_to_array or something? - #returnto
                */
                $mbpersource = $obj["mbpersource"];
                $bytespersource = $mbpersource * 1048576;
            }
            $results = $resp->results;
            $sourceURIsArr = $results[0];
            
            foreach ($sourceURIsArr as $location) {
                $sourceURIs[] = $location->location;
            }
            // now estimate total load using bytespersource * count of files
            $estimatebytes = $bytespersource * count($sourceURIs);
            // we don't really want downloads above a certain threshold, so...
            $maxDLChunk = 524288000; //500mb
            // $maxDLChunk = 262144000; //250mb
            $iteratorSize = $bytespersource; //size per file
            // we'll sock this away as-is in case it's under the threshold and won't be chunked
            $outfileArr = $sourceURIs;
            // ...we chunk the list of files using the max and per-file sizes, so we don't end up w/ massive DLs
            $outfileArr = divvyDL($sourceURIs, $maxDLChunk, $iteratorSize);
        } elseif ($format == 'vector') {
            $estimatebytes = json_decode(getCurl($apihost."size/" . $series . "/" . $handle . "/" . $howmuch . "/bytes"));
            // note accounting for optional outform, which currently doesn't work (old Slim?) #returnto
            if(!isset($outform) || ($outform == 'default')){$outform = 'shp';}
            // $estimatebytes = $bytespersource * count($sourceURIs);
            $outfileArr = $sourceURIs;
        } //if vector
        // either way (chunk or no, raster or vector) we also want a clicked key to track actual downloading
        
        foreach ($outfileArr as $of) {
            $of['clicked'] = false;
            $outfileArrFinal[] = $of;
        }

        // first let's get the thing as-was
        $mongObjArr = $jsonoverride;
      

        //then we start hand-selecting updates
        // $mongObjArr['token'] = $token;
        // $mongObjArr['apikey']= $apikey;
        // $mongObjArr['outform'] = $outform;
        // $mongObjArr['sessionid'] = $sessionid;
        // $mongObjArr['queued'] = true;
        $mongObjArr['loadsize'] = $estimatebytes;
        // $mongObjArr['ip'] = $ip;
        $mongObjArr['howmuch'] = $howmuch;
        // $mongObjArr['series'] = $series;
        // $mongObjArr['handle'] = $handle;
        // $mongObjArr['sourceuris'] = $sourceURIs;
        $mongObjArr['pctdone'] = 0;
        $mongObjArr['outfiles'] = $outfileArrFinal; // chunked out groups of files to be zipped together, needs clicked (i.e. downloaded) status
        // $mongObjArr['expiration'] = $expiration; //date of expiry

$mongid = new MongoId($mongoid);

        // $mongObjArr['_id'] = $mongid;
        // $dlResp = registerDLS($mongObjArr);
$json = json_encode($mongObjArr);
        // $dlResp = updateDownload($mongObjArr);
// $mup = mongoUp($id,$json);

// start an empty response
$resp = array();


// taking id of mongo doc and incoming json body, do an update
$up = mongoUp($id,$json);
$resp['status']="OK";
    // echo $up;
echo json_encode($resp);
}

    } //else id
}
function getMongoFormat($handle){
global $connection;
global $monclx_geodata;
/*
what's this? mongo stores _ids as objects and we had to parse it as string in backbone in order to send it back here. So we re-mongify it here
*/
$qu = array(
        "handle" => $handle
    );
$cursor = $monclx_geodata->find($qu);
foreach ($cursor as $obj) {
        $format = $obj['format'];
    }
return $format;
}
function mongoUp($id,$json){
global $connection;
global $monclx_dlss;

// /*
// what's this? mongo stores _ids as objects and we had to parse it as string in backbone in order to send it back here. So we re-mongify it here
// */
// $mongoID = new MongoId($id);

// // note the true flag, which makes it associative
// $json_d = json_decode($json,true);


// // THIS WAS KILLER - have to pull the _id out of the actual body for updates to work
// // not sure why -- prob. operator error, but #returnto
// unset($json_d['_id']);

// // here's our mngo object
// $mongObj = array('$set' => $json_d);

/*
what's this? mongo stores _ids as objects and we had to parse it as string in backbone in order to send it back here. So we re-mongify it here
*/
$mongoID = new MongoId($id);

// note the true flag, which makes it associative
$json_d = json_decode($json,true);


// THIS WAS KILLER - have to pull the _id out of the actual body for updates to work
// not sure why -- prob. operator error, but #returnto
unset($json_d['_id']);

// here's our mngo object
$mongObj = array('$set' => $json_d);

// Business! note the separate $id in the find clause, which came in as url param
$monclx_dlss->update(array('_id' => $mongoID), $mongObj);

// this is just for response
$qu = array(
        "_id" => $mongoID
    );

$cursor = $monclx_dlss->find($qu);

foreach ($cursor as $obj) {
        $objs[] = $obj;
    }

return json_encode($objs);


}
?>
