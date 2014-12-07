<?php
// dev, prodTest, prod
// $mode = "dev";
// $mode = "qa";
$mode = "prod";
$modefile=$mode.".php";

switch ($mode) {
	case 'qa':
		$apihost = "http://libgeoqa/leo/api/v1/";
		$apphost = "http://libgeoqa/leo/";
		break;

	case 'dev':
		$apihost = "http://libgeoqa/leo/api/v1/";
		$apphost = "http://libgeoqa/leo/";
		break;

	case 'prod':
		$apihost = "http://libgeo/api/v1/";
		$apphost = "http://libgeo/";
		break;
	
	default:
		$apihost = "http://libgeo/api/v1/";
		$apphost = "http://libgeo/";
		break;
}

// $mode == "qa" ? $apihost = "http://libgeoqa/leo/api/v1/" : $apihost = "http://libgeoqa/leo/api/v1/";
// $mode == "qa" ? $apphost = "http://libgeoqa/leo/" : $apphost = "http://libgeoqa/leo/dist/";

// depending on mode we load the appropriate globals
require_once $modefile;




?>
