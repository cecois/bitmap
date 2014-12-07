<?php
$connection = new Mongo();
$monclx_dlss = $connection->dlsessions->dlss;
$monclx_geodata = $connection->lllgeo->geodata;
// include_once 'lib/formatSize.php';
// require_once 'lib/getCurl.php';

function downloadChunk($apikey, $sessionid, $mongid, $chunkindex) {





    // first we wanna update the active downloads count
    $addsubtract = 1;
    setActive($apikey, $sessionid, $mongid, $addsubtract);
    global $connection;
    global $monclx_dlss;
    $mongid = new MongoId($mongid);
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongid
    );
    $download = $monclx_dlss->findOne($query);

    $format = $download['format'];
    $series = $download['series'];
    $handle = $download['handle'];


    // grab outfiles array (pre-chunked, of course)
    $outfiles = $download['outfiles'];
    // get only one of them
    $requestedChunk = $outfiles[$chunkindex];


switch ($format) {
    case 'vector':

        // grab outfiles array (pre-chunked, of course)
    $vectorurl = $download['outfiles'][0][0];

        // make sure to send all headers first
    // Content-Type is the most important one (probably)

    // header('Content-Type: application/octet-stream');
    downloadVector($vectorurl,$handle);

    break;
    case 'raster':
    // prepend the actual filepath
    $absoluteRoot = '/Volumes/gisdata2$/'.$series.'/';
// DEBUG STUFF:
// $absoluteRoot='/tmp/Volumes/gisdata2$/cib10/';

    // $absoluteRoot = '/private/tmp/'.$series.'/';
    // now we rewrite the array to include the root
    // $requestedChunkWithPath = array();
    // of course we don't want to include the clicked flag
    
    // foreach ($requestedChunk as $key => $path) {
    //     if ($key != 'clicked') {
    //         $requestedChunkWithPath[] = $absoluteRoot . $path;
    //     }
    // }



    // make sure to send all headers first
    // Content-Type is the most important one (probably)
    header('Content-Type: application/octet-stream');
// header('Content-Type: application/force-download');
    header('Content-disposition: attachment; filename="'.$handle.'-'.$chunkindex.'.tgz"');
// ob_clean();
// flush();;
// 

    // use popen to execute a unix command pipeline
    // and grab the stdout as a php stream
    $fp = popen('tar -cz -C '.$absoluteRoot.' ' . implode(" ", $requestedChunk) , 'r');
    // pick a bufsize that makes you happy (8192 has been suggested).
    $bufsize = 65535;
    $buff = '';


    while (!feof($fp)) {
        $buff = fread($fp, $bufsize);
        echo $buff;
    flush();
    }
    pclose($fp);

        break;
    
    default:
        # code...
        break;
}

    /* ----------
    HOUSEKEEPING!
    ------------ */
    // tell mongo that we clicked (and presumably downloaded successfully) this chunk
    setClicked($apikey, $sessionid, $mongid, $chunkindex);
    // ...and that it's done and the active count should be reduced
    $addsubtract = -1;
    setActive($apikey, $sessionid, $mongid, $addsubtract);
    // get an idea of how many of the chunks are thus completed
    $currentPct = getPercent($apikey, $sessionid, $mongid);
    // write that to mongo so we can poll from gui
    setPercent($apikey, $sessionid, $mongid, $currentPct);
    return true;
}

function downloadVector($fullPath,$handle){
  // Must be fresh start 
  if( headers_sent() ) 
    die('Headers Sent'); 

  // Required for some browsers 
  if(ini_get('zlib.output_compression')) 
    ini_set('zlib.output_compression', 'Off'); 

    
    // Parse Info / Get Extension 
    // $fsize = filesize($fullPath); 
    // $path_parts = pathinfo($fullPath); 
    // $ext = strtolower($path_parts["extension"]); 
    
    // Determine Content Type 
    // switch ($ext) { 
    //   case "pdf": $ctype="application/pdf"; break; 
    //   case "exe": $ctype="application/octet-stream"; break; 
    //   case "zip": $ctype="application/zip"; break; 
    //   case "doc": $ctype="application/msword"; break; 
    //   case "xls": $ctype="application/vnd.ms-excel"; break; 
    //   case "ppt": $ctype="application/vnd.ms-powerpoint"; break; 
    //   case "gif": $ctype="image/gif"; break; 
    //   case "png": $ctype="image/png"; break; 
    //   case "jpeg": 
    //   case "jpg": $ctype="image/jpg"; break; 
    //   default: 
    // } 
      $ctype="application/force-download";

    // header('Content-disposition: attachment; filename="file.zip"'); 

    header("Pragma: public"); // required 
    header("Expires: 0"); 
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
    header("Cache-Control: private",false); // required for certain browsers 
    header("Content-Type: $ctype"); 
    header("Content-Disposition: attachment; filename=\"".$handle.".zip\";" ); 
    header("Content-Transfer-Encoding: binary"); 
    // header("Content-Length: ".$fsize); 
    ob_clean(); 
    flush(); 
    readfile( $fullPath ); 

}

function getPercent($apikey, $sessionid, $mongid) {
    global $connection;
    global $monclx_dlss;
    $mongoid = new MongoId($mongid);
    // the query that nabs that one doc
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongoid
    );
    $download = $monclx_dlss->findOne($query);
    $outfilesTotal = $download['outfiles'];
    $outfilesDone = 0;
    
    foreach ($outfilesTotal as $outfile) {
        if ($outfile['clicked'] == true) {
            $outfilesDone+= 1;
        }
    }
    $outfilesPct = ($outfilesDone * 100) / count($outfilesTotal);
    
    return $outfilesPct;
}
function getActive($apikey, $sessionid, $mongid) {
    global $connection;
    global $monclx_dlss;
    $mongoid = new MongoId($mongid);
    // the query that nabs that one doc
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongoid
    );
    $download = $monclx_dlss->findOne($query);
    $currentActive = $download['active'];
    
    return $currentActive;
}
function setPercent($apikey, $sessionid, $mongid, $newpercent) {
    global $connection;
    global $monclx_dlss;
    // just the pair we want to change #returnto
    $mongObjArr = array(
        "pctdone" => $newpercent
    );
    // here's our mngo object
    $mongObj = array(
        '$set' => $mongObjArr
    );
    $mongoid = new MongoId($mongid);
    // the query that nabs that one doc
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongoid
    );
    // do this business
    $monclx_dlss->update($query, $mongObj);
}
function setActive($apikey, $sessionid, $mongid, $addsubtract) {
    global $connection;
    global $monclx_dlss;
    // // just the pair we want to change #returnto
    $currentActive = getActive($apikey, $sessionid, $mongid);
        $newActive = $currentActive + $addsubtract;
    
    $mongObjArr = array(
        "active" => $newActive
    );
    // here's our mngo object
    $mongObj = array(
        '$set' => $mongObjArr
    );
    $mongoid = new MongoId($mongid);
    // the query that nabs that one doc
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongoid
    );
    // do this business
    $monclx_dlss->update($query, $mongObj);
}
function setClicked($apikey, $sessionid, $mongid, $chunkindex) {
    global $connection;
    global $monclx_dlss;
    // just the pair we want to change #returnto
    $mongObjArr = array(
        "outfiles." . $chunkindex . ".clicked" => true
    );
    // here's our mngo object
    $mongObj = array(
        '$set' => $mongObjArr
    );
    $mongoid = new MongoId($mongid);
    // the query that nabs that one doc
    $query = array(
        "apikey" => $apikey,
        "sessionid" => $sessionid,
        "_id" => $mongoid
    );
    // do this business
    $monclx_dlss->update($query, $mongObj);
}
?>