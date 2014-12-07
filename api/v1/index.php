<?php
/**
 * Step 1: Require the Slim PHP 5 Framework
 *
 * If using the default file layout, the `Slim/` directory
 * will already be on your include path. If you move the `Slim/`
 * directory elsewhere, ensure that it is added to your include path
 * or update this file path as needed.
 */

require 'Slim/Slim.php';

/**
 * Step 2: Instantiate the Slim application
 *
 * Here we instantiate the Slim application with its default settings.
 * However, we could also pass a key-value array of settings.
 * Refer to the online documentation for available settings.
 */
$app = new Slim();

// DEBUGGING ONLY! #returnto
//require_once '/Library/WebServer/Documents/krumo/class.krumo.php';

require_once 'config/config.php';

// global $pg_db_host;
// global $pg_db_name;
// global $pg_db_user;
// global $pg_db_pssw;

require_once 'lib/db.php';
require_once 'routes/rasterenvelopes.php';
require_once 'routes/vectorenvelopes.php';
require_once 'routes/area.php';
require_once 'routes/discs.php';
require_once 'routes/layers.php';
require_once 'routes/rasterpaths.php';
require_once 'routes/size.php';
require_once 'routes/setQueue.php';
require_once 'routes/getQueue.php';
require_once 'routes/isQueued.php';
require_once 'routes/getMeta.php';
require_once 'routes/download.php';
require_once 'routes/ordered.php';
require_once 'routes/updates.php';
require_once 'routes/available.php';
require_once 'routes/rss.php';
require_once 'routes/request.php';
require_once 'routes/mongo2solr.php';

function debugMe(){
// header("Content-Type: application/xml");
// $app->response()->header('Content-Type', 'application/xml');
echo "debugged?";
}


/*

here we can request spatial extent objects out of postgis

*/


/* ----------
GETS
------------ */
/*

here we can pull out reports about series lineage from mongodb

so say we have a series (e.g. dted01) and we want to know
something about the full/partial array of discs that fed into it

something? yeah, like the min/max of the publication dates 
or perhaps just the array of disc names themselves

*/
$app->get('/discs/:series/:outform/:type','getDiscs');
$app->get('/rasterenvelopes/:series/:disc/:outform/:type','getRasterEnvelopes');
$app->get('/rasterpaths/:series/:handle/:howmuch/:outform','getRasterPaths');
$app->get('/vectorenvelopes/:series/:table/:outform','getVectorEnvelopes');
$app->get('/layers/:schema/:outform','getLayers');
$app->get('/area/:series/:outform','getSeriesArea');
$app->get('/size/:series/:handle/:howmuch/:display','getSeriesSize');
$app->get('/downloads/:apikey/:sessionid/:id','getDownloadObj');
$app->get('/downloads/:apikey/:sessionid','getQueue');
$app->get('/downloads/checkfor/:apikey/:sessionid/:handle','isQueued');
$app->get('/meta/:series/:handle','getMeta');
$app->get('/updates/:series/:range/:outform','getUpdatedDiscs');
$app->get('/download/:apikey/:sessionid/:mongid/:chunki','downloadChunk');
$app->get('/ordered/:series/:outform','getOrdered');
$app->get('/available/:series/:handle/:howmuch/:outform','getAvailableDiscs');

$app->get('/mongo2solr/:apikey/:series/:handle','mongo2solr');

$app->get('/rss/:channel','getRSS');

/* ----------
PUTS/UPDATES
------------ */
// $app->put('/enqueue/:apikey/:series/:handle/:format/:howmuch/:outform','enQueue');
$app->put('/downloads/:apikey/:sessionid/:id','triageQueue');
$app->put('/queue/:apikey/:sessionid/:mongoid/:truefalse','upQueue');


/* ----------
POSTS/CREATES
------------ */
// again a #returnto as the optional params are not proving optional
$app->post('/queue/:apikey/:series/:handle/:format/:howmuch/:outform(/:sessionid)','enQueue');
$app->post('/request','requestPurchase');


/* ----------
DELETES
------------ */
// again a #returnto as the optional params are not proving optional
// $app->delete('/queue/:apikey/:sessionid/:mongid','triageQueue');


/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function. If you are using PHP < 5.3, the
 * second argument should be any variable that returns `true` for
 * `is_callable()`. An example GET route for PHP < 5.3 is:
 *
 * $app = new Slim();
 * $app->get('/hello/:name', 'myFunction');
 * function myFunction($name) { echo "Hello, $name"; }
 *
 * The routes below work with PHP >= 5.3.
 */
// $app->get('/','debugMe');
$app->get('/', 'describeAPI');

function describeAPI(){
$template = <<<EOT
<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>api warning</title>
           </head>
        <body>
            <header>
                this isn't really a thing
            </header>
        </body>
    </html>
EOT;
    echo $template;

}

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This is responsible for executing
 * the Slim application using the settings and routes defined above.
 */
$app->run();
