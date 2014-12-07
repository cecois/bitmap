<?php

/*
	* DEBUG
	*/
	function pg2DEBUG($pgresults, $fieldsToOutput, $sql){
$count = 0; 
echo $sql."<br/><br/>";
while($row = pg_fetch_array($pgresults))
		{
$count = $count+1;

   }
   echo "total records: ".$count;
}