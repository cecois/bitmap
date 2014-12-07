<?php

function mongo2solr($apikey,$series,$handle){

	/* ----------

We want to reindex a mongo document in Solr with this, specifically following an update of a popularity value but we may end up using it for other things as well.

Note that this route will *not* do the commit at the end, as our solr has an autocommit set.

Note also apikey could either be verified here or, more likely, can be removed if we check it using shared slim middleware. We "verify" it here by checking for a 0 value, since at this point (prerelease!) we *only* have gui's 0 apikey as a potential value.
------------ */

if(!isset($apikey)){
	die("No apikey, dummy!");
}

if($apikey != 0){die("Who dis?!");}

if(!isset($series)){
	die("No series, dummy!");
}

if(!isset($handle)){
	die("No handle, dummy!");
}

$options = array( 'hostname' => 'localhost','port'=>'8080' );
$client = new SolrClient($options);

$m = new Mongo( 'mongodb://127.0.0.1:27017' );
$c = $m->lllgeo->selectCollection( 'geodata' );

$r = $c->find(array("series" => $series,"handle" =>$handle));



foreach ($r as $d) {

$document = $d;
var_dump($document);

		
		$solrDoc = new SolrInputDocument();

/* ----------
TIME CONVERSIONS
------------ */	

// why? you know why.
$january = '01-01-';
$december = '31-12-';
$date_updated_raw = strtotime($december.$document['updated']);
$date_updated = gmDate("Y-m-d\TH:i:s.z\Z",$date_updated_raw);

$date_start_raw = strtotime($january.$document['date_start']);
$date_start = gmDate("Y-m-d\TH:i:s.z\Z",$date_start_raw);

$date_end_raw = strtotime($december.$document['date_end']);
$date_end = gmDate("Y-m-d\TH:i:s.z\Z",$date_end_raw);

/* ----------
OTHER CONVERSIONS
------------ */	
$sources = implode(",", $document['sources']);

/* ----------
MULTIVALUED=FALSE
------------ */
		$solrDoc->addField("_id",$document['_id']);
		$solrDoc->addField("description",$document['description']);
		$solrDoc->addField("description_source",$document['description_source']);
		$solrDoc->addField("title",$document['title']);
		$solrDoc->addField("handle",$document['handle']);
		$solrDoc->addField("series",$document['series']);
		$solrDoc->addField("format",$document['format']);

		$solrDoc->addField("classification",$document['classification']);
		$solrDoc->addField("rights",$document['rights']);
		$solrDoc->addField("sources",$sources);
		$solrDoc->addField("complete",$document['complete']);

		$solrDoc->addField("updated",$date_updated);
		$solrDoc->addField("date_start",$date_start);
		$solrDoc->addField("date_end",$date_end);

		$solrDoc->addField("popularity",$document['popularity']);
		$solrDoc->addField("ourweight",$document['ourweight']);
		$solrDoc->addField("location",$document['location']);


		$solrDoc->addField("bbox_west",$document['bbox_west']);
		$solrDoc->addField("bbox_south",$document['bbox_south']);
		$solrDoc->addField("bbox_east",$document['bbox_east']);
		$solrDoc->addField("bbox_north",$document['bbox_north']);

		switch ($document['format']) {
			case 'raster':

					$solrDoc->addField("mbpersource",$document['mbpersource']);

		$solrDoc->addField("mbtotal",$document['mbtotal']);

		$solrDoc->addField("resolution",$document['resolution']);

		$solrDoc->addField("earthfactor",$document['earthfactor']);
				
				break;

			case 'vector':
			
			break;	
			
			default:
				# code...
				break;
		}

		
/* ----------
MULTIVALUED=TRUE
------------ */	

			foreach ($document['titlealt'] as $titlealt => $value) {
				$solrDoc->addField("titlealt",$value);
			}
			foreach ($document['subject'] as $subject => $value) {
				$solrDoc->addField("subject",$value);
			}
			if(isset($document['tags'])){
			foreach ($document['tags'] as $tags => $value) {
				$solrDoc->addField("tags",$value);
			}
			}
			foreach ($document['source'] as $source => $value) {
				$solrDoc->addField("source",$value);
			}
		
		$updateResponse = $client->addDocument( $solrDoc );
		$resp = $updateResponse->getResponse();

}		
// die();
		// $client->commit();
	
}
?>