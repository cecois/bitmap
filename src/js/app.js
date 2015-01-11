/* -------------------------------------------------- GLOBALS -----------------------  */
verbose = true;

NProgress.configure({ parent: '#main' });
window.apphost = "localhost";
window.solrhost = "http://localhost:8983/solr/";


// jeez i hate to bootstrap this w/ an extra ajax call but i don't wanna have to remember to update this when i change the solr schema
// $.getJSON(solrhost+'/cbb_bits/admin/luke?numTerms=0', {wt: 'json'}, function(json, textStatus) {
//   console.log("fields call:");console.log(json);
// });


            markernew = {
                radius: 6,
                fillColor: "#1288b9",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6,
                // cartodb_id: hit.get("cartodb_id").toString()
            };

                        markeractive = {
                radius: 18,
                fillColor: "#fecd0b",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6,
                // cartodb_id: hit.get("cartodb_id").toString()
            };
                        markerseen = {
                radius: 6,
                fillColor: "#ffffff",
                color: "#1288b9",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6,
                // cartodb_id: hit.get("cartodb_id").toString()
            };

$(".leaflet-control-zoom").append('<a class="leaflet-control-zoomprevious glyphicon glyphicon-step-backward" href="#" title="Zoom to Previous"></a>');
$(".leaflet-control-zoom").append('<a class="leaflet-control-zoomfull glyphicon glyphicon-fullscreen" href="#" title="Zoom Way dafuk out"></a>');

window.appURL = new URL();



window.appEpisodes = new Episodes();

// window.appEpisodes = new Episodes();
window.appEpisodesView = new EpisodesView({collection:appEpisodes});

// window.cbbItems = L.featureGroup()
//     // .on('click', function() { alert('Clicked on a group!'); })
//     .addTo(map);
/* -------------------------------------------------- BASEMAPS -----------------------  */
var baselayers = {
    "layers": [{
            "name": "mapquest",
            "active": false,
            "source": "mapquest",
            "nom": "MapQuest OSM",
            // "thumb": "http://otile1.mqcdn.com/tiles/1.0.0/osm/3/4/2.png",
            "thumb": "offline/mapquest.jpg",
            "mapis": "light",
            "definition": {
                "subdomains": ["otile1", "otile2", "otile3", "otile4"],
                "maxZoom": 18,
                "url": "http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",
                "noWrap": true
            }
        }, {
            "name": "mapquest_aerial",
            "active": false,
            "source": "mapquest",
            "nom": "MapQuest Open Aerial",
            "thumb": "offline/mapquest-aerial.jpg",
            // "thumb": "http://otile1.mqcdn.com/tiles/1.0.0/sat/3/4/2.png",
            "mapis": "dark",
            "definition": {
                "subdomains": ["otile1", "otile2", "otile3", "otile4"],
                "maxZoom": 18,
                "url": "http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png",
                "noWrap": true
            }
        }, {
            "name": "super_mario",
            "active": false,
            "source": "mapbox",
            "nom": "Duncan Graham's Super Mario",
            "thumb": "offline/mapbox-mario.png",
            // "thumb": "http://otile1.mqcdn.com/tiles/1.0.0/sat/3/4/2.png",
            "mapis": "light",
            "definition": {
                "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                // "url": "http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png",
                "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
                "noWrap": true
            }
        }, {
            "name": "space_station_earth",
            "active": false,
            "source": "mapbox",
            "nom": "Eleanor Lutz' Space Station Earth",
            // "thumb": "offline/mapbox-mario.png",
            "thumb": "https://b.tiles.mapbox.com/v4/examples.3hqcl3di/4/4/6@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
            "mapis": "dark",
            "definition": {
                "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                "url": "https://{s}.tiles.mapbox.com/v4/examples.3hqcl3di/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
                // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
                "noWrap": true
            }
        }, {
            "name": "pencil",
            "active": true,
            "source": "mapbox",
            "nom": "Aj Ashton's Pencil Map",
            // "thumb": "offline/mapbox-mario.png",
            "thumb": "https://a.tiles.mapbox.com/v4/examples.a4c252ab/6/18/26@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
            "mapis": "dark",
            "definition": {
                "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                "url": "https://{s}.tiles.mapbox.com/v4/examples.a4c252ab/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
                // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
                "noWrap": true
            }
        }
        // , {
        //     "name": "cloudmade",
        //     "active": false,
        //     "source": "cloudmade",
        //     "nom": "CloudMade Grey",
        //     "thumb": "http://c.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/3/4/2.png",
        // "mapis":"dark",//     
        // "definition": {
        //         "maxZoom": 18,
        //         "subdomains": ["a", "b", "c"],
        //         "noWrap": true,
        //         "url": "http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/{z}/{x}/{y}.png"
        //     }
        // }, {
        //     "name": "cloudmade_redalert",
        //     "active": false,
        //     "source": "cloudmade",
        //     "nom": "Red Alert",
        //     "thumb": "http://c.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/19996/256/3/4/2.png",
        // "mapis":"dark",//     
        // "definition": {
        //         "maxZoom": 18,
        //         "subdomains": ["a", "b", "c"],
        //         "noWrap": true,
        //         "url": "http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/19996/256/{z}/{x}/{y}.png"
        //     }
        // }
        , {
            "name": "opencycle_cycle",
            "active": false,
            "source": "opencycle",
            "nom": "OpenCycle",
            // "thumb": "http://a.tile.opencyclemap.org/cycle/4/8/4.png",
            "thumb": "offline/opencyclemap.png",
            "mapis": "light",
            "definition": {
                "maxZoom": 18,
                "subdomains": ["a", "b", "c"],
                "noWrap": true,
                "url": "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
            }
        }, {
            "name": "opencycle_landscape",
            "active": false,
            "source": "opencycle",
            "nom": "OpenCycle Landscape",
            "thumb": "offline/opencycleland.png",
            // "thumb": "http://b.tile3.opencyclemap.org/landscape/5/17/9.png",
            "mapis": "dark",
            "definition": {
                "maxZoom": 18,
                "subdomains": ["a", "b", "c"],
                "noWrap": true,
                "url": "http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png"
            }
        }, {
            "name": "stamen_toner",
            "active": false,
            "nom": "Stamen Toner",
            "source": "stamen",
            "thumb": "offline/stamen-toner.png",
            // "thumb": "http://c.tile.stamen.com/toner/10/163/395.png",
            "mapis": "dark",
            "definition": {
                "id": "toner",
                "url": null
            }
        }
        , {
            "name": "stamen_watercolor",
            "active": false,
            "nom": "Stamen Watercolor",
            "source": "stamen",
            "thumb": "offline/stamen-watercolor.jpg",
            // "thumb": "http://tile.stamen.com/watercolor/12/655/1583.jpg",
            "mapis": "light",
            "definition": {
                "id": "watercolor",
                "url": null
            }
        }
    ]
}
appBaseLayers = new BaseLayersCollection(baselayers.layers);
// ...for which we need a menu
appBaseLayersMenuView = new BaseLayersMenuView({
    collection: appBaseLayers
});
// ...and an actual map
appBaseLayersView = new BaseLayersView({
    collection: appBaseLayers
});
// var baselayerTrue = _.find(appBaseLayers.models, function(lay) {
//     // lay.get("active")==true ? function(){return lay} : function(){return null};
//     if (lay.get("active") == true) {
//         return lay
//     }
// });
// console.log("173 bltrue:");console.log(baselayerTrue);
// appBaseMap = new BaseMap(baselayerTrue)
// console.log("175 basemap:");console.log(appBaseMap);
// appBaseMapView = new BaseMapView()
window.appCartoQuery = new CartoQuery();
window.appCartoQueryView = new QueryView({model:appCartoQuery});
// var mods = (function() {
//     var json = null;
//     $.ajax({
//         'async': false,
//         'global': false,
//         'url': 'offline/cbb_point-og.json',
//         'dataType': "json",
//         'success': function(data) {
//             json = data.rows;
//         },
//         'error':function(){
//             json = "[]";
//         }
//     });
//     return json;
// })();
// return json;
// window.appCarto = new CartoCollectionDev(mods);
// window.appCarto = new CartoCollection(mods);
// window.appCarto = new CartoCollection();
// var CartoDB = Backbone.CartoDB({
//         user: 'pugo' // you should put your account name here
//                        // YOURUSER.cartobd.com
//     });
// var CBBCollx= CartoDB.CartoDBCollection.extend({
//         table: 'cbb_point', //public table
//         // format: 'geoJSON',
//         columns: {
//             'name': 'name',
//             'the_geom':'the_geom',
//             // 'lat':'st_y(the_geom)',
//             // 'lng': 'st_x(the_geom)'
//             'anno':'anno'
//         }
//         ,
//         sql: function() {
//         return "select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point "
//         +appCartoQuery.get("wherestring");
//     }
//     });
/* -------------------------------------------------- INITS -----------------------  */

switch(apphost) {
    case "localhost":
window.appCBB = new CartoCollectionDev();
        break;
    default:
window.appCBB = new CartoCollection();
}

// appCBBCarto.fetch();
// appCBBCarto.bind('reset', function() {
//  appCBBCarto.each(function(p) {
//     console.log(p.get('name'));
//     console.log(p);
// });
// });
window.appCBBListView = new CartoPlainView({
    collection: appCBB
})
window.appCBBMapView = new CartoCollxView({
    collection: appCBB
})
// honestly not sure why i gotta chain the render here, but there it is :-/
// appCBBCarto.fetch({
//     success:function(collx,resp,opt){
//         console.log("success, resp:");console.log(resp);
//         console.log("success, opt:");console.log(opt);
//         appCartoPlainView.render();
//         appCartoView.render();
//     },
// error:function(c,r,o){
// console.log("in error, r:");console.log(r);
// console.log("in error, o:");console.log(o);
// }})
// appCBBCarto.fetch(
// {success:function(){
// console.log("in success of appCBBCarto fetch");
// var appCartoPlainView = new CartoPlainView({collection:appCBBCarto})
// var appCartoView = new CartoCollxView({collection:appCBBCarto})
// }
// });

// new console model and view
window.appConsole = new Console().set({
    // message: "HINT! Press the 'z' key at any time to reveal the full map."
    message: "Console console. Quasi-important messages will appear here."
});
window.appConsoleView = new ConsoleView({
    model: appConsole
});

// new activity model and view
window.appActivity = new Activity();
window.appActivityView = new ActivityView({
    model: appActivity
});


var recentsCollx = new RecentsCollection([{
    name: "one"
}, {
    name: "two"
}]);
var recentsCollxView = new RecentsView({
    collection: recentsCollx
})
var huh = new Huh();
var huhV = new HuhView({
    model: huh
})
var method = new Method();
var methodV = new MethodView({
    model: method
})

/* -------------------------------------------------- Free Funcs -----------------------  */

function pullURL(goto){

if(typeof goto == 'undefined'){
    // eh not great - we just troll the gui for the mainpanel that's currently showing - hope it's right!
    var hel = $(".mainpanel:not('.hidden')")
    var h = '#'+$(hel).attr("id")

    // e.g. nothing's been lit up before
    if(h=="#undefined"){
        h="#huh"
    }
} else {
    var h = goto;
}

    var bbx = map.getBounds().toBBoxString();
    var qs = appCartoQuery.get("solrstring")
    var bl = appBaseLayers.findWhere({active:true}).get("name")

    var url = h+"/"+qs+"/"+bbx+"/"+bl
    
    return url
}

function processLeaf(m,pop){
    console.log("in processleaf, m:");console.log(m);

                _.each(cbbItems._layers, function(i) {
                    if (i.options.seen == true) {
                        i.setStyle(markerseen)
                    }

                    if(i.options.cartodb_id.toString() == m){
                i.setStyle(markeractive)
                i.options.seen = true;
                if(pop==true){
                    i.openPopup()
                }

                    }
                }) //each

                // if(typeof stale !== 'undefined'){
                // stale.setStyle(markerseen)}
                // hit.set({active:true});
                // hit.set({
                //     queued: true
                // });}

}

/* -------------------------------------------------- RUN! -----------------------  */
cbbItems = L.geoJson().addTo(map);

window.appWikiaz = new Wikiaz()
appWikiaz.fetch();

window.appSolrFields = new SolrFields();
appActivity.set({message: "fetching Luke/Solr fields...",show: true,altel:false})
appSolrFields.fetch({
    success:function(){
        appActivity.set({message: "",show: false,altel:false})
    }
})


/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {

// $('#query-form-bt').click(function(e){
//     e.preventDefault()

//     var rawstring = $("#query-form-input").val()
    
//     appCartoQuery.set({rawstring:rawstring})

//         appActivity.set({
//             message: "querying...",
//             show: true
//         })

//     appCBB.fetch({
//         success: function(c) {
//                 appCBBListView.render()
//                 appCBBMapView.render()
//                 appActivity.set({message: "",show: false,altel:false})
//         },
//         error: function() {
//           appActivity.set({message: "",show: false,altel:false})
//             appConsole.set({message:"query failed",error:true})
//         }
//     })



// }) //query-form-bt.click


    $(".leaflet-control a").each(function() {
        $(this).css("transform", "rotate(-90deg)")
    });
    $(".leaflet-control-container").appendTo("#wrapper").css("z-index", 88)
    $("a.leaflet-control-zoom-in")

  

    // oh one more thing - let's intercept the query tab button so it doesn't wipe out appcarto each time
// $("html body header.site-header.off-canvas-container.js-off-canvas-container div.content-wrap.off-canvas-contents nav.site-nav.pull-left ul li a.link.active").click(function(e){
// $("a[href='#query']").click(function(e){
//     e.preventDefault();

// appCartoQuery
    // var url = pullURL('#query');
    
    // appRoute.navigate(url, {trigger: true, replace: true})

// })


}); //ready
$(document).keydown(function(e) {
    if (e.keyCode == 17) {
        $("#main").toggleClass('hiddenish');
        $("#bt-showmain").toggleClass("hidden")
        // $("#main").fadeToggle('fast');
        appConsole.set({
            "message": "press the 'control' key to toggle better visibility of the map"
        })
    }
});