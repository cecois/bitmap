var Route = Backbone.Router.extend({
    routes: {
        // "": "default",
        // ":hash": "default",
        // docs/:section(/:subsection)
        // ":hash(/:q)(/:bbox)": "default",
        "(:hash)(/:q)(/:bbox)(/:basemap)(/:activecouple)(/)": "default"
        // ":hash": "routepractice"
        // "home": "home",
        // "about": "about",
        // "search/lll:hash": "searchWithHashed",
        // "search/p:page/:querystring": "search"
    },
    initialize: function() {
        // this.listenTo(appCartoQuery, "change", this.update)
    },
    update: function(el) {
        // console.log("update of route cuzza appcartoquery change trigger ");
        // console.log("el is:");
        // console.log(el);
        var url = urlFactory(el)
        // console.log("appcartoquery at 25 here:");console.log(appCartoQuery.get("rawstring"));
// this.navigate(url, {
//     trigger: false,
//     replace: false
// })
    },
    default: function(h, q, bbox, basemap,activecouple) {

/*
Tried to not do this, but it does kinda make sense to make the active mod a global. Otherwise we have to pass it to BitCollection first, and then *further* on to CartoCollx since Carto gets filled *after* the custom parse of bits.
 */

window.activecouple=activecouple

// if(typeof activecouple !== 'undefined' && activecouple !== null){
//     window.activeid = activecouple.split(":")[1]
//     window.activetype = activecouple.split(":")[0]
// }


        if (typeof basemap !== 'undefined' && basemap !== null) {
            var inbl = appBaseLayers.findWhere({
                "name": basemap
            })
            inbl.set({
                active: true
            })
        }
        if (typeof q !== 'undefined' && q !== null) {
            console.log("q existed, setting appcartoquery to q, which is");
            console.log(q);
            appCartoQuery.set({
                rawstring: q
            })
        }
        if (typeof h == 'undefined' || h == null) {
            h = "query";
        }
        var hmod = "#" + h;
        
        _.each($("#main > .mainpanel"), function(p) {
            if (p.id == h) {
                $(p).removeClass("hidden")
            } else {
                $(p).addClass("hidden")
            }
        });
        _.each($("nav.site-nav > ul > li > a"), function(m) {
            if ($(m).attr("href") == hmod) {
                $(m).addClass("active")
            } else {
                $(m).removeClass("active")
            }
        }, this)

        if (typeof bbox !== 'undefined' && bbox !== null && bbox !== "null") {
            // #returnto to clean this up
            var asarr = bbox.split(",");
            var bbwest = asarr[0];
            var bbsouth = asarr[1];
            var bbeast = asarr[2];
            var bbnorth = asarr[3];
            var southwest = []
            southwest.push(Number(bbsouth))
            southwest.push(Number(bbwest))
            var northeast = []
            northeast.push(Number(bbnorth))
            northeast.push(Number(bbeast))
            var bboxarr = []
            bboxarr.push(southwest)
            bboxarr.push(northeast)
            map.fitBounds(bboxarr);
        }
        if (h == 'query') {
            // a live one, this, let's fire off the query
            // sloppy #returnto - we just don't want that arrow showing with no episodes present
            $(".episodes-arrow").addClass('hidden')
            // console.log("a live query hash!");
            this.update("#query")
            // appActivity.set({
            //     message: "querying...",
            //     show: true,
            //     altel: "#querylist-carto"
            // })
            appActivity.set({
                message: "querying bits...",
                show: true,
                // altel: "#activity-default"
            })

            appBits.fetch({
                reset:true,
                // dataType: "jsonp"
                success: function() {

                    // i can't for the life of me get that view to bind to this collection's events - dunno
                    // appBitsView.render()
                    // appBitsCountView.render()

console.log("success cb of appBits fetch - maybe we wont do appcbb fetch here after all?");

             appCBB.fetch({
                reset:true,
                success: function(collx) {

// if(verbose == true){
//     console.log("in route's appCBB fetch (a success callback fun from Bits.fetch, the result of #query)");
// }

// // here's where if we have an activecouple incoming (one of the query results that are supposed to be highlighted/popped up) we set that on our end
// if(typeof activecouple !== 'undefined' && activecouple !== null){
//     var activeid = activecouple.split(":")[1]
//     var activetype = activecouple.split(":")[0]

// // findWhere wz failing here weirdly but consistently btw
// var actv = collx.models.find(function(m){return (m.get("geom_type")==activetype && m.get("cartodb_id")==activeid);});

// // now it's possible we didn't find it - feasibly one could manually pass an active model that isn't returned by the query
// // we don't wanna bomb out here so we conditionalize it (silently for now)
// if(typeof actv !== 'undefined'){
// actv.set({active:true})
// collx.set(actv)}

// // this.activate(activeid,activetype)
//     // appCBBListView.pulleps("route")
// } else {
//     appConsole.set({message:"The feature passed in as 'active' (highlighted) wasn't returned by the query - a rare thing."})
// }

// if(collx.length==1){
//     // also set it to active
// var actv = collx.models[0];

// actv.set({active:true})
// collx.set(actv)
// }


//                     // console.log("successful fetch of appcbb at 76");
//                     // appCBBListView.render()
//                     // appCBBMapView.render()
//                     // appCBBCountView.render()
//                 },
//                 error: function() {
//                     appConsole.set({
//                         message: "query errored out"
//                     })
//                     // actually, if it's a true error we wanna be more forthcoming:
//                     appActivity.set({
//                         message: "",
//                         show: false
//                     })
//                     // console.log("failed fetch");
                }
            })

                }, //success fetch
                error: function() {
                    appConsole.set({
                        message: "query errored out"
                    })
                    // actually, if it's a true error we wanna be more forthcoming:
                    $("#querylist-carto").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                    $("#querylist-bits").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                    appActivity.set({
                        message: "",
                        show: false,
                        altel: false
                    })
                    // console.log("failed fetch");
                }
            })

        } //h is query for fetch

        return this
    } // end home
});
var appRoute = new Route();
Backbone.history.start();