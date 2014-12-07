<?php

require_once 'lib/producer.php';
function getRasterEnvelopes($series,$grouping,$outform,$type) {

	$sqlfrom = '';
	$sqlwhere = '';
$geomstr="the_geom";
$schema="envelopes";

$series=strtolower($series);
$grouping=strtolower($grouping);

		switch ($type) {
			case 'aggregate':
				$the_geom = "st_extent(st_transform(".$geomstr.",4326))";
				// $fieldsToOutput = array("concat('1'::integer) as id");
				$fieldsToOutput[] = "concat('1'::integer) as id";
				$fieldsToOutput[] = "concat('aggregated envelope - you should know that coverage is probably not contiguous') as location";
				break;
			case 'individual':
				$the_geom = "st_transform(".$geomstr.",4326)";
				$fieldsToOutput[] = "grouping";
				$fieldsToOutput[] = "gid as id";
				$fieldsToOutput[] = "location";

				break;
			default:
				$the_geom = "st_transform(".$geomstr."),4326)";
				$fieldsToOutput[] = "grouping";
				$fieldsToOutput[] = "gid as id";
				$fieldsToOutput[] = "location";

				break;

			

		}


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


		switch ($grouping) {
			case 'all':
				$whereclause = '';
				break;
			
			default:
				$whereclause = '';
				$groupingArray = explode(',',$grouping);
				
				// implode here with a quote to wrap the string
				$groupings = implode("', '",$groupingArray);

				// then there are quotes here for the first and last
				$whereclause = " grouping IN ('".$groupings."')";

				$sqlwhere = " WHERE " . $whereclause;

				break;
		}

		// echo $whereclause;

		$fieldsToOutput[] = $the_geom;


		$sqlfrom = " FROM ".$schema.".".$series." envs";
		

		$sql = "SELECT ";

		$sql .= implode(',',$fieldsToOutput);

		$sql .= $sqlfrom;

		$sql .= $sqlwhere;

		// echo $sql;die();

		producePGOutput($outform, $fieldsToOutput, $sql, 'echo');
	}

?>