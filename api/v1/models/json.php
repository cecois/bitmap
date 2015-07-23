<?php
/*
	*  JSON
	*/
	function pg2JSON($pgresults, $fieldsToOutput,$sql)
	{ 
		$pg2jsonresult['results'] = array();
		$pg2json = array();
		if(isset($params['callback'])){
		$callback = $params['callback'];}

		while($row = pg_fetch_array($pgresults))
		{   
			for($i=0; $i<count($row); $i++)
			{
				unset($row[$i]);
			}
			// Add feature array to array
			array_push($pg2json, $row);
		}
		
		array_push($pg2jsonresult['results'],$pg2json);
	   
		header('Content-type: application/json',true);
		if(isset($callback)){
			// echo $callback . '(' . json_encode($pg2jsonresult) . ')';
			return $callback . '(' . json_encode($pg2jsonresult) . ')';
		} else {
		// echo json_encode($pg2jsonresult);
		return json_encode($pg2jsonresult);
	}
	}

	function mongo2JSON($records, $type, $fieldsToOutput) {

		switch ($type) {
			case 'individual':


				echo json_encode($records);
				break;

				case 'searchwith':
				echo json_encode($records);
				break;

			case 'aggregate':
					
/*	
				well here we hit some mongo trouble - no aggregation as of this writing
				so we'll do this w/ php itself -- should be fast enough still
*/

asort ( $records );
$min_date = current( $records );
// echo $min_date["date"];

arsort ( $records );
$max_date = current( $records );
// echo $max_date["date"];


				$discArr["min_date"]=$min_date["date"];
				$discArr["max_date"]=$max_date["date"];
				// foreach ($discs as $disc => $resid) {

				// 	$discArr[]=$resid["date"];
				// }
				echo json_encode($discArr);
				break;

			default:
				# code...
				break;
		}



	}