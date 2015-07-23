<?php
$nosubmit = false;
$connection = new Mongo();
$monclx_tokens = $connection->dlsessions->dltokens;
$monclx_dlss = $connection->dlsessions->dlss;
$monclx_geodata = $connection->lllgeo->geodata;
include_once 'lib/producer.php';
include_once 'lib/formatSize.php';
require_once 'lib/getCurl.php';

function upQueue($apikey, $sessionid, $mongoid, $truefalse) {
    global $connection;
    global $monclx_dlss;
    // just the pair we want to change #returnto
    if ($truefalse == 'false') {
        $mongObjArr['queued'] = false;
    } elseif ($truefalse == 'true') {
        $mongObjArr['queued'] = true;
    } else {
        $mongObjArr['queued'] = "unk";
    }
    // here's our mngo object
    $mongObj = array(
        '$set' => $mongObjArr
    );
    $mongoid = new MongoId($mongoid);
    // do this business
    $monclx_dlss->update(array(
        '_id' => $mongoid
    ) , $mongObj);
    // this is just for response
    $qu = array(
        "_id" => $mongoid
    );
    $cursor = $monclx_dlss->find($qu);
    
    foreach ($cursor as $obj) {
        $objs[] = $obj;
    }
    
    return json_encode($objs);
}
function enQueue($apikey, $series, $handle, $format, $howmuch, $outform, $sessionid) {
    /*
    we'll send back a couple of things in setQResp:
    sessionid (gui will set a cookie with it)
    MongoId
    */
    $setQResp = array();
    /* ----------
    if no sessionid comes from call, then this is an api request
    ...or it's from a fresh gui session
    either way we need to generate a nice new api/session pairing
    ------------ */
    // ideally this next line would work, but #returnto b/c slim's optional params aren't
    if ($sessionid == "null") {
        // if(!(isset($sessionid))){
        $sessionid = sessionConfig($apikey);
    }
    global $connection;
    global $monclx_geodata;
	global $apihost;
    $mongObjArr = array();
    $token = registerDLToken($apikey);
    if ($token !== 'failure') {
        /* ----------
        EASY
        ------------ */
        $ip = $_SERVER['REMOTE_ADDR'];
        $pctdone = 0;
        $exptarget = time() + (7 * 24 * 60 * 60);
        $expiration = date(DATE_ATOM, $exptarget);
        /* ----------
        HARD
        ------------ */
        // set up an empty final deliverable
        $sourceURIs = array();
        $outfileArrFinal = array();
        if ($format == 'raster') {
            // note accounting for optional outform, which currently doesn't work (old Slim?) #returnto
            if (!isset($outform) || ($outform == 'default')) {
                $outform = 'tiff';
            }

            $resp = json_decode(getCurl($apihost."/rasterpaths/" . $series . "/" . $handle . "/" . $howmuch . "/json"));
            $query = array(
                "handle" => $handle
            );
            $cursor = $monclx_geodata->find($query);
            foreach ($cursor as $obj) {
                /*
                a little sloppy here; why the loop? - #returnto
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

                $vectorurl[] = 'http://localhost:8080/geoserver/'.$series.'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='.$series.':'.$handle.'&outputFormat=SHAPE-ZIP';
                $sourceURIs[] = $vectorurl;
            // note accounting for optional outform, which currently doesn't work (old Slim?) #returnto
            if (!isset($outform) || ($outform == 'default')) {
                $outform = 'shp';
            }
            // $estimatebytes = $bytespersource * count($sourceURIs);
            $outfileArr = $sourceURIs;

        } //if vector

$currentPopularity = getPopularity($series,$handle);
$newPopularity = $currentPopularity+1;
setPopularity($series,$handle,$newPopularity);


        // either way (chunk or no, raster or vector) we also want a clicked key to track actual downloading
        foreach ($outfileArr as $of) {
            $of['clicked'] = false;
            $outfileArrFinal[] = $of;
        }

        
        $mongObjArr['token'] = $token;
        $mongObjArr['apikey'] = $apikey;
        $mongObjArr['format'] = $format;
        $mongObjArr['outform'] = $outform;
        $mongObjArr['sessionid'] = $sessionid;
        $mongObjArr['queued'] = true;
        $mongObjArr['loadsize'] = $estimatebytes;
        $mongObjArr['ip'] = $ip;
        $mongObjArr['active'] = 0;
        $mongObjArr['howmuch'] = $howmuch;
        $mongObjArr['series'] = $series;
        $mongObjArr['handle'] = $handle;
        // $mongObjArr['sourceuris'] = $sourceURIs;
        $mongObjArr['pctdone'] = $pctdone;
        $mongObjArr['outfiles'] = $outfileArrFinal; // chunked out groups of files to be zipped together, needs clicked (i.e. downloaded) status
        $mongObjArr['expiration'] = $expiration; //date of expiry
        $mongId = new MongoId();
        $mongObjArr['_id'] = $mongId;
        $dlResp = registerDLS($mongObjArr);

        if ($dlResp['ok'] == 1) {
            // a separate success message for the gui
            $setQResp['success']=true;
            $setQResp['mongoid'] = $mongId;
            $setQResp['sessionid'] = $sessionid;
            $setQResp['success'] = 1;
            $setQResp['message'] = "layer was enqueued";

//DEBUG STUFF -- KILLME
// $setQResp['success'] = 0;
// $setQResp['message'] = "the layer could not be queued for download -- try requesting less data by zooming further into your area of interest";            
            /*
            and why not pass the session's expiration back so the resulting cookie can 
            expire at the same time? anyone? is there a reason i'm not thnking of?
            */
            // maybe not
            // $setQResp['expiration']=$expiration;
            header('Content-type: application/json', true);

            // SOME FAKERY for testing
            // $setQResp=null;
            // $setQResp['success']=false;
            // $setQResp['message']="too much data for this series";
            // END FAKERY
            
            echo json_encode($setQResp);
            // echo json_encode($dlResp);
            
        } else {
            // registerDLS failed
            // 
            $setQResp['success'] = 0;
            $setQResp['message'] = "the layer could not be queued for download";

        }

//also we wanna do a reindexing of the series so its new values will impact searches asap
        // there's a route for that!
$mongtoso = getCurl($apihost."mongo2solr/0/" . $series . "/" . $handle);


    }
}

function getPopularity($series,$handle) {
    global $connection;
    global $monclx_geodata;
    // the query that nabs that one doc
    $query = array(
        "series" => $series,
        "handle" => $handle
    );
    $record = $monclx_geodata->findOne($query);
    $currentPopularity = $record['popularity'];
    
    return $currentPopularity;
}

function setPopularity($series, $handle, $newPopularity) {
    global $connection;
    global $monclx_geodata;
    // just the pair we want to change #returnto
    $mongObjArr = array(
        "popularity" => $newPopularity
    );
    // here's our mngo object
    $mongObj = array(
        '$set' => $mongObjArr
    );
    // the query that nabs that one doc
    $query = array(
        "series" => $series,
        "handle" => $handle
    );
    // do this business
    $monclx_geodata->update($query, $mongObj);
}

/* ----------
given an apikey that comes in from client, we generate a session id somehow
------------ */
function sessionConfig($ak) {
    // if it's not a 0 that means it's NOT coming in from GUI and it needs a sessionid we generate
    if (!$ak == '0') {
        // code here should check a key registry, but for now we have none and we just take anything #returnto
        // die("dead, hard - no api key");
        $ak = $ak;
        $sessionid = uniqid($ak . '_');
    } else {
        $sessionid = uniqid($ak . '_');
        // well then this is a gui user who we are not making login, so cookie it is
        // $sessionid = $_COOKIE["lllgeo_download_session"];
        
    }
    
    return $sessionid;
}
function divvyDL($arrIn, $max, $per) {
    // total payload size
    $total = count($arrIn) * $per;
    // total payload divided into our preferred chunk size
    $each = ceil(($total / $max));
    // take that number and divide the arrIn with it to get how many paths per chunk
    $chunks = ceil((count($arrIn) / $each));
    // here we chunk out based on how many we want in each deliverable
    $arrOut = array_chunk($arrIn, $chunks);
    
    return $arrOut;
}
function registerDLS($mongArr) {
    global $nosubmit;
    global $monclx_dlss;
    if ($nosubmit !== true) {
        $mongoResp = writeMongo($mongArr, $monclx_dlss);
        // echo json_encode($mongoResp);
        
        return $mongoResp;
    } else {
        $mongoResp['ok'] == 0;
        return $mongoResp;
    }
}
//send api key and token to dlsessions.dltokens
function registerDLToken($apikey) {
    global $nosubmit;
    global $monclx_tokens;
    // generate token
    $token = uniqid('dls_');
    /*
    here we create an array object that will be
    written to mongo
    */
    $mongObj = array(
        "apikey" => $apikey,
        "token" => $token
    );
    if (isset($apikey, $token)) {
        if ($nosubmit !== true) {
            $mongoResp = writeMongo($mongObj, $monclx_tokens);
            if ($mongoResp['ok'] == 1) {
                
                return $token;
            } else {
                
                return "failure";
            }
        } else {
            print_r($mongObj);
        }
    } else {
        die("no api or token, can't proceed");
    }
}
function writeMongo($mongObj, $clx) {
    // add a record
    try {
        $resp = $clx->insert($mongObj, array(
            'safe' => true
        ));
    }
    catch(MongoCursorException $e) {
        echo "Uh...No. Didn't work.";
    }
    if ($resp['ok'] == 1) {
        
        return $resp;
    }
}
?>
