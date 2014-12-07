<?php

function getCurl($url) {
	// create a new cURL resource
	$ch = curl_init();
	// set URL and other appropriate options
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	$curlresp = curl_exec($ch);
	// print_r($curlresp);
	curl_close($ch);
	return $curlresp;

}