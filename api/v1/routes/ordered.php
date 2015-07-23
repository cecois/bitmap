<?php
require_once 'lib/producer.php';
function getOrdered($series, $outform) {
    /* ----------
We want to be able to return to the client all of the discs that have been ordered for a given series THAT WE DON'T ALREADY HAVE IN-HAND AND PROCESSED. Primarily the idea is that we'll be showing them what we have (of course), showing what DLA has available that we don't already have, and then in between those two sources we can fill in with anything that we've already ordered but isn't ready (i.e. what this function provides). Anything missing beyond that is just a problem we need to sort out (e.g. processing failed on that disc or it got lost or something). Most of the time this will return an empty set.

The sources of these data are those DLA receipt text files (currently in Q:Bobb:MapStuff or somewhere close). This means that at any given moment we already have possession of most, if not all, of this material. It also means that we have to join to DLA catalog tables in order to grab the polygons for a given disc in order to render these on a map.

Also note the default catdisc field will be overwritten case-by-case bc certain series have their own idiosyncracis in dlacatalog data.

Even more IMPORTANT:::::
The series here are hard-written because of the varying ways that DLA catalog data, receipt text files, and our own metadata refer to different series. There was no great programmatic way, for example, to ensure that when we wanna query for dted01 in DLA catalog data that we know we have to lop off the first five characters of the nrn field. See? It's terrible work and it means that *this* file needs to be changed manually whenever a new unique series is added to our collection.
------------ */
    
    $catdisc = "lower(substring(nrn from 6))";
    
    switch ($series) {
        case 'cib01':
            $catalog_series = 'CB01';
            $catalog_suffix = 'cib';
            $catdisc = 'lower(nrn)'; // NOTE CIB HAS DIFF NRN VALUE THAN DTED
            break;

        case 'dted00':
            $catalog_series = 'DTED0';
            $catalog_suffix = 'dted';
            break;

        case 'dted01':
            $catalog_series = 'DTED1';
            $catalog_suffix = 'dted';
            break;

        case 'dted02':
            $catalog_series = 'DTED2';
            $catalog_suffix = 'dted';
            break;

        case 'dummy00':
            $catalog_series = 'DUMMY0';
            $catalog_suffix = 'dummy';
            $catdisc = 'lower(nrn)'; // NOTE dummy00 HAS DIFF NRN VALUE THAN DTED
            break;

        case 'srtm01':
            $catalog_series = 'SRT1';
            $catalog_suffix = 'srtm';
            break;

        default:
            echo json_encode("The given series is not yet available via the API.");
            die();
    }
    $sqlfrom = '';
    $sqlwhere = '';
    $the_geom = "dlacat_" . $catalog_suffix . ".the_geom";
    $schema = "envelopes";
    
    switch ($outform) {
        case 'geojson':
            $the_geom = 'st_asgeojson(' . $the_geom . ') the_geom';
            break;

        case 'json':
            // $the_geom = 'ST_AsEWKT('.$the_geom.') the_geom';
            $fieldsToOutput[] = "st_xmin(" . $the_geom . ") bbox_west";
            $fieldsToOutput[] = "st_xmax(" . $the_geom . ") bbox_east";
            $fieldsToOutput[] = "st_ymin(" . $the_geom . ") bbox_south";
            $fieldsToOutput[] = "st_ymax(" . $the_geom . ") bbox_north";
            break;

        case 'kml':
            $the_geom = 'st_askml(' . $the_geom . ') the_geom';
            break;

        case 'wkt':
            $the_geom = 'st_astext(' . $the_geom . ') the_geom';
            break;

        case 'dc':
            $the_geom = "concat('west='||st_xmin(" . $the_geom . ")||','
    ||'south='||st_ymin(" . $the_geom . ")||','
    ||'east='||st_xmax(" . $the_geom . ")||','
    ||'north='||st_ymax(" . $the_geom . ")) the_geom";
            break;

        default:
            $the_geom = 'st_astext(' . $the_geom . ') the_geom';
            break;
    }
    // echo $whereclause;
    $fieldsToOutput["id"] = "dlacat_" . $catalog_suffix . ".gid as id";
    $fieldsToOutput["the_geom"] = $the_geom;
    $fieldsToOutput[] = $catdisc . " as disc_available";
    $fieldsToOutput["title"] = "title";
    $fieldsToOutput["disc"] = "orders.disc"; // notice no alias because we want this one to be *the* "disc"
    $fieldsToOutput[] = "envelopes." . $series . ".disc as disc_inhand";

    $sqlfrom = " FROM " . "public.orders";
    $sqljoin = " join envelopes.dlacat_" . $catalog_suffix." ON orders.disc = " . $catdisc . " left join envelopes." . $series . " on(orders.disc = envelopes." . $series . ".disc) ";
    $sqlwhere = "where upper(orders.disc) LIKE '" . $catalog_series . "%' and " . $series . ".disc IS NULL";
    $sql = "SELECT ";
    $sql.= implode(',', $fieldsToOutput);
    $sql.= $sqlfrom;
    $sql.= $sqljoin;
    $sql.= $sqlwhere;
    // echo $sql;die();
    producePGOutput($outform, $fieldsToOutput, $sql, 'echo');
}
?>