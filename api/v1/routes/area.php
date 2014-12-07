<?php

require_once 'lib/producer.php';
function getSeriesArea($series,$outform){

$sqlfrom = '';
	$sqlwhere = '';
	$the_geom = "sum(st_area(the_geom))";

	$fieldsToOutput[] = $the_geom;


		$sqlfrom = " FROM envelopes.".$series." envs";
		

		$sql = "SELECT ";

		$sql .= implode(',',$fieldsToOutput);

		$sql .= $sqlfrom;

		$sql .= $sqlwhere;

		// echo $sql;die();

		producePGOutput($outform, $fieldsToOutput, $sql, 'echo');

}

?>