<?php

/*here are some very crude tests of some (SOME!) of the routes we
need to be sure are working*/

$probcount=0;

function testEnvelopeResponse($discs,$outform,$sumlevel){

global $probcount;

$url = 'http://localhost/lllgeo/api/v1/envelopes/dted01/'.$discs.'/'.$outform.'/'.$sumlevel;


$resp=getCurl($url);

if($resp!=='200'){
	echo "PROBLEM: ".$url;
	$probcount = $probcount+1;
}


}

function testDiscResponse($series,$outform,$sumlevel)
{

	global $probcount;

	$url = 'http://localhost/lllgeo/api/v1/discs/'.$series.'/'.$outform.'/'.$sumlevel;

	$resp = getCurl($url);

	if($resp!=='200'){
	echo "PROBLEM: ".$url;
	$probcount = $probcount+1;
}
}


function getCurl($url) {

	$headers = get_headers($url,0);
	$headers = substr($headers[0],9,3);
	// echo $headers;die();
    return $headers;
}


testEnvelopeResponse('dted103','wkt','aggregate');
testEnvelopeResponse('dted103,dted106','debug','aggregate');
testEnvelopeResponse('dted103,dted106','geojson','aggregate');
testEnvelopeResponse('dted103,dted106','geojson','individual');
testEnvelopeResponse('dted103','geojson','aggregate');

testDiscResponse('dted01','json','individual');
testDiscResponse('dted01','json','aggregate');

echo $probcount." problems. We good?";