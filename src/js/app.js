/* -------------------------------------------------- GLOBALS -----------------------  */

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    window.agent = "mobile";
} else {
    window.agent = "desktop";
}

// window.thedomain="trainertothestarsseekingstars.org"
window.thedomain="bitmap-lbones.rhcloud.com"

// agent="mobile"

NProgress.configure({
    parent: '#main'
});

/* -------------------------------------------------- HANDLEBARS START -----------------------  */
Handlebars.registerHelper('debug', function(options) {

    if(verbose==true){
        console.log("debug hb:");
        console.log(this);
    }
    return new Handlebars.SafeString("check console");
});

Handlebars.registerHelper('timeize', function(options) {
    // return new Handlebars.SafeString(moment(options.fn(this)).format('D.MMM.YYYY'));
    return new Handlebars.SafeString(moment(options.fn(this)).format('YYYY.MMM.D'));
});

Handlebars.registerHelper('indev', function(id,type, options) {
    if(dev == true){

        cid=doctorId(type,id)

        return '<span data-id="'+cid+'" class="glyphicon glyphicon-asterisk bt-getid" title="echo model id (dev only)"></span>'} else{return '';}
    });

Handlebars.registerHelper('urler', function(str,options) {



  // return options.fn(this);
});

/* -------------------------------------------------- HANDLEBARS END -----------------------  */
// jeez i hate to bootstrap this w/ an extra ajax call but i don't wanna have to remember to update this when i change the solr schema
// $.getJSON(solrhost+'/cbb_bits/admin/luke?numTerms=0', {wt: 'json'}, function(json, textStatus) {
//   console.log("fields call:");console.log(json);
// });
markernew = {
    radius: 6,
    // fillColor: "#1288b9",
    fillColor: "rgba(126, 223, 216, 100)",
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
    // fillColor: "#1288b9",
    fillColor: "rgba(126, 223, 216, 100)",
    // color: "#1288b9",
    color: "rgba(126, 223, 216, 100)",
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
// $(".leaflet-control-zoom").append('<a class="leaflet-control-zoomprevious glyphicon glyphicon-step-backward" href="#" title="Zoom to Previous"></a>');
// $(".leaflet-control-zoom").append('<a class="leaflet-control-zoomfull glyphicon glyphicon-fullscreen" href="#" title="Zoom Way dafuk out"></a>');
//
// new activity model and view
window.appActivity = new Activity({message:"loading..."});
window.appActivityView = new ActivityView({
    model: appActivity
});

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
var baselayersdummified = {
    "layers": [{
        "name": "dummy",
        "active": true,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "offline/dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "offline/dummy-thumb.png",
            "noWrap": true
        }
    },{
        "name": "dummy",
        "active": false,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "offline/dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "offline/dummy-thumb.png",
            "noWrap": true
        }
    }]
}
var baselayersdesk = {
    "layers": [{
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
    },
    {
        "name": "pencil",
        "active": true,
        "source": "mapbox",
        "nom": "Aj Ashton's Pencil Map",
        "thumb": "offline/mapbox-pencil.png",
        "mapis": "dark",
        "definition": {
            "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A",
            "noWrap": true
        }
    }
        // , {
        //     "name": "space_station_earth",
        //     "active": false,
        //     "source": "mapbox",
        //     "nom": "Eleanor Lutz' Space Station Earth",
        //     "thumb": "offline/mapbox-spacestation.png",
        //     // "thumb": "https://b.tiles.mapbox.com/v4/examples.3hqcl3di/4/4/6@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
        //     "mapis": "dark",
        //     "definition": {
        //         "subdomains": ["a", "b", "c"],
        //         "maxZoom": 18,
        //         "url": "https://{s}.tiles.mapbox.com/v4/examples.3hqcl3di/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
        //         // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
        //         "noWrap": true
        //     }
        // }
        // , {
        //     "name": "pencil",
        //     "active": false,
        //     "source": "mapbox",
        //     "nom": "Aj Ashton's Pencil Map",
        //     "thumb": "offline/mapbox-pencil.png",
        //     // "thumb": "https://a.tiles.mapbox.com/v4/examples.a4c252ab/6/18/26@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
        //     "mapis": "dark",
        //     "definition": {
        //         "subdomains": ["a", "b", "c"],
        //         "maxZoom": 18,
        //         "url": "https://{s}.tiles.mapbox.com/v4/examples.a4c252ab/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q",
        //         // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
        //         "noWrap": true
        //     }
        // }
        // , {
        //     "name": "dummy",
        //     "active": true,
        //     "source": "localhost",
        //     "nom": "A Real Dummy",
        //     "thumb": "offline/dummy-thumb.png",
        //     "mapis": "dark",
        //     "definition": {
        //         "maxZoom": 18,
        //         "url": "offline/dummy-thumb.png",
        //         "noWrap": true
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
        }
        // , {
        //     "name": "stamen_toner",
        //     "active": false,
        //     "nom": "Stamen Toner",
        //     "source": "stamen",
        //     "thumb": "offline/stamen-toner.png",
        //     // "thumb": "http://c.tile.stamen.com/toner/10/163/395.png",
        //     "mapis": "dark",
        //     "definition": {
        //         "id": "toner",
        //         "url": null
        //     }
        // }
        // , {
        //     "name": "stamen_watercolor",
        //     "active": false,
        //     "nom": "Stamen Watercolor",
        //     "source": "stamen",
        //     "thumb": "offline/stamen-watercolor.jpg",
        //     // "thumb": "http://tile.stamen.com/watercolor/12/655/1583.jpg",
        //     "mapis": "light",
        //     "definition": {
        //         "id": "watercolor",
        //         "url": null
        //     }
        // }
        ]
    }

    var baselayersmobile = {
        "layers": [{
            "name": "pencil",
            "active": true,
            "source": "mapbox",
            "nom": "Aj Ashton's Pencil Map",
            "thumb": "offline/mapbox-pencil.png",
            "mapis": "dark",
            "definition": {
                "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                "url": "https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A",
                "noWrap": true
            }
        }, {
            "name": "dummy",
            "active": false,
            "source": "localhost",
            "nom": "A Real Dummy",
            "thumb": "offline/dummy-thumb.png",
            // "thumb": "file:///Users/ccmiller/Sites/mstroke/src/images/2877247_jkms-25-888-g002.png",
            "mapis": "dark",
            "definition": {
                // "subdomains": ["a", "b", "c"],
                "maxZoom": 18,
                "url": "offline/dummy-thumb.png",
                // "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
                "noWrap": true
            }
        }
        ]
    }

    if(dev==true){
        baselayers=baselayersdummified
    // baselayers=baselayersmobile
    // baselayers=baselayersdesk
} else {

    if(agent=='mobile'){
        baselayers=baselayersmobile
    }else{baselayers=baselayersdesk}}

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


window.appConsole = new Console().set({
    // message: "HINT! Press the 'z' key at any time to reveal the full map."
    message: "Console. Quasi-important messages will appear here."
});
window.appConsoleView = new ConsoleView({
    model: appConsole
});

window.appQuerySubNav = new QuerySubNav();
window.appQuerySubNavView = new QuerySubNavView({
    model: appQuerySubNav
});


var states = [{
    "name": "main",
    "posish": "open",
    "visible":true
}, {
    "name": "episodes",
    "posish": "open",
    "visible":true
}, {
    "name": "banner-bang",
    "posish": "open",
    "visible":true
}

]

// https://twitter.com/intent/tweet?url=<url to tweet>&text=<text to tweet>&hashtags=<comma separated list of hashtags, with no # on them>
// http://some.url.com/?text=&url=http://data.gov&via=ZapStraightToIt&hashtags=comedybangbang
// https://twitter.com/intent/tweet?url=http://data.gov&text=&hashtags=deleteme

var shares = [

{"id":"social-twitter",
"href":"https://twitter.com/share",
"page.title":null,
"page.url":null,
"tip":"share on Twitter",
"hashtags":null,
"copy":null
}
// ,
// {"id":"social-facebook",
// "href":"http://some.url.com",
// "page.title":null,
// "page.url":null,
// "tip":"share on FaceBook"
// },
// {"id":"social-google",
// "href":"http://some.url.com",
// "page.title":null,
// "page.url":null,
// "tip":"share on Google+"
// }

]

window.appStates = new States(
    states
    );
window.appStatesView = new StatesView({
    collection: appStates
});

window.appShares = new Shares(
    shares
    );
window.appSharesView = new SharesView({
    collection: appShares
});

/* -------------------------------------------------- INITS -----------------------  */

window.appBits = new BitCollection();
window.appCBB = new CartoCollection();
window.appRecents = new RecentsCollection();


window.appCBBListView = new CartoListView({
    collection: appCBB
})
window.appBitsView = new BitsView({
    collection: appBits
})
window.appBitsCountView = new BitsCountView({
    collection: appBits
})
window.appBitsRecentsView = new RecentsView({
    collection: appRecents
})
window.appCBBMapView = new CartoCollxView({
    collection: appCBB
})
window.appCBBCountView = new CartoCollxCountView({
    collection: appCBB
})

// window.appFat = new MetaFacet();
window.appFats = new MetaFacets();
window.appFatTags = new FacetsTags();
window.appFatSlugs = new FacetsSlugs();
window.appFatNames = new FacetsNames();
window.aFTV = new FacetsView({collection:appFatTags,el:$("#facet-tags")})
aFTV.group="Tags"
// aFTV.el=$("#facet-tags")
window.aFNV = new FacetsView({collection:appFatNames,el:$("#facet-names")})
aFNV.group="Bits"
// aFNV.el=$("#facet-names")
window.aFSV = new FacetsView({collection:appFatSlugs,el:$("#facet-slugs")})
aFSV.group="Episodes"

var huh = new Huh();
var huhV = new HuhView({
    model: huh
})

var ups = new Update();
var upsV = new UpdateView({
    model: ups
})

var help = new Help();
var helpV = new HelpView({
    model: help
})

var method = new Method();
var methodV = new MethodView({
    model: method
})

// appCartoQueryView.fire(false)

/* -------------------------------------------------- Free Funcs -----------------------  */
function locTrigger(e, goto, active) {
    if(verbose==true){
        console.log("loctriggered!")
        console.log("e:");
        console.log(e)
        console.log("goto:");
        console.log(goto)
        console.log("active:");
        console.log(active)
    }

    if(typeof e !== 'undefined' && e !== null){
        e.preventDefault()}

        if (typeof goto == 'undefined') {
            var goto = true
        }

// var qstring="*:*"

if(typeof active !== 'undefined'){
    if(active.indexOf("point:")>=0 || active.indexOf("poly:")>=0 || active.indexOf("line:")>=0){
        var loctype = active.split(":")[0]
            // var locid = active.split(":")[1]
            var locid = doctorId(loctype,active.split(":")[1]);
            activeFactory(active)
            qstring = "location_type:"+loctype+" AND location_id:"+locid
        // appCartoQuery.set({rawstring:qstring})
    } else {
        qstring = $(e.currentTarget).attr("data-string")
    }
    appCartoQuery.set({rawstring:qstring})
}


        // var markerid = solrstring.split(",")[1]

// $("#query-form-input").val(solrstring)

        // appCartoQuery.set({
        //     rawstring: solrstring
        // })
// appCartoQuery.set({
//     rawstring: solrstring
// })
// appCartoQueryView.fire(goto)
        // appRoute.navigate(urlFactory("#query"), {
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

    function activeFactory(a){

        if(typeof a == 'undefined' || a == null){

            if(typeof activecouple !== 'undefined' && activecouple !== null){
                var activeid = activecouple.split(":")[1]
                var activetype = activecouple.split(":")[0]

                return [activetype,activeid]}
                else {
                    return null
                }
            } else {
                activecouple=a
                return a
            }

        }

        function urlFactory(goto,qs) {
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

        var qs = appCartoQuery.get("urlstring")
        var bl = appBaseLayers.findWhere({
            active: true
        }).get("name")
        var fa = appCartoQuery.get("facetarray").join(",");

        var url = h + "/" + qs + "/" + bbx + "/" + bl 

        if(typeof activecouple !== 'undefined' && activecouple !== null){
            var ac = activeFactory();

// url+=activetype + ":" + activeid
url+="/"+ac.join(":")

// now that the activecoupe is set (or nulled) let's finish it off w facets


}
// url+="/"+fa
        // if(typeof activeid !== 'undefined' && typeof activeid !== null && typeof activetype !== 'undefined' && typeof activetype !== null){
            // }

            return url
        }

        function captureState(){

            // eh not great - we just troll the gui for the mainpanel that's currently showing - hope it's right!
            var hel = $(".mainpanel:not('.hidden')")
            var h = '#' + $(hel).attr("id")
            var bbx = map.getBounds().toBBoxString();
            var qs = encodeURIComponent(appCartoQuery.get("urlstring"))
            var bl = appBaseLayers.findWhere({
                active: true
            }).get("name")

        // var fa = appCartoQuery.get("facetarray").join(","); //da OG
        var fa = encodeURIComponent(appCartoQuery.get("facetarray").join(","));


        if(typeof activecouple !== 'undefined' && activecouple !== null){
            var ac = activeFactory();

            acv=ac.join(":")

        } else {
            acv="noactive"
        }
        var url = "http://" + thedomain+ "/"+ h + "/" + qs + "/" + bbx + "/" + bl +"/"+acv+"/"+fa
        // if(typeof activeid !== 'undefined' && typeof activeid !== null && typeof activetype !== 'undefined' && typeof activetype !== null){
            // }

            return url

        }

        function processLeaf(mid, pop, geom, zoomto) {

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
            if (i.options.cartodb_id.toString() == mid) {
                i.setStyle(activeStyle)
                i.options.seen = true;

                if (pop == true) {
                    i.openPopup()
                }

                if(zoomto==true){
                    map.fitBounds(i.getBounds())
                }

            }
        }) //each
    }
    /* -------------------------------------------------- RUN! -----------------------  */
    cbbItems = L.geoJson().addTo(map);
    window.appWikiaz = new Wikiaz()
    appWikiaz.fetch();
    appRecents.fetch({reset:true});
// var solrfz = $.getJSON(solrhost+"cbb_carto/admin/luke?numTerms=0&wt=json&callback=?", {}, function(json, textStatus) {
//         console.log("json:");console.log(json);
//
var fields = {
    "fields": [{
        "order": 1,
        "name": "anno",
        "nom": "short annotation of the location -- e.g. 'one of Huell Howser's homes'",
        "scope_and_use": "use it freely, e.g. <span class='copy-trigger' data-string='anno:huell'><span class='loc-string'>anno:huell</span><i class='glyphicon glyphicon-map-marker cbb-trigger-inline'></i></span> or <span class='copy-trigger' data-string='anno:cake+boss'><span class='loc-string'>anno:cake+boss</span><i class='glyphicon glyphicon-map-marker cbb-trigger-inline'></i></span>"
    }, {
        "order": 5,
        "name": "cartodb_id",
        "nom": "unique id per site",
        "scope_and_use": "use it to link to a specific instance, e.g. <span class='copy-trigger' data-string='cartodb_id:108'><span class='loc-string'>cartodb_id:108</span><i class='glyphicon glyphicon-map-marker cbb-trigger-inline'></i></span> - ~site of Bob Ducca's booth at the Silver Lake Farmers Market"
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
/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {

    $("#bt-solrfields").click(function(e) {
        e.preventDefault()
        $("#solrfields-list").toggleClass('hidden')
    }) //solrfields.click

    L.control.zoom({position:'topright'}).addTo(map)
    new L.HistoryControl().addTo(map);

    appActivityView.stfu()

    //
}); //ready
$(document).keydown(function(e) {
    if (e.keyCode == 17) {

        appStatesView.swap();


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
function cwmccallback(){
    if(verbose==true){console.log("breaker breaker")}
        if(verbose==true){console.log("------> (generic) cwmccallback")}
    }

function puFactory(p){
    /* -------
    this receives one-time fires of popup events and completely wipes their guts, replacing them with...well, the same thing cept it's all bound up in Backbone goodness
    ---- */

    // first grab the pu's container node
    var nel = p.popup._contentNode

    // and since the p obj has been affixed with the original leaflet object's model ("model") we just pass it along like so
// but also we affix the leaflet id of the feature so we can close this mofo later (among other ops maybe)
var pm = new Popup(p.model).set({leafletid:p.layer._leaflet_id});
var pv = new PopupView({model:pm,el: nel})

}

// function subactivateFacets(arr,group){

// console.log("IN SUBactivate of metafacets");
// console.log("group is:");console.log(group);

// var fakearr = []
// appCartoQuery.get("facetarray").forEach(function(f){

//     var match = arr.findWhere({0: 'Chip Gardner'})

//     console.log("match:");
//     console.log(match);
//     // if(_.contains(aFTV.collection.models, f)){

//     // fakearr.push(f)
//     // } else {
//     //     fakearr.push(['NOF'])
//     // }
// });

// return arr

// }
// function puForecloser(p){

//     // first grab the pu's container node
//     var nel = p.popup._contentNode

//     console.log(p);

// console.log("nel:");
// console.log(nel);
//     // and since the p obj has been affixed with the original leaflet object's model ("model") we just pass it along like so
//     var pm = new Popup(p.model);
//     var pv = new PopupView({model:pm,el: nel})
// }
// 
$(document).ready(function() {
// appCartoQuery.set({rawstring:"chupa*"})
// appCartoQueryView.fire()

});