var URL = Backbone.Model.extend({
    defaults: {
        // rawstring: "anno:huell*"
        // rawstring: 'california "huell howser" grove "paul f."'
    },
    urlstring: function() {
        // var currenturl+hash+query+bbox+basemap
        // return this.get("rawstring");
    }
});
var Huh = Backbone.Model.extend({});
var Method = Backbone.Model.extend({});
var Minutiae = Backbone.Model.extend({});
var RecentItem = Backbone.Model.extend({});
var RecentsCollection = Backbone.Collection.extend({
    model: RecentItem,
    url: function() {
        // return solrhost+"cbb_carto/select?json.wrf=cwmccallbackrecent&q=*:*&wt=json&sort=updated_at+desc&rows=10"
        return solrhost + "cbb_bits/select?json.wrf=cwmccallbackrecent&q=*:*&wt=json&sort=_id+desc&rows=10"
    },
    initialize: function(options) {
        options || (options = {});
        // if(verbose==true){console.log("initting RecentsCollection")}
        // this.query = options.query;
        return this.recents
    },
    comparator: function(c) {
        // console.log("m at models 29:");console.log(m);
        return -c.get('updated_at');
    },
    // parse: function(data) {
    //     // if(verbose==true){console.log("parsing data in parse of RecentsCollection")}
    //     var items = data.recents;
    //     // if(verbose==true){console.log("items in menuitemscollection");console.log(items);}
    //     return items;
    // },
    sync: function(method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallbackrecent';
        return Backbone.sync(method, collection, options);
    },
    parse: function(response) {
        return response.response.docs
    }
}); //recentscollx
/* -------------------------------------------------- EPISODES -----------------------  */
var Episode = Backbone.Model.extend({});
var Episodes = Backbone.Collection.extend({
    model: Episode,
    activeloc: null,
    // shouldn't do this, but...here we are
    verticaloffset: null,
    loctype: null,
    url: function() {
        // var aloc = Number(this.activeloc);
        // var locadj = aloc/999;
        // console.log("locadj:");console.log(locadj);
        // return solrhost+"cbb_bits/select?json.wrf=cwmccallback&q=location_id:"+this.activeloc+"+location_type:"+this.loctype+"&wt=json"
        if(this.loctype!=="_id"){
                return solrhost + "cbb_bits/select?json.wrf=cwmccallback&q=%2Blocation_id%3A\"" + this.activeloc + "\"+%2Blocation_type%3A\"" + this.loctype + "\"&wt=json"}
                else {
                    return solrhost + "cbb_bits/select?json.wrf=cwmccallback&q=%2B_id%3A\"" + this.activeloc + "\"&wt=json"
                }
    },
    initialize: function(options) {
        options || (options = {});
        return this.episodes
    },
    sync: function(method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    parse: function(response) {
        return response.response.docs
    }
}); //episodesdev
/* -------------------------------------------------- BASELAYERS -----------------------  */
var BaseLayer = Backbone.Model.extend({});
var BaseLayersCollection = Backbone.Collection.extend({
    model: BaseLayer,
    url: function() {
        return null
        return "js/models/layers.json"
    },
    initialize: function(options) {
        options || (options = {});
        return this.layers
    }
}); //recentscollx
/* -------------------------------------------------- CARTODB -----------------------  */
var CartoItem = Backbone.Model.extend({});
var BitItem = Backbone.Model.extend({});
var QuerySubNav = Backbone.Model.extend({
    defaults: {
        bits: null,
        locations: "active"
    },
    initialize: function(options) {
        options || (options = {});
        this.listenTo(this, "change", this.displaystring)
        return this
    }
}); //querysubnav
var State = Backbone.Model.extend({});
var States = Backbone.Collection.extend({
    // i dunno, maybe the dumbest model ever?
    model: State,
    url: null,
    initialize: function(options) {
        options || (options = {});
        // this.listenTo(this, "change", this.swap)
        // this.bind(this, "change", this.swap)
        return this
    }
}); //states
var CartoQuery = Backbone.Model.extend({
    defaults: {
        // rawstring: "+jesse",
        // displaystring: "jesse",
        // urlstring:'+jesse'
        rawstring: "+location_type:point",
        displaystring: "location_type:point",
        urlstring: '+location_type:point'
    },
    initialize: function(options) {
        options || (options = {});
        // this.listenTo(this.get("rawstring"), "change", this.setstrings)
        // this.bind(this, "change", "setstrings")
        this.on('change', this.setstrings, this);
        return this
    },
    //     setstrings: function() {
    // // console.log("changing displaystring...");
    // // here because we COULD do some manip at this point
    // // but right now we just pass it through
    //         var ss = this.get("rawstring")
    //         this.set({displaystring:ss})
    //         this.set({urlstring:ss})
    //         // if(ss == '' || ss == null){
    //         //     this.set({urlstring : "*:*"})
    //         // }
    //                 return this
    //     },
    setstrings: function() {
        // console.log("changing urlstring...");
        // here because we COULD do some manip at this point
        // but right now we just pass it through
        var ss = this.get("rawstring")
        if (ss == '' || ss == null) {
            this.set({
                urlstring: "*:*"
            })
            this.set({
                displaystring: ""
            })
        } else {
            this.set({
                urlstring: ss
            })
            this.set({
                displaystring: ss
            })
        }
        return this
    }
});
var BitCollection = Backbone.Collection.extend({
    model: BitItem,
    // host:window.host,
    url: function() {
        // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
        return solrhost + "cbb_bits/select?json.wrf=cwmccallback&wt=json&rows=100&sort=_id+desc&q=" + appCartoQuery.get("urlstring")
    },
    initialize: function(options) {
        options || (options = {});
        return this
    },
    deactivate: function() {
        if (verbose == true) {
            console.log("deactivating all bits models...");
        }
        // i don't know about this silent thing - could bite later
        this.invoke('set', {
            "active": false
        }, {
            silent: true
        });
        return this
    },
    activate: function() {
        this.deactivate()
        console.log("in bits activate, checking...");
        console.log("active global is:");
        console.log(activecouple);
        if (typeof activecouple !== 'undefined' && activecouple !== null) {
            console.log("we need to activate!");
            var activeid = activecouple.split(":")[1]
            var activetype = activecouple.split(":")[0]
                //
            _.each(this.models, function(d, index) {
                if (d.get("_id") == activeid) {
                    console.log("GOT ONE! Setting to true...");
                    d.set({
                        active: true
                    });
                    console.log(d);
                }
            });
        } //if global actives
        return this
    },
    sync: function(method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        // this.subfetch()
        return Backbone.sync(method, collection, options)
    },
    parse: function(resp) {
        if (verbose == true) {
            console.log("in custom parse of BitCollection")
        }
        window.respp = resp.response.docs
        var locsornot = _.partition(resp.response.docs, function(e) {
            return e.name == "Location";
        })
        var locsyes = locsornot[0];
        var locsno = locsornot[1];
        // bad design - i'm tightly coupling these two collections pull out location refs here
        //
        // var arr = [2,5,7]
        // // give it to CartoCollection
        // appCBB.seturl(arr)
        // appCBB.set(locsyes)
        var lids = [];
        // ok so there's prolly a nifty underscore thing to pull these ids out, but because we need to doctor them we might as well just loop
        _.each(locsyes, function(l, i) {
            var i = l.location_id
            var t = l.location_type
            var cid = doctorId(t, i, "up")
            lids.push(cid)
        });
        // var uids=_.unique(lids)
        appCBB.seturl(_.unique(lids))
            // console.log("locsornot0:");console.log(locsornot[0]);
            // console.log("locsornot1:");console.log(locsornot[1]);
            // return resp.response.docs
        return locsno
    }
}); //bitcollx
var CartoCollection = Backbone.Collection.extend({
    model: CartoItem,
    // host:window.host,
    url: function() {
        // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
        return solrhost + "cbb_carto/select?json.wrf=cwmccallback&wt=json&rows=100&q=" + this.cartostring
            // + this.cartostring
    },
    initialize: function(options) {
        // this.bind("change:active",this.activate);
        options || (options = {});
        return this
    },
    seturl: function(arr) {
        if (arr.length > 0) {
            this.cartostring = "cartodb_id:(" + encodeURIComponent(arr.join(" ")) + ")"
        } else {
            this.cartostring = "cartodb_id:(0)"
        }
        return this
    },
    queue: function(qmod) {
        var inid = qmod.get("cartodb_id").toString()
            // actually first silently deactivate the others
        _.each(_.reject(this.models, function(mod) {
            return mod.get("cartodb_id") == inid;
        }), function(mo) {
            mo.set({
                active: false
            }, {
                silent: true
            })
        }, this)
        var item = this.findWhere({
            "cartodb_id": inid
        });
        // this should fire any change active listeners
        item.set({
            active: true,
            queued: false
        })
        return this
    },
    deactivate: function() {
        if (verbose == true) {
            console.log("deactivating all cbb models...");
        }
        // i don't know about this silent thing - could bite later
        this.invoke('set', {
            "active": false
        }, {
            silent: true
        });
        return this
    },
    activate: function() {
        this.deactivate()
        console.log("in cartocollx activate, checking...");
        console.log("active global is:");
        console.log(activecouple);
        if (typeof activecouple !== 'undefined' && activecouple !== null) {
            console.log("we need to activate!");
            var activeid = activecouple.split(":")[1]
            var activetype = activecouple.split(":")[0]
                //
            _.each(this.models, function(d, index) {
                if (d.get("cartodb_id") == activeid && d.get("geom_type") == activetype) {
                    console.log("GOT ONE! Setting to true...");
                    d.set({
                        active: true
                    });
                    console.log(d);
                }
            });
        } //if global actives
        // if(typeof activecouple !== 'undefined'){
        //     var aid = activecouple.split(":")[1]
        //     var atype = activecouple.split(":")[0]
        // // var actv = this.findWhere({cartodb_id: aid,geom_type:type})
        // console.log("id is type:");console.log(typeof aid);
        // // var actv = this.find(function(m) { return m.get('cartodb_id') == id; });
        // var search_obj = {};
        // search_obj["cartodb_id"] = aid;
        // search_obj["geom_type"] = atype;
        // var actv =this.findWhere(search_obj);
        // console.log("in cbb activate, actv:");console.log(actv);
        // if(actv.get("active")!== "true"){
        //     console.log("model not currently active (shouldn't be), activating...");
        // actv.set({active:true})}
        // }
        return this
    },
    sync: function(method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        options.jsonpCallback = 'cwmccallback';
        return Backbone.sync(method, collection, options);
    },
    parse: function(response) {
        var docs = response.response.docs
        return docs
    }
}); //livecarto
// var CartoCollectionDev = Backbone.Collection.extend({
//     model: CartoItem,
//         host:window.host,
//         seturl: function(arr){
// this.cartostring = "location_id:("+encodeURIComponent(arr.join(" "))+")"
// console.log(this.url());
// return this
//     },
//     url: function() {
//         // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
//         return solrhost+"cbb_carto/select?json.wrf=cwmccallback&rows=100&wt=json&q=" + this.cartostring
//     },
//     comparator: function(m) {
//     return -m.get('active');
// },
//     initialize: function(options) {
//         options || (options = {});
//         this.bind('change queued', this.queue, this);
//         return this
//     },
//     queue: function(qmod) {
//         var inid = qmod.get("cartodb_id").toString()
//         // actually first silently deactivate the others
//         _.each(_.reject(this.models, function(mod) {
//             return mod.get("cartodb_id") == inid;
//         }), function(mo) {
//             mo.set({
//                 active: false
//             }, {
//                 silent: true
//             })
//         }, this)
//         var item = this.findWhere({
//             "cartodb_id": inid
//         });
//         // this should fire any change active listeners
//         item.set({
//             active: true,
//             queued: false
//         })
//         return this
//     },
//     sync: function(method, collection, options) {
//         // By setting the dataType to "jsonp", jQuery creates a function
//         // and adds it as a callback parameter to the request, e.g.:
//         // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
//         // If you want another name for the callback, also specify the
//         // jsonpCallback option.
//         // After this function is called (by the JSONP response), the script tag
//         // is removed and the parse method is called, just as it would be
//         // when AJAX was used.
//         options.dataType = "jsonp";
//         options.jsonpCallback = 'cwmccallback';
//         return Backbone.sync(method, collection, options);
//     },
//     parse: function(response) {
//         // console.log("rsponse at 261:");console.log(response);
//         return response.response.docs
//     }
// }); //fakecarto
/* -------------------------------------------------- BASEMAP -----------------------  */
var BaseMap = Backbone.Model.extend({
    defaults: {
        bbox_west: -154,
        bbox_south: -9,
        bbox_east: 22,
        bbox_north: 77,
        thumburl: ''
    },
    initialize: function() {
        window.map = new L.Map('map', {
            zoomControl: false,
            center: [42.22852, -99.05273],
            zoom: 4,
            attributionControl: false
        });
        return this
    },
    getBounds: function() {
        var southWest = new L.LatLng(this.get("bbox_south"), this.get("bbox_west"));
        var northEast = new L.LatLng(this.get("bbox_north"), this.get("bbox_east"));
        var bounds = new L.LatLngBounds(southWest, northEast);
        return bounds;
    }
});
/* -------------------------------------------------- CONSOLE -----------------------  */
var Console = Backbone.Model.extend({
    defaults: {
        message: "Console Console. Helpful stuff like -- the 'ctrl' key will toggle the main pane."
    }
});
/* -------------------------------------------------- ACTIVITY -----------------------  */
var Activity = Backbone.Model.extend({
    defaults: {
        message: null,
        show: false
    }
});
/* -------------------------------------------------- POPUP -----------------------  */
var Popup = Backbone.Model.extend({
    defaults: {}
});
/* -------------------------------------------------- WIKIAZ
kind of an unfornuate offline bootstrapping call to previously-downloaded wikiaz content just so we can have full epi titles on hand
-----------------------  */
var Wikia = Backbone.Model.extend({
    defaults: {}
});
var Wikiaz = Backbone.Collection.extend({
    model: Wikia,
    url: function() {
        return "offline/wikiaz.json"
    },
    initialize: function(options) {
        options || (options = {});
        return this.items
    },
    parse: function(response) {
        return response.items
    }
}); //wikiaz
/* -------------------------------------------------- LUKE/SOLR FIELDS -----------------------  */
var SolrField = Backbone.Model.extend({
    defaults: {}
});
var SolrFieldz = Backbone.Collection.extend({
    model: SolrField,
    url: function() {
        // return "offline/solrz.json"
        return null
    },
    comparator: function(m) {
        return m.get('order');
    },
    initialize: function(options) {
        options || (options = {});
        this.models = fields;
        return this
    },
}); //solrfields