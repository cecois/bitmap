<?php

function producePGOutput($outform, $fieldsToOutput, $sql, $echoreturn)
	{
		// Global app variable to set a proper header for actual kml clients later
		global $app;

		// Global database variable
		global $db;

		// Include models
		// include_once 'models/models.php';
		include_once 'models/'.$outform.".php";


		// Try-catch block to catch any wayward exceptions
		try
		{	
			// Set the output parser
			$outparser = 'pg2' . strtoupper($outform);

			// Execute SQL query
			$pgresults = pg_query($db, $sql);

			// Close the connection
			$db = null;
			$result['data'] = $pgresults;
			$result['success'] = true;
		}
		catch(Exception $e)
		{
			// Catch any exceptions and report the problem
			$result = array();
			$result['success'] = false;
			$result['errormsg'] = $e->getMessage();
		}


		// Format the output

		switch ($echoreturn) {
			case 'return':
				$out = $outparser($result['data'], $fieldsToOutput,$sql);
				return $out;

				break;
			
			default:
			try{
							echo $outparser($result['data'], $fieldsToOutput,$sql);}
							catch(Exception $e)
							{
											$result = array();
			$result['success'] = false;
			$result['errormsg'] = $e->getMessage();
			echo json_encode($result);
							}
				break;
		}
		exit();
	}

function produceMongoOutput($outform, $type, $fieldsToOutput, $mongquery) {

	// include_once 'models/models.php';
	include_once 'models/'.$outform.".php";

	// Set the output parser
	$outparser = 'mongo2'.strtoupper($outform);


try
 {
     $connection = new Mongo;
         // get db and collection from connection
         $collection = $connection -> discdb -> discs;
 }
 catch ( MongoConnectionException $e )
 {
     echo '<p>Couldn\'t connect to mongodb, is the "mongo" process running?</p>';
     exit();
 }


	
	$cursor = $collection -> find($mongquery)->fields($fieldsToOutput);
	$cursor->sort(array('resid' => 1));


	$records = iterator_to_array($cursor);
	// Format the output
	echo $outparser($records, $type, $fieldsToOutput);
	exit();

}

?>