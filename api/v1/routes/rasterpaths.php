<?php
require_once 'lib/producer.php';
include_once 'lib/boxFromBBOX.php';
include_once 'lib/getGeomColumn.php';

function getRasterPaths($series,$handle,$howmuch,$outform){

	if($howmuch == 'all'){
		$howmuch = '-180,-90,180,90';
	}

	
$geomcolumn = getGeometryColumn("envelopes", $handle);
$bbox = geomFromBBOX($howmuch, "4326");

// $sql = "SELECT location FROM envelopes." . $series . " WHERE " . $geomcolumn . " && " . $bbox . " limit 22;";

	$fieldsToOutput[] = "location";
	$sqlfrom = '';


// damn cdrg has to be handled specially
$series == "cdrg" ? $sqlfrom = " FROM envelopes." . $handle : $sqlfrom = " FROM envelopes." . $series;

		$sqlwhere = " WHERE " . $geomcolumn . " && " . $bbox . ";";
		

		$sql = "SELECT ";

		$sql .= implode(',',$fieldsToOutput);

		$sql .= $sqlfrom;

		$sql .= $sqlwhere;


producePGOutput($outform, $fieldsToOutput, $sql, 'echo');


}