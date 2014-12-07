<?php 
$devmarker = 'dev.php';
file_exists($devmarker) ? $dev=true : $dev=false;
include_once 'lib/gitcurrentgitbranch.php';
include_once '../api/v1/config/config.php';
$gitbranch = getGitBranch();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

  <title>LL GeoData : </title>
    <link rel="shortcut icon" href="images/favico.ico">

<!-- STYLES -->

    <!-- Bootstrap -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<link href="lib/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">


    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Cabin+Condensed:400,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=News+Cycle:400,700' rel='stylesheet' type='text/css'>
    
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' rel='stylesheet' type='text/css'>


    <!-- Leaflet, icomoon, et al -->
    <link rel="stylesheet" type="text/css" href="lib/leaflet/leaflet.css">
    <!--[if IE]> 
<style type="text/css">@import "lib/leaflet/leaflet.ie.css";</style>
    <style type="text/css">@import "css/styles.ie.css";</style> 
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="lib/icomoon/style.css">
    <link rel="stylesheet" type="text/css" href="lib/jquery-rangeslider/css/classic-min.css">
    <!--[if lte IE 7]><script src="lib/icomoon/lte-ie7.js"></script><![endif]-->
    <link rel="stylesheet" type="text/css" href="lib/freebase-suggest/css/suggest.min.css">
    <link rel="stylesheet" type="text/css" href="lib/leaflet-draw/leaflet.draw.css">
    <link rel="stylesheet" type="text/css" href="lib/leaflet-label/leaflet.label.css">
    <link rel="stylesheet" type="text/css" href="lib/magnific-popup/magnific-popup.css">
    <!-- LEO -->
<?php
echo $dev == true ? '<link rel="stylesheet/less" type="text/css" href="css/styles.less"><link rel="stylesheet/less" type="text/css" href="css/styles-responsive.less"><script src="lib/less-1.3.0.min.js" type="text/javascript"></script>' : '<link rel="stylesheet" type="text/css" href="css/styles.min.css">';
?>
    
<!-- <link rel="stylesheet" type="text/css" href="css/debug.css"> -->

<!-- <link rel="alternate" type="application/rss+xml" title="LL GeoData New Data" href="../api/v1/rss/new"/> -->
<link rel="alternate" type="application/rss+xml" title="LL GeoData Data Updates" href="../api/v1/rss/updates"/>
</head>
<body>
<?php
    echo $dev == true ? "<link href='css/banner.css' rel='stylesheet' type='text/css'><link href='css/devmarkers.css' rel='stylesheet' type='text/css'><div class='ribbon ribbon-gold'><a href='#' rel='me'>(Source Vers.)</a></div>" : ""; 

if($mode !== "prod"){
  echo "<link href='css/banner.css' rel='stylesheet' type='text/css'><link href='css/devmarkers.css' rel='stylesheet' type='text/css'><div class='ribbon ribbon-gold' style='left:-50px;top:23px;'><a href='#' rel='me'>(&nbsp;&nbsp;&nbsp;&nbsp;API=Dev)</a></div>";
}

    ?>

    <div id='map'></div>
    <div id="header" class="row">
<ul class="span6 headerButtons pull-left">

    <li style="float: left;">
<div class="headerButton">
     <a href="https://c3.llan.ll.mit.edu/"><div><span style="width:100%;" class="icon-arrow-up-left " data-original-title="Lincoln Lab Home (C3)"></span></div>
      <p class="anno">Lab Home</p>
    </div></a>
  </li>
    <li style="float: left;">
    <a href="https://c3.llan.ll.mit.edu/wps/portal/mitll/services/Library"><div class="headerButton">
         <div><span style="width:100%;" class="icon-arrow-circle-up" data-original-title="Library &amp; Archives Home"></span></div>
          <p class="anno">Library Home</p>
        </div></a>
  </li>
  <li style="float: left;">
    <div class="headerButton">
     <div id="helpNagWrapper"></div>
      <p class="anno" style="cursor:auto;">Annotations</p>
    </div>
  </li>
  <li style="float: left;">
    <a href="../api/v1/rss/updates"><div class="headerButton">
         <div><span style="width:100%;" class="icon-feed" data-original-title="Data Updates RSS"></span></div>
          <p class="anno">New Data RSS</p>
        </div></a>
  </li>
  <li style="float: left;">
    <a href="https://c3.llan.ll.mit.edu/blogs/249650e6-9c85-498a-bd0d-59b7b602623a/?lang="><div class="headerButton">
         <div><span style="width:100%;" class="icon-users" data-original-title="C3 Community"></span></div>
          <p class="anno">C3 Community</p>
        </div></a>
  </li>
  <li style="float: left;">
    <a href="http://libweb/mtblog/Maps"><div class="headerButton">
         <div><span style="width:100%;" class="icon-map" data-original-title="More Maps/Data"></span></div>
          <p class="anno">More Maps/Data</p>
        </div></a>
  </li>
    <li style="float: left;">
    <a href="#"><div class="headerButton">
         <div><span style="width:100%;" class="icon-quill contact-trigger" data-original-title="Tell Us"></span></div>
          <p class="anno">Tell Us</p>
        </div></a>
  </li>
</ul>



            <div id="inputSearch" class="input-append pull-right">
      <!-- <div class="span3"></div> -->
        <div id="inputContainer" class="span3"></div>
      <button id="btnSearch" class="btn" type="button">Search for Data</button>
        <button id="btnGeocode" class="btn" type="button">Find/Zoom to a Place</button>
     
      <!-- <div class="span3"></div> -->
    </div>


    </div>

    <!-- 
HOLIDAY/CUSTOM STUFF

<div id="seasonal" class="offset8">    
    <span aria-hidden="true" class="icon-santa-cap"></div>
    -->
    <div id="navContainer" class="navbar row">

    <div class="tabbable tabs-below ">
<!-- <div class="span3" ></div> -->
<ul class="nav nav-tabs ">
  <div id="navshim" class="span1"></div>
        <li title="home" class="navitem active span2" style="">
          <a href="#home">

<?php
echo isset($gitbranch) == true && $dev == true ? $gitbranch : 'Home';
?>

          </a>
        </li>
        <li class="navitem span2" title="see current search results">
          <a href="#search">Search Results</a>
        </li>
        <li class="navitem span2" title="get more info">
          <a href="#details">Details</a>
        </li>
        <li class="navitem span2" title="downloads">
          <a href="#download">Download Queue</a>
        </li>
                <li class="navitem span2" title="updates">
          <a href="#updates">Updates</a>
        </li>
        <li class="navitem span2" title="get help">
          <a href="#help">Help/Doc</a>
        </li>
                
    </ul>
      
<!-- <div class="span2" ></div> -->
    </div>
    </div>

<div id="activityContainer" class="span6" style=""></div>

    <div id="paneContainer" class="tab-content row">
    <div class="tab-pane active" id="home"></div>
    <div class="tab-pane fade" id="search">





<div id="searchhitsWrapper" class="span5">
<!-- <div id="searchhitsheader">toggle me with the 'z' key</div> -->
<!-- <div class="fader span5"></div>  -->
    <div class="searchstats span5">
      <!-- <div class="throb" id="searchthrob"></div> -->
    </div>
    <!-- /.fader -->
<div id="searchhits">
  


</div> <!-- /.searchhis -->
</div> <!-- /.searchhisWrapper -->


  </div> <!-- /#search -->
    <div class="tab-pane fade" id="details"></div>
    <div class="tab-pane fade" id="queue"></div>
    <div class="tab-pane fade" id="download"></div>
    <div class="tab-pane fade" id="updates"><div id="updatesViewWrapper"></div><div class="sliderContainer span9 offset1">
  <div id="dateSlider"></div>
</div></div>

    <div class="tab-pane fade" id="help" style="text-align:center;"></div>

    
    

    </div>
    <div id="modalContainer" class="modal"></div>
    <div id="contactContainer" class="modal hide fade"></div>

    <div id="mnuBaseMap" class="span6"></div>

    
    
 <div id="consoleContainer" class="span6"></div>


<?php
echo $dev == true ? '<script src="lib/jquery-1.8.1.min.js"></script><script src="lib/jquery.cookie.js"></script><script src="lib/jquery.utils.lite.min.js"></script><script src="lib/jquery-ui-1.9.0.custom.min.js"></script><script src="lib/jquery.scrollTo.min.js"></script><script src="lib/spin.min.js" type="text/javascript"></script><script src="lib/spin.min.jquery.js" type="text/javascript"></script><script src="lib/underscore-min.js"></script><script src="lib/json2.js"></script><script src="lib/leaflet/leaflet.js" type="text/javascript"></script><script type="text/javascript" src="lib/tile.stamen.js?v1.2.0"></script><script src="lib/leaflet-draw/leaflet.draw.min.js" type="text/javascript"></script><script src="lib/leaflet-draw/leaflet.draw.override.js" type="text/javascript"></script><script src="lib/leaflet-label/leaflet.label.js" type="text/javascript"></script><script src="lib/time.min.js"></script><script src="lib/wicket.js"></script><script src="lib/wicket-leaflet.js"></script><script src="lib/bootstrap/js/bootstrap.min.js"></script><script src="lib/handlebars.min.runtime.js"></script><script src="js/Handlebars.templates.js"></script><script src="lib/jquery-rangeslider/jQDateRangeSlider-min.js"></script><script src="lib/terraformer/terraformer.min.js"></script><script src="lib/terraformer/wkt.min.js"></script><script src="lib/backbone-min.js"></script><script src="lib/magnific-popup/magnific-popup.min.js" type="text/javascript"></script>' : '<script src="lib/jquery-1.8.1.min.js"></script><script src="lib/jquery.cookie.js"></script><script src="lib/jquery.utils.lite.min.js"></script><script src="lib/jquery-ui-1.9.0.custom.min.js"></script><script src="lib/jquery.scrollTo.min.js"></script><script src="lib/spin.min.js" type="text/javascript"></script><script src="lib/spin.min.jquery.js" type="text/javascript"></script><script src="lib/underscore-min.js"></script><script src="lib/json2.js"></script><script src="lib/leaflet/leaflet.js" type="text/javascript"></script><script type="text/javascript" src="lib/tile.stamen.js?v1.2.0"></script><script src="lib/leaflet-draw/leaflet.draw.min.js" type="text/javascript"></script><script src="lib/leaflet-draw/leaflet.draw.override.js" type="text/javascript"></script><script src="lib/leaflet-label/leaflet.label.js" type="text/javascript"></script><script src="lib/time.min.js"></script><script src="lib/wicket.js"></script><script src="lib/wicket-leaflet.js"></script><script src="lib/bootstrap/js/bootstrap.min.js"></script><script src="lib/handlebars.min.runtime.js"></script><script src="js/Handlebars.templates.js"></script><script src="lib/backbone-min.js"></script><script src="lib/jquery-rangeslider/jQDateRangeSlider-min.js"></script><script src="lib/terraformer/terraformer.min.js"></script><script src="lib/terraformer/wkt.min.js"></script><script src="lib/magnific-popup/magnific-popup.min.js" type="text/javascript"></script>';
?>


 
<?php
echo $dev == true ? '<script src="js/models/baseMap.js" type="text/javascript"></script><script src="js/views/baseMapView.js" type="text/javascript"></script><script src="js/models/baseLayer.js" type="text/javascript"></script><script src="js/models/baseLayers.js" type="text/javascript"></script><script src="js/views/baseMapMenuView.js" type="text/javascript"></script><script src="js/views/baseMapsMenuView.js" type="text/javascript"></script><script src="js/models/search.js" type="text/javascript"></script><script src="js/views/searchView.js" type="text/javascript"></script><script src="js/views/searchStatsView.js" type="text/javascript"></script><script src="js/models/download.js" type="text/javascript"></script><script src="js/models/downloads.js" type="text/javascript"></script><script src="js/views/downloadQueueView.js" type="text/javascript"></script><script src="js/views/downloadsQueueView.js" type="text/javascript"></script><script src="js/models/zoomLayer.js" type="text/javascript"></script><script src="js/views/zoomLayerView.js" type="text/javascript"></script><script src="js/views/hitEnvelopeView.js" type="text/javascript"></script><script src="js/views/hitCoverageView.js" type="text/javascript"></script><script src="js/views/hitPreviewView.js" type="text/javascript"></script><script src="js/models/console.js" type="text/javascript"></script><script src="js/views/consoleView.js" type="text/javascript"></script><script src="js/models/contact.js" type="text/javascript"></script><script src="js/views/contactView.js" type="text/javascript"></script><script src="js/views/warningView.js" type="text/javascript"></script><script src="js/models/modal.js" type="text/javascript"></script><script src="js/views/modalView.js" type="text/javascript"></script><script src="js/models/helpNag.js" type="text/javascript"></script><script src="js/views/helpNagView.js" type="text/javascript"></script><script src="js/models/activity.js" type="text/javascript"></script><script src="js/views/activityView.js" type="text/javascript"></script><script src="js/models/home.js" type="text/javascript"></script><script src="js/views/homeView.js" type="text/javascript"></script><script src="js/models/help.js" type="text/javascript"></script><script src="js/views/helpView.js" type="text/javascript"></script><script src="js/models/updates.js" type="text/javascript"></script><script src="js/views/updatesView.js" type="text/javascript"></script><script src="js/views/updatesSliderView.js" type="text/javascript"></script><script src="js/models/hit.js" type="text/javascript"></script><script src="js/models/hits.js" type="text/javascript"></script><script src="js/views/subMapView.js" type="text/javascript"></script><script src="js/views/hitView.js" type="text/javascript"></script><script src="js/views/hitsView.js" type="text/javascript"><script src="js/views/noHitsView.js" type="text/javascript"></script><script src="js/views/downloadSubsetView.js" type="text/javascript"></script><script src="js/models/detail.js" type="text/javascript"></script><script src="js/views/detailView.js" type="text/javascript"></script>' : '<script src="js/models.min.js" type="text/javascript"></script><script src="js/views.min.js" type="text/javascript"></script>';
?>

<script src="lib/d3/d3.v2.min.js" type="text/javascript"></script>
    <script src="lib/jquery.dotdotdot.min.js" type="text/javascript"></script>
    <script src="lib/jquery.fastLiveFilter.min.js"></script>

<?php 
echo $dev == true ? '<script src="js/dev.js" type="text/javascript"></script>' : '';
?>

<?php 
echo $dev == true ? '<script src="js/app.js" type="text/javascript"></script><script src="js/routes.js" type="text/javascript"></script>' : '<script src="js/leo.min.js" type="text/javascript"></script>';
?>    
    
    <script src="lib/freebase-suggest/suggest.lllgeo.js"></script>

<!-- Piwik --> 
<script type="text/javascript">
var pkBaseURL = (("https:" == document.location.protocol) ? "" : "");
document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
</script><script type="text/javascript">
try {
var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 12);
piwikTracker.trackPageView();
piwikTracker.enableLinkTracking();
} catch( err ) {}
</script><noscript><p><img src="" style="border:0" alt="" /></p></noscript>
<!-- End Piwik Tracking Code -->

</body>
</html>