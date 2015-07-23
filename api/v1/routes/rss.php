<?php
include ("lib/FeedTypes.php");
$connection = new Mongo();
$monclx_requests = $connection->feedback->requests;
$monclx_geodata = $connection->lllgeo->geodata;
$monclx_discs = $connection->discdb->discs;

function getRSS($channel) {
    global $connection;
    global $monclx_requests;
    global $monclx_geodata;
    global $monclx_discs;
    global $apihost;
    global $apphost;
    
    switch ($channel) {
        case 'requests':
        // OBSOLETE FOR NOW -- WE NO LONGER INTEND TO SUPPORT REQUESTS THAT COULD BE MONITORED HERE
            //Creating an instance of RSS2FeedWriter class.
            //The constant RSS2 is passed to mention the version
            $TheFeed = new RSS2FeedWriter();
            //Setting the channel elements
            //Use wrapper functions for common channel elements
            $TheFeed->setTitle('LL Library & Archives: LEO Requests Log');
            $TheFeed->setLink($apihost.'rss/requests');
            $TheFeed->setDescription("Probably not of general interest, this is a log of requests we receive for data via LEO's webapp or api.");
            //Image title and link must match with the 'title' and 'link' channel elements for RSS 2.0
            $TheFeed->setImage('Library &amp; Archives: LEO', $apihost.'rss/requests', $apphost.'/images/leo-logo.png');
            //Use core setChannelElement() function for other optional channels
            $TheFeed->setChannelElement('language', 'en-us');
            $TheFeed->setChannelElement('pubDate', date(DATE_RSS, time()));
            $cursor = $monclx_requests->find();
            $cursor->sort(array(
                'timestamp' => - 1
            ));
            foreach ($cursor as $obj) {
                //Create an empty FeedItem
                $newItem = $TheFeed->createNewItem();
                //Add elements to the feed item
                //Use wrapper functions to add common feed elements
                // $humandate = ;
                $humandate = date('r',strtotime($obj['timestamp']));
                $newItem->setTitle("Requested via " . $obj['source'] . " on " . $humandate);
                $newItem->setDate($humandate);
                $newItem->setDescription($obj['requestText']);
                $authorString = null;
                if (isset($obj['email'])) {
                    $authorString.= $obj['email'] . ":";
                }
                if (isset($obj['badge'])) {
                    $authorString.= $obj['badge'];
                }
                if ($authorString !== null) {
                    $newItem->addElement('author', $authorString);
                } else {
                    $newItem->addElement('author', 'anonymous');
                }
                $guid = $obj['_id']->__toString();
                //Attributes have to passed as array in 3rd parameter
                $newItem->addElement('guid', $guid, array(
                    'isPermaLink' => 'true'
                ));
                //Now add the feed item
                $TheFeed->addItem($newItem);
            }

            break;

        case 'new':
            //Creating an instance of RSS2FeedWriter class.
            //The constant RSS2 is passed to mention the version
            $TheFeed = new RSS2FeedWriter();
            //Setting the channel elements
            //Use wrapper functions for common channel elements
            $TheFeed->setTitle('LL Library & Archives: LEO New Data');
            $TheFeed->setLink($apihost.'rss/new');
            $TheFeed->setDescription("When we bring new series online or acquire new data, you will hear about it here.");
            //Image title and link must match with the 'title' and 'link' channel elements for RSS 2.0
            $TheFeed->setImage('Library &amp; Archives: LEO', $apihost.'rss/new', $apphost.'images/leo-logo.png');
            //Use core setChannelElement() function for other optional channels
            $TheFeed->setChannelElement('language', 'en-us');
            $TheFeed->setChannelElement('pubDate', date(DATE_RSS, time()));
            $cursor = $monclx_geodata->find();
            $cursor->sort(array(
                'updated' => - 1
            ));
                        foreach ($cursor as $obj) {
                //Create an empty FeedItem
                $newItem = $TheFeed->createNewItem();
                //Add elements to the feed item
                //Use wrapper functions to add common feed elements
                $newItem->setTitle($obj['title']);
                $newItem->setDate(strtotime($obj['updated'].'-01-01 00:00:00'));
                $newItem->setDescription($obj['description']);
                $newItem->setLink($apphost.'#details/'.$obj['series'].'/'.$obj['handle']);
                
                $authorString = 'Library & Archives';
                
                    $newItem->addElement('author', $authorString);
                $guid = $obj['_id']->__toString();
                //Attributes have to passed as array in 3rd parameter
                $newItem->addElement('guid', $guid, array(
                    'isPermaLink' => 'true'
                ));
                //Now add the feed item
                $TheFeed->addItem($newItem);
            }
            
            break;

            case 'updates':
            // here we pull out anything from mongodb's discs collection that isn't null in date_updated field
            //Creating an instance of RSS2FeedWriter class.
            //The constant RSS2 is passed to mention the version
            $TheFeed = new RSS2FeedWriter();
           
            //Setting the channel elements
            //Use wrapper functions for common channel elements
            $TheFeed->setTitle('LL Library & Archives: LEO Data Updates');
            $TheFeed->setLink($apihost.'rss/updates');
            $TheFeed->setDescription("When we update existing data series you will hear about it here.");
            //Image title and link must match with the 'title' and 'link' channel elements for RSS 2.0
            $TheFeed->setImage('Library &amp; Archives: LEO', $apihost.'rss/updates', $apphost.'/images/leo-logo.png');
            //Use core setChannelElement() function for other optional channels
            $TheFeed->setChannelElement('language', 'en-us');
            $TheFeed->setChannelElement('pubDate', date(DATE_RSS, time()));

            $updatesquery = array('date_added' => array('$ne' => null));
            $cursor = $monclx_discs->find($updatesquery);
            

            $cursor->sort(array(
                'date_added' => - 1
            ));
                        foreach ($cursor as $obj) {

                //Create an empty FeedItem
                $newItem = $TheFeed->createNewItem();
                //Add elements to the feed item
                //Use wrapper functions to add common feed elements
                $newItem->setTitle($obj['title']);
                $newItem->setLink($apphost.'#updates/id:'.$obj['_id']);
                // the date_added el is actually one of those crazy mongo date objs, so...
                $dateadded=date('Y-m-d H:i:s', $obj['date_added']->sec);
                $newItem->setDate($dateadded);
                $newItem->setDescription($obj['abstract']);
                // $newItem->setLink($apihost.'app/#details/'.$obj['series'].'/'.$obj['handle']);
                
                $authorString = 'Library & Archives';
                
                    $newItem->addElement('author', $authorString);
                $guid = $obj['_id']->__toString();
                //Attributes have to passed as array in 3rd parameter
                $newItem->addElement('guid', $guid, array(
                    'isPermaLink' => 'true'
                ));

                //Now add the feed item
                $TheFeed->addItem($newItem);
            }
            
            break;

        default:
            break;
    }
    //OK. Everything is done. Now genarate the feed.
    $TheFeed->generateFeed();
    // header('Content-type: application/json', true);
    // echo json_encode($meta);
    
}
?>