/* ----------
Here we have some bootstrapping stuff. 
appSearch we create here, e.g., b/c we need it to exist always, basically,
b/c of the search bar in the header
------------ */

/* ------------- GLOBALS -------------------------------------- */
// var apphost = "libgeo"
// var apphost = "localhost"
var apphost = window.location.hostname;
var vectorLimit = "80";


window.solrRoot = "../../solr/select/?version=2.2&wt=json&q=";
window.solrAdmin = "../../solr/admin/";
window.geowebCacheRoot = "http://"+apphost+"/gs/gwc/service/wms";

// THIS SHOULD BE SET TO THE ACTUAL HOSTNAME OF THE TARGET DIST
window.geoServerHost="http://"+apphost+"/gs/";

window.map = new L.Map('map', {
	zoomControl: false,
	center: [51.505, -0.09],
	attributionControl: false,
	zoom: 2
});    
/* ------------- END GLOBALS ---------------------------------------- */

// set up a layer for series-level envelopes
hitEnvelopeJson = L.geoJson().addTo(map);
hitCoverageJson = L.geoJson().addTo(map);

// universal throbber icon
throbicon = "icon-spinner";

updatesJson = L.geoJson(null, {
	style: {"fillColor":"white"}}).addTo(map);


// definitely this is gui, so apikey is hardwired to 0
apikey = 0;

// some of these jokers wont' be down with cookies, let's check
if (navigator.cookieEnabled) {
	cookies = true
} else {
	cookies = false;

	// new console model and view
var cookieWarning = new Console().set({
	message: "No cookies, eh? This thing will work, but any downloads you intiate will NOT persist if you close the browser window. And you wont' be able to turn off some of the nags."});
var cookieWarningView = new WarningView({
	model: cookieWarning
});



}

	// no? then we first want an id
	var t = uniqid();
	var uid = apikey + "_" + t;


// either way we need that value for stuff
if (cookies == true) {

// first of all, have they been here before?
if ($.cookie('lllgeo_download_session') == null) {
	// set cookie
	$.cookie('lllgeo_download_session', uid, {
		expires: 7
	});

}
sessionkooky = $.cookie('lllgeo_download_session');
} else {
	sessionkooky = uid;
}

// baselayers piped in from a db/config
window.appBaseLayers = new BaseLayersCollection();

// and a menu view for stylish swappin'
window.appBaseMapsMenuView = new BaseMapsMenuView({
	collection: appBaseLayers
});

// go get em
appBaseLayers.fetch({
	success: function(collection) {

		var $el = $("#mnuBaseMap");
		$el.empty();
		// and the prestige!
		$el.html(appBaseMapsMenuView.render().el);

	}

});

// new search model and view
window.appSearch = new Search();
window.appSearchView = new SearchView({
	model: appSearch
});

// new console model and view
window.appConsole = new Console().set({
	message: "HINT! Press the 'z' key at any time to reveal the full map."
});
window.appConsoleView = new ConsoleView({
	model: appConsole
});

// new activity model and view
window.appActivity = new Activity();
window.appActivityView = new ActivityView({
	model: appActivity
});

// oh, about that activity console...
// let's just presume that any time we kill a layer we'll also reset the activity console
map.on('layerremove', function(e) {
    appConsoleView.reset();
});
map.on('layeradd', function(e) {
});

//all purpose modal and view
window.appModal = new Modal();
window.appModalView = new ModalView({
	model: appModal
});

//all purpose help model and view
window.appHelpNag = new HelpNag();
window.appHelpNagView = new HelpNagView({
	model: appHelpNag
});

//home page! a Backbone model, too? Yes!
appHome = new Home({});
    appHomeView = new HomeView({
      model: appHome
    }).render();

//help page! a Backbone model, too? Yes!
appHelp = new Help({});
    appHelpView = new HelpView({
      model: appHelp
    }).render();


//beta page! a Backbone model, too? Yes!
// appBetaSplash = new BetaSplash({});
//     appBetaSplashView = new BetaSplashView({
//       model: appBetaSplash
//     }).render();

// catch-all group for user-drawns, which as of this writing are for subsetting only
drawnItems = new L.LayerGroup();

// first we have to bind to map events
map.on('moveend', function(e) {

	setAppSearchBoundsFromMap();

	// it feels like also we should notify the user that since the map moved their next search will be affected
	// if this gets annoying we'll kill it
	appConsole.set({message:"the map has moved -- your next search will factor in the new extent"})

});

map.on('layerremove', function(e) {
	// some layers will report info to console, here's a universal reset for those
	appConsoleView.reset();
});

function zoomToModel(m){

	var bounds = [[m.get("bbox_north"), m.get("bbox_west")], [m.get("bbox_south"), m.get("bbox_east")]];
	map.fitBounds(bounds);
}

function setAppSearchBoundsFromMap() {


	var boundsArr = map.getBounds();
	var sw = boundsArr.getSouthWest();
	var ne = boundsArr.getNorthEast();
	// a little nudging to account for calculated extents that go beyond abs(180),abs(90)
	var w = capLongitude(sw.lng) - 1;
	var s = capLatitude(sw.lat) - 1;
	var e = capLongitude(ne.lng) + 1;
	var n = capLatitude(ne.lat) + 1;

	appSearch.set({
		bbox_west: w,
		bbox_south: s,
		bbox_east: e,
		bbox_north: n
	});


}

function capLatitude(lat) {
	if (lat > 90) {
		lat = 90;
	} else if (lat < -90) {
		lat = -90;
	}
	return lat;
}

function capLongitude(lng) {
	if (lng > 180) {
		lng = 180;
	} else if (lng < -180) {
		lng = -180;
	}
	return lng;
}

function fireSearch(){

$("#appendedInputButtons").blur(); //mostly so z keypress will work instantly and not append 'z' to end of querystring

		var queryInput = $("#inputSearch input");
		if(queryInput.val() == ''){queryInput.val("*:*")}

		// first we send the query string to the appSearch model
		appSearch.set({
			"querystring": queryInput.val()
		}, {
			silent: true
		});
		appSearch.set({
			"page": 1
		}); //bc we're firing off a new query and page may be set already
		// and fire off appSearchExec
		// ...which will pick up that query string from the model and fire it off
		appSearchExec();

}

$(function() {

	/* ----------
wire up the search button
------------ */
	$("#inputSearch input").keyup(function (e) {
    if (e.keyCode == 13) {
		fireSearch()
        
    }
});

	$("#btnSearch").click(function() {

		fireSearch()

	});




});

function appSearchExec() {


	/* ----------
SOME PRELIMS
------------ */
var hitwidth = "span5";
	// first we clear some screen real estate
	$("#paneContainer").addClass(hitwidth);

	var $el = $("#paneContainer > #search > #searchhitsWrapper > #searchhits");

	// we want a new hits obj using current appSearch model's query
	var qurl = appSearch.get("qurl")
	var query = appSearch.get("query");
	var queryHuman = appSearch.get("querystring");
	var page = appSearch.get("page");

	appHits = null;

	$.ajax({
		url: qurl + query,
		type: 'GET',
		dataType: 'json',
		beforeSend: function(){
	wakeTheKids('search');
	
			
		},
		complete: function(xhr, textStatus) {
		},
		success: function(data, textStatus, xhr) {
			appHits = new Hits(data.response.docs)
			var hitCount = data.response.numFound
			appSearch.set({hitcount:hitCount})
			appHitsView = new HitsView({
				collection: appHits
			});

			// and the prestige!
			$el.html(appHitsView.render().el);
			// and now that it's all rendered, some sugar...
			appHitsView.toolize();
		},
		error: function(xhr, textStatus, errorThrown) {
			$el.html('<div class="alert alert-error span4">Hm, this thing has broken at the knees and cannot return results right now. Sad face.</div>')
		}
	});

	// well, almost - if we weren't already on the search "page" we need to go there
	appRoute.navigate("search/p" + page + "/" + queryHuman, {
		// trigger: true,
		replace: true
	});

// not doing this anymore, too slow
	// appConsole.set({"message":'<i style="font-size:1em;color:green;" class="icon-sun"></i> = layer\'s extent overlaps map extent.'});
	// appConsole.set({"message":"Hello, I'm Console."});
	appConsoleView.render()
	// wakeTheKids('search', queryHuman);

	mapMatchSearch();

}


/* ----------
This is a handlebars helper that may not be used #returnto
was gonna help alternate li element styles/positioning
but Bootstrap paints them to the grid, which seems to take care of it
------------ */
var hitIndex = 0;
Handlebars.registerHelper('left_or_right', function() {
	var pull=null;
	hitIndex++;
	var hitIndexSide = (hitIndex % 2 == 0) ? pull="alternate-right" : pull="alternate-left";
		return pull;

})

Handlebars.registerHelper('timestamp_format', function(object) {

		var timeobj = new Time(object);
		var t = timeobj.format('l'+", "+'F'+' '+'j');
		return new Handlebars.SafeString(t);

    });

function masterClearLayers(){

	/* ----------
This is tricky. We need a capable assassin for when we need to clear the map and show something new. But there are *some* layers that can co-exist
------------ */

if(typeof drawnItems != 'undefined'){map.removeLayer(drawnItems);}

// if(typeof geojsonZoom != 'undefined'){map.removeLayer(geojsonZoom);}
if(typeof geojsonZoom != 'undefined'){geojsonZoom.clearLayers()}

if(typeof polyFromWKT != 'undefined'){polyFromWKT.clearLayers()}

if(typeof hitPreviews != 'undefined'){hitPreviews.clearLayers();}
if(typeof rasterEnvelopes != 'undefined'){rasterEnvelopes.clearLayers();}

if(typeof hitEnvelopeJson != 'undefined'){hitEnvelopeJson.clearLayers();}
if(typeof hitCoverageJson != 'undefined'){hitCoverageJson.clearLayers();}

if(typeof updatesJson != 'undefined'){updatesJson.clearLayers();}

// hitEnvelopeJson.clearLayers()
// hitCoverageJson.clearLayers()


}

function randomStyle(){

var styles=[{
		"color": "#394834","fillColor": "#394834",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#486f95","fillColor": "#486f95",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#05296E","fillColor": "#05296E",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#A64800","fillColor": "#A64800",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#031841","fillColor": "#031841",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#A64800","fillColor": "#A64800",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#260F1C","fillColor": "#260F1C",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#1B2A11","fillColor": "#1B2A11",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#2A2E12","fillColor": "#2A2E12",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#414622","fillColor": "#414622",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#8C510A","fillColor": "#8C510A",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#DFC27D","fillColor": "#DFC27D",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#01665E","fillColor": "#01665E",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#4D4D4D","fillColor": "#4D4D4D",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#e86000","fillColor": "#e86000",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#5e399b","fillColor": "#5e399b",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#b5a221","fillColor": "#b5a221",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	},{
		"color": "#656033","fillColor": "#656033",
		"weight": 2,
		"opacity": .9,
		"fillOpacity":.55
	}];

var max=styles.length;
var which=_.random(0, max);	
	return styles[which]

}

function addPolyFromWKT(poly,label){

	/* 
	we wanna be able to send a WKT-formatted polygon string and label and have the Wicket library make a map object from it and add it to the polyFromWKT layer group
	*/

// just some random style from our random styler
var polystyle = randomStyle();

// Create a new Wicket instance
wkt = new Wkt.Wkt();

// Read in the passed-in poly WKT string
wkt.read(poly);

obj = wkt.toObject(this.map.defaults); // Make an object

// give it that style
obj.setStyle(polystyle);
// give it that label
obj.bindLabel(label);

obj.addTo(this.map); // Add it to the map

// let's do a reveal (kinda)
// map.panTo(obj.getBounds().getCenter());
map.fitBounds(obj.getBounds());

// and give a true to the caller
return true

}
// var polygo = addPolyFromWKT(envo,envolabel);
function addHitGeoJSONPoly(geofrag,label) {
	// var hitStyle = {
	// 	"color": "#5c7f92",
	// 	"weight": 2,
	// 	opacity: 0.85
	// };
	var hitStyle = randomStyle();
	var geojson = L.geoJson(geofrag, {
		// style for all vector layers (color, opacity, etc.), either function or object (optional)
		style: hitStyle,
            onEachFeature: function(feature, layer) {
              layer.bindLabel(label, { noHide: true })
            }
	});
	return geojson;
}

/* ----------
wake the kids?
this is a global func that takes a passed dom element
and basically just toggles the visibility of its siblings --
used to show/hide the guts of paneContainer based on the active route
------------ */
function wakeTheKids(el, extruz) {



/* ----------
it's probably ok to have a global killer of some stuff that triggers upon an href click, y?
------------ */
		$('.popover').hide();

if(el !== "search"){
	$("#paneContainer").removeClass("span5")
}
	$('.nav-tabs').find('a[href="#' + el + '"]').tab('show');

	var ttl = "LL GeoData: " + el;
	if (typeof extruz != 'undefined') {
		ttl += " -- " + extruz;
	}
	$(document).attr("title", ttl);

}

/* ----------
map map search?
this is a global func that shops current search bbox values to the bboxer func
so we can make the map zoom to the search's params
------------ */
function mapMatchSearch() {
	var mapBounds = appSearch.getBounds();
	// y, we used to fitbounds, but bc of those stamen layers we have to be mindful of zooms
	// map.fitBounds(mapBounds);
	var c = map.getCenter()
	var z = map.getZoom();
	map.setView(c,z)
}

/* ----------
one of a few (#returnto) fetchers of json content
------------ */
function retrieveHitJson(url) {


	var json = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': url,
			'dataType': "json",
			'success': function(data) {
				json = data;
			},
			'error':function(){
				json = "[]";
			}
		});
		return json;
	})();

	return json;

}

function getFeaturesWithinExtent(url) {


	var json = (function() {
		var json = null;
		$.ajax({
			'async': false,
			'global': false,
			'url': url,
			'dataType': "json",
			'success': function(data) {
				json = data;
			},
			'error':function(){
				json = "[]";
			}
		});
		return json;
	})();

	return json;

}


$(function() {


	// this is reusable layer we use to zoomto various selections
	// e.g. freebase result
	geojsonZoom = L.geoJson().addTo(map);
	
	polyFromWKT = new L.LayerGroup().addTo(map);

	// container groups for preview layers
	hitPreviews = new L.LayerGroup().addTo(map);

	rasterEnvelopes = new L.LayerGroup().addTo(map);



	// here we wire a key for toggling the main pane
	$(document).keydown(function(e) {
		if (e.keyCode == 90) {
if($("#appendedInputButtons").is(":focus") == false){
			$("#paneContainer").fadeToggle('fast');
			appConsole.set({"message":"press the 'z' key to toggle the element's visibility"})
		}

		}
	});

		$(document).keydown(function(e) {
		if (e.keyCode == 67) {
if($("#appendedInputButtons").is(":focus") == false){
			$("#paneContainer").toggleClass('panecollapsed');
			appConsole.set({"message":"press the 'c' key to toggle the element's visibility"})
		}
		}
	});

$(document).keydown(function(e) {
	if (e.keyCode == 192) {
if($("#appendedInputButtons").is(":focus") == false){
		// $("#paneContainer, #header, #navContainer, #consoleContainer").toggle();
		$("#paneContainer, #header, #navContainer").toggle();
		appConsole.set({"message":"press the '`' key (under 'esc') to toggle the element's visibility"})
	}
	}
});

	$('#mnuBaseMap').mouseenter(function() {
		$(this).switchClass("", "up", 50, "linear");
	}).mouseleave(function() {
		$(this).switchClass("up", "", 100, "linear");
	});

});


$(document).ready(function() {

	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '';
			}
		}
	});

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});

	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		mainClass: 'mfp-no-margins', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		}
	});

});


$("#btnGeocode").click(function() {

			var queryInput = $("#appendedInputButtons.span3").val();
var d = {
      "name": queryInput
    };
		fbSelect(d);

	});

/* ----------
FREEBASE TYPEAHEAD WAS SELECTED, WE RUN...
------------ */
function fbSelect(data) {

	
	// lose the focus on the search field:
	// so z keypress will work instantly and not append 'z' to end of querystring
	$("#appendedInputButtons").blur();


	var datums = [{
		name: "DTED"
	}, {
		name: "CIB"
	}];

	var stringIsData = _.any(datums, function(datum) {

		return datum.name === data.name;
	});

	if (stringIsData == true) {
		// maybe later
	} else {
		// maybe later
	}


		
		var urlRoot = "http://nominatim.openstreetmap.org/search"
		var urlParams= "?q="+data.name+"&format=json&polygon_geojson=1&limit=1"


			appZoomLayer = new ZoomLayer()

		
			appZoomLayerView = new ZoomLayerView({
			model: appZoomLayer
		});
appZoomLayer.set({
			url: urlRoot + urlParams + '&callback=?',
			// source:"freebase"
			source:"nominatum",
			// source:"geonames",
			queryterm:data.name
		});

}

function enthrob(el){

	var c = el.attr("class");
	el.removeClass(c).addClass(throbicon).addClass('icon-throb');
	return c

}

function dethrob(el,staticicon){

el.removeClass('icon-throb').removeClass(throbicon).addClass(staticicon)

}

function throbreset(el,staticicon){

el.removeClass('icon-throb').removeClass(throbicon).addClass(staticicon)

}

function pseudoAreaFromBbox(bbox) {

	var coords = bbox.split(",");
	var hor = Math.abs((coords[2]) - (coords[0]))
	var ver = Math.abs((coords[3]) - (coords[1]))

	return hor * ver;

}

function splitRange(range){
	var n=range.split(":");
	return n
}
function splitDate(d){
	var da=d.split("-");
	return da
}

function seriesInterp(series){
	var n=series.split("id:");
	return n;

}

function uniqid() {
	var newDate = new Date;
	return newDate.getTime();
}

function withinCheck(sarr,harr){

// 	MAYBE ABANDON THIS IN FAVOR OF https://github.com/tmcw/leaflet-pip
// searchbox bbox lain over hit bbox and if any part of hit is inside we return true

var swest=sarr[0];
var ssouth=sarr[1];
var seast=sarr[2];
var snorth=sarr[3];

var hwest=harr[0];
var hsouth=harr[1];
var heast=harr[2];
var hnorth=harr[3];

// if((hwest>swest && hwest<seast) || (heast>swest && heast<seast))

}

function toolHit(placement){
	if(typeof placement == 'undefined'){
		var placement = "top";
	}
	$(".btnEnvelope").tooltip({placement: placement,trigger: 'hover',container: 'body',delay: 0,title: "toggle a rectangle representing the layer's aggregate spatial extent"});
    $(".btnCoverage").tooltip({placement: placement,trigger: 'hover',container: 'body',delay: 0,title: "toggle a map of the layer's individual tiles' extents"});
    $(".btnDetails").tooltip({placement: placement,trigger: 'hover',container: 'body',delay: 0,title: "get more detailed info about the dataset"});
    $(".btnDownload").tooltip({placement: placement,trigger: 'hover',container: 'body',delay: 0,title: "add this layer to your download queue, clipped to the current map extent (you can adjust the download's extent in the Download Queue"});
    $(".btnPreview").tooltip({placement: placement,trigger: 'hover',container: 'body',delay: 0,title: "render a preview of the layer -- vectors are limited to just a sampling of features and rasters will render at slightly courser resolution than they really are"});
}


function resetPaneContainer(orig){

	$("#paneContainer").removeClass(orig);

	// var hitwidth = "span14";
	// first we clear some screen real estate
	// $("#paneContainer").addClass(hitwidth);

}

function pctPie(el, datum) {

	// el is just a string i guess
	var w = 50,
		h = 50,
		r = Math.min(w, h) / 2,
		data = [datum],
		color = d3.scale.ordinal().range(["red", "black"]);
	arc = d3.svg.arc().endAngle(function(d) {
		return 2 * Math.PI * (d / 100);
	}).outerRadius(r).innerRadius(0).startAngle(0);

	var vis = d3.select(el).append("svg:svg").attr("width", w).attr("height", h);
	var arcs = vis.selectAll("g.arc").data(data).enter().append("svg:g").attr("class", "arc").attr("fill", "pink").attr("transform", "translate(" + r + "," + r + ")");

	arcs.append("svg:path").attr("fill", function(d, i) {
		return color(i);
	}).attr("d", arc);

	return this
}


function generatePopup(objArray) {
    /* we are assuming a js object that stores key/value pairs in a properties array 
-- basically we're assuming we have geojson coming in
    */
    var properties = objArray.properties;
    var str = '<dl class="dl-horizontal">';

$.each(properties, function( index, value ) {
  str+='<dt>'+index+'</dt><dd>'+value+'</dd>';
});
    str+='</dl>'
    return str;
}