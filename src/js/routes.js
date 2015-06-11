var Route = Backbone.Router.extend({
    routes: {
        // "": "default",
        // ":hash": "default",
        // docs/:section(/:subsection)
        // ":hash(/:q)(/:bbox)": "default",
        "(:hash)(/:q)(/:bbox)(/:basemap)(/:activeid/:activetype)(/)": "default"
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
        var url = pullURL(el)
        // console.log("appcartoquery at 25 here:");console.log(appCartoQuery.get("rawstring"));
        this.navigate(url, {
            trigger: false,
            replace: false
        })
    },
    default: function(h, q, bbox, basemap,activeid,activetype) {
        if (typeof basemap !== 'undefined' && basemap !== null) {
            var inbl = appBaseLayers.findWhere({
                "name": basemap
            })
            inbl.set({
                active: true
            })
        }
        if (typeof q !== 'undefined' && q !== null) {
            // console.log("incoming q is:"+q);
            appCartoQuery.set({
                rawstring: q
            })
        }
        if (typeof h == 'undefined' || h == null) {
            h = "query";
        }
        var hmod = "#" + h;
        // this in case the pane had been hidden by the hider

        // appHider.set({collapsed:"true",fromwhom:""})

        // $("#main").removeClass("hidden")
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


        // now if *that* didn't set up our query, something needs to
        // console.log("rawstring at 47 of route");
        // console.log(appCartoQuery.get("rawstring"));
        // }
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


             appCBB.fetch({
                reset:true,
                // dataType: "jsonp"
                success: function() {
                    // console.log("successful fetch of appcbb at 76");
                    // appCBBListView.render()
                    // appCBBMapView.render()
                    // appCBBCountView.render()
                },
                error: function() {
                    appConsole.set({
                        message: "query errored out"
                    })
                    // actually, if it's a true error we wanna be more forthcoming:
                    appActivity.set({
                        message: "",
                        show: false
                    })
                    // console.log("failed fetch");
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

            //             appCBB.fetch({
            //     // dataType: "jsonp"
            //     success: function() {
            //         // console.log("successful fetch of appcbb at 76");
            //         appCBBListView.render()
            //         appCBBMapView.render()
            //         appActivity.set({
            //             message: "",
            //             show: false,
            //             altel: false
            //         })
            //     },
            //     error: function() {
            //         appConsole.set({
            //             message: "query errored out"
            //         })
            //         // actually, if it's a true error we wanna be more forthcoming:
            //         $("#querylist-carto").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
            //         appActivity.set({
            //             message: "",
            //             show: false,
            //             altel: false
            //         })
            //         // console.log("failed fetch");
            //     }
            // }, {
            //     reset: true
            // })

if(typeof activeid !== 'undefined' && typeof activetype !== 'undefined'){
// appCBB.activate(activeid,activetype)
    appCBBListView.pulleps("route")
}



        } //h is query for fetch

// if((typeof localStorage.getItem("activelocid") !== 'undefined' || localStorage.getItem("activelocid") !== 'undefined') && (typeof localStorage.getItem("activeloctype") !== 'undefined' || localStorage.getItem("activeloctype") !== 'undefined')){

// WTF is going on here? Well,

// var act = appCBB.where({active: true})

// console.log("act:");
//     console.log(act);

// if(act.length<1){

//     // hot one coming in -- prolly activated before a Backbone.navigate op
//     var locid = act.attributes.cartodb_id
//     var loctype = act.attributes.geom_type
//     var so = "pu"
//     appCBBListView.pulleps(locid,loctype,so)
// } else {
//     console.log("no act");
// }

// }
// localStorage.setItem("activeloctype",loctype))

        // var hmod = "#" + h;
        // // this in case the pane had been hidden by the alt key
        // $("#main").removeClass("hidden")
        // _.each($("#main > .mainpanel"), function(p) {
        //     if (p.id == h) {
        //         $(p).removeClass("hidden")
        //     } else {
        //         $(p).addClass("hidden")
        //     }
        // });
        // _.each($("nav.site-nav > ul > li > a"), function(m) {
        //     if ($(m).attr("href") == hmod) {
        //         $(m).addClass("active")
        //     } else {
        //         $(m).removeClass("active")
        //     }
        // }, this)
        return this
    } // end home
});
var appRoute = new Route();
Backbone.history.start();