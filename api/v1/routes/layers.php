<?php

require_once 'lib/producer.php';
function getLayers($schema,$outform) {

	$sqlfrom = '';
	$sqlwhere = " where table_schema IN ('".$schema."') AND table_schema NOT IN ('pg_catalog', 'information_schema');";



		// echo $whereclause;

		$fieldsToOutput[] = "table_name";


		$sqlfrom = " FROM information_schema.tables";
		

		$sql = "SELECT ";

		$sql .= implode(',',$fieldsToOutput);

		$sql .= $sqlfrom;

		$sql .= $sqlwhere;

// echo $sql;die();

		producePGOutput($outform, $fieldsToOutput, $sql, 'echo');
	}

?>