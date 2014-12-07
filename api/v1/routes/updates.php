<?php

require_once 'lib/producer.php';


function getUpdatedDiscs($series, $range, $outform) {
	// no point in aggregating updates, i think
	$type = "individual";

// oh, wait - first see if somebody passed an individual record id
$seriesOrId=seriesInterp($series);	

switch ($seriesOrId) {
	case false:
	// we didn't get an id, so we proceed assuming we have a series and prob. date range
	$rangeArr=rangeScrub($range);

// make a mongo date from the 1st date string chunk
$start = new MongoDate(strtotime($rangeArr["start"]));
// make a mongo date from the 2nd date string chunk
$end = new MongoDate(strtotime($rangeArr["end"]));
// make the query based on whether the series is all or a designate
$series == "all" ? $mongoquery = (array("date_added" => array('$gte' => $start, '$lte' => $end))) : $mongoquery = (array("series"=>$series,"date_added" => array('$gte' => $start, '$lte' => $end)));
		break;
	
	default:
		$mongoid = new MongoId($seriesOrId);
		$mongoquery = array( "_id" => $mongoid );
		break;
}

// the array of fields to return from mongo
	$fieldsToOutput["date"] = 1;
	$fieldsToOutput["abstract"] = 1;
	$fieldsToOutput["envelope"] = 1;
	$fieldsToOutput["format"] = 1;
	$fieldsToOutput["title"] = 1;
	$fieldsToOutput["date_added"] = 1;
	$fieldsToOutput["_id"] = 0;
	$fieldsToOutput["resid"] = 1;

// the query into mongo



	produceMongoOutput($outform, $type, $fieldsToOutput, $mongoquery);
}

function januaryIze($y){

	// here's a lovely little thing that accounts for year-only values
	// if length is 4 we'll presume it's just a year and make it January
	// note that a year+space will not trigger this, causing failure down the line
	// as would, say, "June"
	// but this is prob. an entirely internal route, so i'll just be careful
if(strlen($y)==4){
	return $y."-01";
} else {
	return $y;
}

}

function seriesInterp($series){
	// we take a series string and check if it's actually just a mongo id being passed in
	$idmark=substr_count($series,"id:");
	if($idmark>0){
		// someone sent us an id: and not a date series, so... 
		$idEl = explode(":", $series);
		$recId = $idEl[1];
	} else {
		$recId = null;
	}
	return $recId;
}

function rangeScrub($range){
// get the start and end date elements

	// check for a dash
	$coloncount=substr_count($range, ":");

	if($coloncount>0){
		// if the dash is there, split it to assign the begin and end 
		$rangeEl = explode(":", $range);


// handle them if they're just years only
$rangeArr["start"]=januaryIze($rangeEl[0]);
$rangeArr["end"]=januaryIze($rangeEl[1]);
		
	} else{
		// or we will assume the one date is a beginning and they were too lazy to give us an end
		$rangeArr["start"]=januaryIze($range);

		// in which case we need to supply an end for them and we'll go with the end of whatever month
		$rangeArr["end"]=date("Y-m-t",strtotime($rangeArr["start"]));
	}

	// now we put it back together and return the whole thing
	return $rangeArr;


}


?>