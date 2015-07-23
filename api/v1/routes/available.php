<?php
require_once 'lib/producer.php';
include_once 'lib/boxFromBBOX.php';
include_once 'lib/getGeomColumn.php';
function getAvailableDiscs($series, $handle, $howmuch, $outform) {
    if ($howmuch == 'all') {
        $howmuch = '-180,-90,180,90';
    }
    $geomcolumn = getGeometryColumn("envelopes", $handle);
    $bbox = geomFromBBOX($howmuch, "4326");
    $catdisc = 'lower(nrn)';
    
    switch ($series) {
        case 'cib01':
            $catalog_series = 'CB01';
            $catalog_suffix = 'cib';
            break;

        case 'dted00':
            $catalog_series = 'DTED0';
            $catalog_suffix = 'dted';
            break;

        case 'dted01':
            $catalog_series = 'DTED1';
            $catalog_suffix = 'dted';
            $catdisc = "lower(substring(nrn from 6))";
            break;

        case 'dted02':
            $catalog_series = 'DTED2';
            $catalog_suffix = 'dted';
            break;

        case 'dummy00':
            $catalog_series = 'DUMMY0';
            $catalog_suffix = 'dummy';
            break;

        case 'srtm01':
            $catalog_series = 'SRT1';
            $catalog_suffix = 'srtm';
            break;
    }
    $the_geom_raw = "dlacat_" . $catalog_suffix . ".the_geom";
    $sqlfrom = " FROM envelopes.dlacat_" . $catalog_suffix;
    $sqljoin = " LEFT JOIN envelopes." . $series . " on(" . $catdisc . " = lower(envelopes." . $series . ".disc)) LEFT JOIN public.orders on(" . $catdisc . " = lower(orders.disc)) ";
    $sqlwhere = '';
    
    switch ($outform) {
        case 'geojson':
            $the_geom = 'st_asgeojson(' . $the_geom_raw . ')';
            break;

        case 'json':
            $fieldsToOutput[] = "st_xmin(" . $the_geom_raw . ") bbox_west";
            $fieldsToOutput[] = "st_xmax(" . $the_geom_raw . ") bbox_east";
            $fieldsToOutput[] = "st_ymin(" . $the_geom_raw . ") bbox_south";
            $fieldsToOutput[] = "st_ymax(" . $the_geom_raw . ") bbox_north";
            break;

        case 'kml':
            $the_geom = 'st_askml(' . $the_geom_raw . ')';
            break;

        case 'wkt':
            $the_geom = 'st_astext(' . $the_geom_raw . ')';
            break;

        case 'dc':
            $the_geom = "concat('west='||st_xmin(" . $the_geom_raw . ")||','
    ||'south='||st_ymin(" . $the_geom_raw . ")||','
    ||'east='||st_xmax(" . $the_geom_raw . ")||','
    ||'north='||st_ymax(" . $the_geom_raw . "))";
            break;

        default:
            $the_geom = 'st_astext(' . $the_geom_raw . ')';
            break;
    }
    $joinwhere = " where (" . $catdisc . " LIKE lower('" . $catalog_series . "%') AND envelopes." . $series . ".disc IS NULL AND orders.disc IS NULL)";
    $spatialwhere = " AND " . $the_geom_raw . " && " . $bbox . ";";


    $fieldsToOutput["id"] = "dlacat_" . $catalog_suffix . ".gid as id";
    $fieldsToOutput["the_geom"] = $the_geom . " as the_geom";
    $fieldsToOutput["disc"] = $catdisc . " as disc";
    $fieldsToOutput["title"] = "title";
    $sql = "SELECT ";
    $sql.= implode(',', $fieldsToOutput);
    $sql.= $sqlfrom;
    $sql.= $sqljoin;
    $sql.= $joinwhere;
    $sql.= $spatialwhere;
    // echo $sql;die();
    producePGOutput($outform, $fieldsToOutput, $sql, 'echo');
}
