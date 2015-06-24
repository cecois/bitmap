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
    initialize: function() {},
    update: function(el) {
        var url = urlFactory(el)
    },
    default: function(h, q, bbox, basemap, activecouple) {
            /*
            Tried to not do this, but it does kinda make sense to make the active mod a global. Otherwise we have to pass it to BitCollection first, and then *further* on to CartoCollx since Carto gets filled *after* the custom parse of bits.
             */
            window.activecouple = activecouple
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
            // now we are sure there's an h there's this universal, what *panelizer*? anyway we can position lotsa window elements at once
            appStatesView.prebaked(h)
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
                // $(".episodes-arrow").addClass('hidden')
                this.update("#query")
                appActivity.set({
                    message: "querying bits..."
                })
                appBits.fetch({
                    reset: true,
                    success: function(c) {
                        // var len = c.find(==)"Location"
                        appActivity.set({
                            message: "sniffing for locations..."
                        })
                        var le = _.countBy(c.models, function(mo) {
                            return mo.get("name") == "Location"
                        });
                        if(typeof le.true !== 'undefined' && le.true !== null){
                                                appActivity.set({
                                                    message: "pulling out locations..."
                                                })
                                                appCBB.fetch({
                                                    reset: true,
                                                    success: function(collx) {
                                                        if (typeof activecouple !== 'undefined' && activecouple !== null) {
                                                            collx.activate();
                                                            appCBBListView.pulleps()
                                                        }
                                                        appActivityView.stfu()
                                                    }
                                                })
                                            } //if Locations check
                                            else {

                                                appActivity.set({
                                                    message: "no locations in result, nothing to map"
                                                })

                                            }
                    }, //success fetch - bits
                    error: function() {
                        appConsole.set({
                                message: "query errored out"
                            })
                            // actually, if it's a true error we wanna be more forthcoming:
                        $("#querylist-carto").append("<li style='margin-top:50px;font-size:1.2em;'>QUERY ERRORED OUT, SRY</li>")
                        $("#querylist-bits").append("<li style='margin-top:50px;font-size:1.2em;'>QUERY ERRORED OUT, SRY</li>")
                            // appActivity.set({
                            //         message: "",
                            //         show: false,
                            //         altel: false
                            //     })
                            // console.log("failed fetch");
                    }
                })
            } //h is query for fetch
            return this
        } // end home
});
var appRoute = new Route();
Backbone.history.start();