/* -------------------------------------------------- GLOBALS -----------------------  */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
window.agent = "mobile";
} else {
window.agent = "desktop";
}

// agent="mobile"

NProgress.configure({
    parent: '#main'
});

/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('timeize', function(options) {
    return new Handlebars.SafeString(moment(options.fn(this)).format('D.MMM.YYYY'));
});

Handlebars.registerHelper('indev', function(id,type, options) {
    if(dev == true){

        cid=doctorId(type,id)

        return '<span data-id="'+cid+'" class="glyphicon glyphicon-asterisk bt-getid" title="echo model id (dev only)"></span>'} else{return '';}
        });

/* -------------------------------------------------- HANDLEBARS END -----------------------  */
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
    opacity: .6,
    fillOpacity: 0.3,
    // cartodb_id: hit.get("cartodb_id").toString()
};
linenew = {
    fillColor: "#1288b9",
    color: "#1288b9",
    weight: 6,
    opacity: .8,
    // fillOpacity: 0.6,
    // cartodb_id: hit.get("cartodb_id").toString()
};
lineactive = {
    fillColor: "#fecd0b",
    color: "#fecd0b",
    weight: 8,
    opacity: 1,
    // fillOpacity: 0.6,
    // cartodb_id: hit.get("cartodb_id").toString()
};
lineseen = {
    fillColor: "#ffffff",
    color: "#ffffff",
    weight: 6,
    opacity: .6,
    // fillOpacity: 0.6,
    // cartodb_id: hit.get("cartodb_id").toString()
};
$(".leaflet-control-zoom").append('<a class="leaflet-control-zoomprevious glyphicon glyphicon-step-backward" href="#" title="Zoom to Previous"></a>');
$(".leaflet-control-zoom").append('<a class="leaflet-control-zoomfull glyphicon glyphicon-fullscreen" href="#" title="Zoom Way dafuk out"></a>');
window.appURL = new URL();
window.appEpisodes = new Episodes();
// window.appEpisodes = new Episodes();
window.appEpisodesView = new EpisodesView({
    collection: appEpisodes
});
// window.cbbItems = L.featureGroup()
//     // .on('click', function() { alert('Clicked on a group!'); })
//     .addTo(map);
/* -------------------------------------------------- BASEMAPS -----------------------  */
var baselayersdesk = {
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
            "name": "lichtenstein",
            "active": false,
            "source": "mapbox",
            "nom": "Katie Kowalsky's Pop Art (Inspored by Roy lichtenstein)",
            "thumb": "offline/mapbox-popart.png",
            // "thumb": "http://otile1.mqcdn.com/tiles/1.0.0/sat/3/4/2.png",
            "mapis": "dark",
            "definition": {
                "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                // "url": "http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png",
            // https://b.tiles.mapbox.com/v4/katiekowalsky.236692c1/10/292/391@2x.png?access_token=pk.eyJ1Ijoia2F0aWVrb3dhbHNreSIsImEiOiJHR2hfdlBNIn0.GUMLsSnT-SYx4ew7b77kqw
                "url": "https://{s}.tiles.mapbox.com/v4/katiekowalsky.236692c1/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1Ijoia2F0aWVrb3dhbHNreSIsImEiOiJHR2hfdlBNIn0.GUMLsSnT-SYx4ew7b77kqw",
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
        , {
            "name": "dummy",
            "active": false,
            "source": "localhost",
            "nom": "A Real Dummy",
            // "thumb": "offline/mapbox-mario.png",
            "thumb": "file:///Users/ccmiller/Sites/mstroke/src/images/2877247_jkms-25-888-g002.png",
            "mapis": "dark",
            "definition": {
                // "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                "url": "file:///Users/ccmiller/Sites/mstroke/src/images/2877247_jkms-25-888-g002.png",
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
        // , {
        //     "name": "opencycle_cycle",
        //     "active": false,
        //     "source": "opencycle",
        //     "nom": "OpenCycle",
        //     // "thumb": "http://a.tile.opencyclemap.org/cycle/4/8/4.png",
        //     "thumb": "offline/opencyclemap.png",
        //     "mapis": "light",
        //     "definition": {
        //         "maxZoom": 18,
        //         "subdomains": ["a", "b", "c"],
        //         "noWrap": true,
        //         "url": "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
        //     }
        // }
        , {
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

var baselayersmobile = {
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

    ]
}

if(agent=='mobile'){
    baselayers=baselayersmobile
}else{baselayers=baselayersdesk}

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
window.appCartoQueryView = new QueryView({
    model: appCartoQuery
});

window.appQuerySubNav = new QuerySubNav();
window.appQuerySubNavView = new QuerySubNavView({
    model: appQuerySubNav
});

window.appHider = new Hider();
window.appHiderView = new HiderView({
    model: appHider
});
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
// switch (dev) {   
//     case true:
//         window.appCBB = new CartoCollectionDev();       
//         break;   
//     default:
// }
        window.appBits = new BitCollection();
        window.appCBB = new CartoCollection();

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
window.appBitsView = new BitsView({
    collection: appBits
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
    message: "Console. Quasi-important messages will appear here."
});
window.appConsoleView = new ConsoleView({
    model: appConsole
});
// new activity model and view
window.appActivity = new Activity({message:"loading..."});
window.appActivityView = new ActivityView({
    model: appActivity
});
var recentsCollx = new RecentsCollection();
var recentsCollxView = new RecentsView({
    collection: recentsCollx
})
recentsCollx.fetch({
    success: function() {
        recentsCollxView.render()
    }
})
var huh = new Huh();
var huhV = new HuhView({
    model: huh
})
var minutiae = new Minutiae();
var minutiaeV = new MinutiaeView({
    model:minutiae
})
var method = new Method();
var methodV = new MethodView({
    model: method
})
/* -------------------------------------------------- Free Funcs -----------------------  */
    function locTrigger(e, goto) {
        e.preventDefault()
        if (typeof goto == 'undefined') {
            var goto = true
        }
        if (verbose == true) {
            console.log("in locTrigger");
        }
        var solrstring = $(e.currentTarget).attr("data-string")
        var markerid = solrstring.split(",")[1]
        appCartoQuery.set({
            rawstring: solrstring
        })
        appCartoQuery.set({
            rawstring: solrstring
        })
        appCartoQueryView.fire(goto)
        // appRoute.navigate(pullURL("#query"), {
        //     trigger: true,
        //     replace: true
        // })
        // appCBB.fetch({
        //     success: function(clx) {
        //         appCBBMapView.render()
        //         // cuz there's only gonna be one
        //         var markerid = clx.last().get("cartodb_id")
        //         appCBBListView.render().zoomfromexternal(markerid)
        //         pullURL("#query")
        //         // there will only be one cuz we searched by id
        //     }
        // })
    }

    function pullURL(goto) {
console.log("pullurl508");
        if (typeof goto == 'undefined') {
            // eh not great - we just troll the gui for the mainpanel that's currently showing - hope it's right!
            var hel = $(".mainpanel:not('.hidden')")
            var h = '#' + $(hel).attr("id")
            // e.g. nothing's been lit up before
            if (h == "#undefined") {
                h = "#huh"
            }
        } else {
            var h = goto;
        }
        var bbx = map.getBounds().toBBoxString();
        var qs = appCartoQuery.get("rawstring")
        var bl = appBaseLayers.findWhere({
            active: true
        }).get("name")
        var url = h + "/" + qs + "/" + bbx + "/" + bl
        console.log(url);
        return url
    }

    function processLeaf(m, pop, geom) {
        if(typeof pop == 'undefined'){
            var pop = true
        }
        if (geom == "point") {
            // points get their own style
            var activeStyle = markeractive
        } else {
            var activeStyle = lineactive
        }
        _.each(cbbItems._layers, function(i) {

            if (i.options.seen == true) {
                // feature clicks set them as seen - if they're set here, they're stale and we restyle them
                if (typeof i._point == 'undefined') {
                    // not a point, so
                    i.setStyle(lineseen)
                } else {
                    i.setStyle(markerseen)
                }
            }
            if (i.options.cartodb_id.toString() == m) {
                i.setStyle(activeStyle)
                i.options.seen = true;
                if (pop == true) {
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
// var solrfz = $.getJSON(solrhost+"cbb_carto/admin/luke?numTerms=0&wt=json&callback=?", {}, function(json, textStatus) {
//         console.log("json:");console.log(json);
//
var fields = {
    "fields": [{
        "order": 1,
        "name": "anno",
        "nom": "short annotation of the location -- e.g. 'one of Huell Howser's homes'",
        "scope_and_use": "use it freely, e.g. <span class='loc-trigger' data-string='anno:huell'><span class='loc-string'>anno:huell</span><i class='glyphicon glyphicon-map-marker cbb-marker-inline'></i></span> or <span class='loc-trigger' data-string='anno:cake+boss'><span class='loc-string'>anno:cake+boss</span><i class='glyphicon glyphicon-map-marker cbb-marker-inline'></i></span>"
    }, {
        "order": 5,
        "name": "cartodb_id",
        "nom": "unique id per site",
        "scope_and_use": "use it to link to a specific instance, e.g. <span class='loc-trigger' data-string='cartodb_id:108'><span class='loc-string'>cartodb_id:108</span><i class='glyphicon glyphicon-map-marker cbb-marker-inline'></i></span> - ~site of Bob Ducca's booth at the Silver Lake Farmers Market"
    }, {
        "order": 3,
        "name": "created_at",
        "nom": "date the location was logged (has nothing to do with its appearance on the show)",
        "scope_and_use": "I'm not sure anybody could possibly care. But I guess you could do Solr range queries with it."
    }, {
        "order": 0,
        "name": "name",
        "nom": "name of the site (e.g. 'Six Flags Valencia' or 'Boston, MA'",
        "scope_and_use": "this and anno are the primary fields and this is the one with the placename"
    }, {
        "order": 2,
        "name": "text",
        "nom": "catch-all field",
        "scope_and_use": "searching this field queries both anno and name fields (and eventually any other text we wanna throw in). If you don't type a specific field (e.g. you just type 'Dimello') this is the field that gets called."
    }, {
        "order": 4,
        "name": "updated_at",
        "nom": "date of the last update to this record",
        "scope_and_use": "Eh. You can <a href='#recent'>query for updates</a> with it I suppose."
    }]
}
window.appSoFoz = new SolrFieldz(fields.fields);
// appSoFoz.comparator = 'order';
window.appSoFozView = new SolrFieldzView({
    collection: appSoFoz
});
//         return json.fields
// });
// appSolrFieldz.fetch({
//     success:function(){
//         appSolrzView.render()
//     }
// },{reset:true});
// appActivity.set({message: "fetching Luke/Solr fields...",show: true,altel:false})
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

    // $(".leaflet-control a").each(function() {
    //     $(this).css("transform", "rotate(-90deg)")
    // });
    // $(".leaflet-control-container").appendTo("#wrapper").css("z-index", 88)
    // $("a.leaflet-control-zoom-in")
    $("#bt-solrfields").click(function(e) {
        e.preventDefault()
        $("#solrfields-list").toggleClass('hidden')
    }) //solrfields.click
    // oh one more thing - let's intercept the query tab button so it doesn't wipe out appcarto each time
    // $("html body header.site-header.off-canvas-container.js-off-canvas-container div.content-wrap.off-canvas-contents nav.site-nav.pull-left ul li a.link.active").click(function(e){
    // $("a[href='#query']").click(function(e){
    //     e.preventDefault();
    // appCartoQuery
    // var url = pullURL('#query');
    // appRoute.navigate(url, {trigger: true, replace: true})
    // })
                    appActivity.set({
                    message: "",
                    show: false,
                    altel: false
                })
    //
    //
}); //ready
$(document).keydown(function(e) {
    if (e.keyCode == 17) {
        // $("#main").toggleClass('hiddenish');
        // $("#bt-showmain").toggleClass("hidden")
        // $("#main").fadeToggle('fast');

        appHiderView.swap();


    }
});

/* -------------------------------------------------- STRAIGHT UP FUNCS -----------------------  */

function doctorId(type,id,updown){

    if(typeof updown =='undefined' || updown==null)
        {var updown="down"}

var cid = null
        switch(type) {
    case 'line':
    if(updown=="down"){cid=Number(id)/plierline} else {cid=Number(id)*plierline}
        break;
    case 'poly':
    if(updown=="down"){cid=Number(id)/plierpoly} else {cid=Number(id)*plierpoly}
        break;
    default:
        cid = Number(id);
}
return cid
}