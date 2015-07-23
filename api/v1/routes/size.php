<?php
require_once 'lib/formatSize.php';
require_once 'lib/getGeomColumn.php';
require_once 'lib/boxFromBBOX.php';
$connection = new Mongo();
$collection = $connection->lllgeo->geodata;
function getSeriesSize($series, $handle, $howmuch, $display) {
    $format = getSeriesFormat($handle);
    global $db;
    if (!isset($howmuch)) {
        die("Need a howmuch");
    } elseif ($howmuch == 'all') {
        // note the odd global scope failure of db here #returnto
        $totalSize = getTotalSize($series, $format, $handle, $db, $display);
        echo $totalSize;
    } else {
        // must be bbox, right? should verify integrity #returnto
        $subsetSize = getSubsetSize($series, $format, $handle, $howmuch, $db, $display);
        echo $subsetSize;
    }
}
function getSubsetSize($series, $format, $handle, $howmuch, $db, $display) {
    global $connection;
    global $collection;
    // parse bbox into something usable
    $bbox = geomFromBBOX($howmuch, "4326");
    
    switch ($format) {
        case 'vector':
            $geomcolumn = getGeometryColumn($series, $handle);
            // ...make query that does sum(ST_Mem_Size(the_geom)) but limit by bbox
            $sql = "SELECT sum(ST_Mem_Size(" . $geomcolumn . ")) as memsize FROM " . $series . "." . $handle . " WHERE " . $geomcolumn . " && " . $bbox . ";";
            try {
                // Execute SQL query
                $pgmemsize = pg_query($db, $sql);
                // Close the connection
                $db = null;
                
                while ($row = pg_fetch_array($pgmemsize)) {
                    $sizebytes = $row['memsize'];
                    if($display == 'bytes'){
                     $sizeout = $sizebytes;

                    } else {

                    $sizeout = formatSizeUnits($sizebytes);
                    }
                    
                    return $sizeout;
                }
            }
            catch(Exception $e) {
                // Catch any exceptions and report the problem
                $result = array();
                $result['success'] = false;
                $result['errormsg'] = $e->getMessage();
                
                return $result['errormsg'];
            }
            break;

        case 'raster':
            $query = array(
                "handle" => $handle
            );
            $cursor = $collection->find($query);
            
            foreach ($cursor as $obj) {
                /*
                a little sloppy here; why the loop? - #returnto
                */
                $mbpersource = $obj["mbpersource"];
                $bytespersource = $mbpersource * 1048576;
            }
            // now get how many files/envelopes
            $geomcolumn = getGeometryColumn("envelopes", $handle);
            // ...make query that does sum(ST_Mem_Size(the_geom)) but limit by bbox
            $sql = "SELECT count(*) as count FROM envelopes." . $series . " WHERE " . $geomcolumn . " && " . $bbox . ";";
            try {
                // Execute SQL query
                $pgcount = pg_query($db, $sql);
                // Close the connection
                $db = null;
                
                while ($row = pg_fetch_array($pgcount)) {
                    $subsetfilecount = $row['count'];
                    // $sizeout = formatSizeUnits($sizebytes);
                    
                }
            }
            catch(Exception $e) {
                // Catch any exceptions and report the problem
                $result = array();
                $result['success'] = false;
                $result['errormsg'] = $e->getMessage();
                
                return $result['errormsg'];
            }
            $actualsize = $bytespersource * $subsetfilecount;
            if($display == 'bytes'){
                     $sizeout = $actualsize;

                    } else {
                                $sizeout = formatSizeUnits($actualsize);}
            
            return $sizeout;
            break;

        default:
            break;
    }
    // if raster, grab mbpersource from mongo, parse bbox into something usable, count up envelopes by bbox, multiply by mongo's mbpersource
    
}
function getTotalSize($series, $format, $handle, $db, $display) {
    global $connection;
    global $collection;
    // global $db;
    
    switch ($format) {
        case 'raster':
            $query = array(
                "handle" => $handle
            );
            $cursor = $collection->find($query);
            
            foreach ($cursor as $obj) {
                /*
                a little sloppy here; why the loop? - #returnto
                */
                $mbtotal = $obj["mbtotal"];
                $sizebytes = $mbtotal * 1048576;
                if($display == 'bytes'){
                     $sizeout = $sizebytes;

                    } else {
                                    $sizeout = formatSizeUnits($sizebytes);}
            }
            
            return $sizeout;
            break;

        case 'vector':
            // $sql = "SELECT pg_total_relation_size('" . $series . "." . $handle . "');";
            $geomcolumn = getGeometryColumn($series, $handle);
            $sql = "SELECT sum(ST_Mem_Size(" . $geomcolumn . ")) as memsize FROM " . $series . "." . $handle . " WHERE " . $geomcolumn . " && ST_SetSRID ( ST_MakeBox2D ( ST_Point (-180, -90), ST_Point (180, 90) ), 4326 );";
            try {
                // Execute SQL query
                $pgsizeresults = pg_query($db, $sql);
                // Close the connection
                $db = null;
                
                while ($row = pg_fetch_array($pgsizeresults)) {
                    // $sizebytes = $row['pg_total_relation_size'];
                    $sizebytes = $row['memsize'];
                    if($display == 'bytes'){
                     $sizeout = $sizebytes;

                    } else {
                                        $sizeout = formatSizeUnits($sizebytes);}
                    
                    return $sizeout;
                }
            }
            catch(Exception $e) {
                // Catch any exceptions and report the problem
                $result = array();
                $result['success'] = false;
                $result['errormsg'] = $e->getMessage();
                
                return $result['errormsg'];
            }
            break;

        default:
            break;
    }
}
function getSeriesFormat($handle) {
    global $connection;
    global $collection;
    $format = 'null';
    $query = array(
        "handle" => $handle
    );
    $cursor = $collection->find($query);
    
    foreach ($cursor as $obj) {
        /*
            a little sloppy here; why the loop? - #returnto
        */
        $format = $obj["format"];
    }
    
    return $format;
}
?>
