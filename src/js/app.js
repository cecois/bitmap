verbose = true;
$(".leaflet-control-zoom").append('<a class="leaflet-control-zoomprevious glyphicon glyphicon-step-backward" href="#" title="Zoom to Previous"></a>');
$(".leaflet-control-zoom").append('<a class="leaflet-control-zoomfull glyphicon glyphicon-fullscreen" href="#" title="Zoom Way dafuk out"></a>');
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

// new console model and view
window.appConsole = new Console().set({
    // message: "HINT! Press the 'z' key at any time to reveal the full map."
    message: "This is your console. Quasi-important messages will appear here."
});
window.appConsoleView = new ConsoleView({
    model: appConsole
});


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
        "mapis":"light",
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
        "mapis":"dark",
        "definition": {
            "subdomains": ["otile1", "otile2", "otile3", "otile4"],
            "maxZoom": 18,
            "url": "http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png",
            "noWrap": true
        }
    }, {
        "name": "super_mario",
        "active": true,
        "source": "mapbox",
        "nom": "Duncan Graham's Super Mario",
        "thumb": "offline/mapbox-mario.png",
        // "thumb": "http://otile1.mqcdn.com/tiles/1.0.0/sat/3/4/2.png",
        "mapis":"light",
        "definition": {
            "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            // "url": "http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png",
            "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
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
        "mapis":"light",
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
        "mapis":"dark",
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
        "mapis":"dark",
        "definition": {
            "id": "toner",
            "url": null
        }
    }, {
        "name": "stamen_watercolor",
        "active": false,
        "nom": "Stamen Watercolor",
        "source": "stamen",
        "thumb": "offline/stamen-watercolor.jpg",
        // "thumb": "http://tile.stamen.com/watercolor/12/655/1583.jpg",
        "mapis":"light",
        "definition": {
            "id": "watercolor",
            "url": null
        }
    }]
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
// window.appCarto = new FakeCartoCollection(mods);
// window.appCarto = new CartoCollection(mods);
// window.appCarto = new CartoCollection();
var CartoDB = Backbone.CartoDB({
        user: 'pugo' // you should put your account name here
                       // YOURUSER.cartobd.com
    });

var CBBCollx= CartoDB.CartoDBCollection.extend({
        table: 'cbb_point', //public table
        // format: 'geoJSON',
        columns: {
            'name': 'name',
            'the_geom':'the_geom',
            // 'lat':'st_y(the_geom)',
            // 'lng': 'st_x(the_geom)'
            'anno':'anno'
        }
        ,
        sql: function() {
        return "select name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj from cbb_point "
        // +appCartoQuery.get("wherestring");
    }
    });


/* -------------------------------------------------- INITS -----------------------  */
// window.appCBBCarto = new CBBCollx();
window.appCBBCarto = new FakeCartoCollection();

// appCBBCarto.fetch();
appCBBCarto.bind('reset', function() {

    
    //  appCBBCarto.each(function(p) {
    //     console.log(p.get('name'));
    //     console.log(p);
    // });
});

window.appCartoPlainView = new CartoPlainView({collection:appCBBCarto})
window.appCartoView = new CartoCollxView({collection:appCBBCarto})

appCBBCarto.fetch({
    success:function(){
        appCartoPlainView.render();
        appCartoView.render();
    }})

// appCBBCarto.fetch(
// {success:function(){
// console.log("in success of appCBBCarto fetch");
// var appCartoPlainView = new CartoPlainView({collection:appCBBCarto})
// var appCartoView = new CartoCollxView({collection:appCBBCarto})
    
    
// }
// });


// window.appCarto = Carto.CartoDBCollection.extend({
//         table: 'cbb_point', //public table
//         columns: {
//             'name': 'name',
//             'location': 'the_geom'
//         },
//         sql: function() {
//         return "select * from "+table+" "+appCartoQuery.get("wherestring");
//     }
//     });

        

/* -------------------------------------------------- Free Funcs -----------------------  */




/* -------------------------------------------------- RUN! -----------------------  */

cbbItems = L.geoJson().addTo(map);
// honestly not sure why i gotta chain the render here, but there it is :-/
// if(typeof appCBBFake !== 'undefined')
// appCBBFake.fetch({
//     success:function(){
//         appCartoPlainView.render();
//         appCartoView.render();
//     }})



/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {
    $(".leaflet-control a").each(function() {
        $(this).css("transform", "rotate(-90deg)")
    });
    $(".leaflet-control-container").appendTo("#wrapper").css("z-index", 88)
    $("a.leaflet-control-zoom-in")



}); //ready

$(document).keydown(function(e) {
        if (e.keyCode == 18) {
            $("#main").fadeToggle('fast');
            appConsole.set({"message":"press the 'alt' key to toggle better visibility of the map"})

        }
    });