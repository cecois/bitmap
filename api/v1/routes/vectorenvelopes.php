<?php

require_once 'lib/producer.php';
function getVectorEnvelopes($series,$table,$outform) {

	$sqlfrom = '';
	$sqlwhere = '';
$schema=$series;
$the_geom="st_estimated_extent('$schema','$table','geom')";

		switch ($outform) {
			case 'geojson':
				$the_geom = 'st_asgeojson('.$the_geom.') the_geom';
				break;

			case 'json':
				// $the_geom = 'ST_AsEWKT('.$the_geom.') the_geom';
			$fieldsToOutput[] = "st_xmin(".$the_geom.") bbox_west";
			$fieldsToOutput[] = "st_xmax(".$the_geom.") bbox_east";
			$fieldsToOutput[] = "st_ymin(".$the_geom.") bbox_south";
			$fieldsToOutput[] = "st_ymax(".$the_geom.") bbox_north";
				break;	

			case 'kml':
				$the_geom = 'st_askml('.$the_geom.') the_geom';
				break;

			case 'wkt':
				$the_geom = 'st_astext('.$the_geom.') the_geom';
				break;

			case 'dc':
			$the_geom = "concat('west='||st_xmin(".$the_geom.")||','
 	||'south='||st_ymin(".$the_geom.")||','
 	||'east='||st_xmax(".$the_geom.")||','
 	||'north='||st_ymax(".$the_geom.")) the_geom";
				break;	

			default:
				$the_geom = 'st_astext('.$the_geom.') the_geom';
				break;


		}



		// echo $whereclause;

		$fieldsToOutput[] = $the_geom;


		// $sqlfrom = " FROM ".$schema.".".$table." envs";
		

		$sql = "SELECT ";

		$sql .= implode(',',$fieldsToOutput);

		$sql .= $sqlfrom;

		$sql .= $sqlwhere;

		// echo $sql;die();

		producePGOutput($outform, $fieldsToOutput, $sql, 'echo');
	}

?>