<?php

function geomFromBBOX($bbox,$srid){

	$bbox = explode(",", $bbox);
	$w = $bbox[0];
	$s = $bbox[1];
	$e = $bbox[2];
	$n = $bbox[3];

$bboxsql = "ST_SetSRID (
	ST_MakeBox2D (
		ST_Point (".$w.", ".$s."),
		ST_Point (".$e.", ".$n.")
	),
	".$srid."
)";


return $bboxsql;

}