<?php
/*
	*  DC
	*/
	function pg2DC($pgresults, $fieldsToOutput,$sql)
	{ 
		$pg2textresults = '';
		

		while($row = pg_fetch_array($pgresults))
		{   

			
				// $pg2textresults .= $row['location'];
				// $pg2textresults .= "\n";
				$pg2textresults .= $row['the_geom'];
		

		}
		
		// array_push($pg2textresult['results'],$pg2text);
	   
		header('Content-type: text/plain',true);

		
		echo $pg2textresults;
	}	