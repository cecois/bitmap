<?php

require_once 'lib/producer.php';
function getDiscs($series,$outform,$type) {

// $series = strtolower($series);
		switch ($type) {
			case 'aggregate':
				// guess what -- at this point we don't care about more
				$fieldsToOutput["date"] = 1;
				$fieldsToOutput["_id"] = 0;
				$mongquery = (array( "series" => $series ));
				break;

			case 'individual':
				
				$fieldsToOutput["resid"] = 1;
				$fieldsToOutput["_id"] = 0;
				$mongquery = (array( "series" => $series ));

				break;

				case 'searchwith':

// a little sanitizing
				$series = str_replace(".zip", "", $series);
				$series = str_replace("libwebx", "", $series);

				$fieldsToOutput["resid"] = 1;
				$fieldsToOutput["title"] = 1;
				$fieldsToOutput["series"] = 1;
				$fieldsToOutput["envelope"] = 1;

				$fieldsToOutput["_id"] = 0;
				$mongquery = (array( "resid" => $series ));

				break;
			default:
				$query = array( "series" => $series );

				break;

			

		}

		produceMongoOutput($outform, $type, $fieldsToOutput, $mongquery);
	}

?>