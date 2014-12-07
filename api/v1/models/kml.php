<?php
/*
	*  KML
	*/
	function pg2KML($pgresults, $fieldsToOutput)
	{ 
		
		$kml = '<?xml version="1.0" encoding="UTF-8"?>
		<kml xmlns="http://www.opengis.net/kml/2.2"
		 xmlns:gx="http://www.google.com/kml/ext/2.2">
		<Document>';

		while($row = pg_fetch_array($pgresults))

		{
			if(isset($row['location'])){
		$descrip=$row['location'];
			} elseif(isset($row['title'])){
		$descrip=$row['title'];
			}
		  html_entity_decode($descrip);
		  
		  $rid=$row['id'];
		  if(isset($row['location'])){
		$name=$row['location'];
			} elseif(isset($row['title'])){
		$name=$row['title'];
			}
		  // $name=$row['location'];]
		  html_entity_decode($name);
		  
			$kml .= '
			  <Placemark id="'.$rid.'">';
if(isset($tstamp)){
		$kml .= '<TimeStamp>
				  <when>'.$tstamp.'</when>
				</TimeStamp>';
}					  
		$kml .= '<name><![CDATA['.$name.']]></name>
				<description><![CDATA['.$descrip.']]></description>';

		$kml .= $row['the_geom'];

			  $kml .= '</Placemark>';



		}
		$kml .= '</Document></kml>';
		// header('Content-type: application/vnd.google-earth.kml+xml',true);
		header('Content-type: application/xml',true);	 
		// header('Content-type: text/html',true);    
		return $kml;
	}
	