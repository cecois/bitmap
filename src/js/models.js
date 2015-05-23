
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
        return solrhost+"cbb_carto/select?json.wrf=cwmccallbackrecent&q=*:*&wt=json&sort=updated_at+desc&rows=100"
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
    loctype: null,
    url: function() {
        // var aloc = Number(this.activeloc);
        // var locadj = aloc/999;
        // console.log("locadj:");console.log(locadj);
        // return solrhost+"cbb_bits/select?json.wrf=cwmccallback&q=location_id:"+this.activeloc+"+location_type:"+this.loctype+"&wt=json"
        return solrhost+"cbb_bits/select?json.wrf=cwmccallback&q=%2Blocation_id%3A\""+this.activeloc+"\"+%2Blocation_type%3A\""+this.loctype+"\"&wt=json"
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
        // if(verbose==true){console.log("initting RecentsCollection")}
        // this.query = options.query;
        return this.layers
    }
    //       ,
    //     parse: function(data) {
    //         // if(verbose==true){console.log("parsing data in parse of RecentsCollection")}
    //     var items = data.recents;
    //         // if(verbose==true){console.log("items in menuitemscollection");console.log(items);}
    // return items;
    // }
}); //recentscollx
/* -------------------------------------------------- CARTODB -----------------------  */
var CartoItem = Backbone.Model.extend({});
// var CBBCollx = Backbone.Collection.extend({
// model: CartoItem,
//     url: function() {
//         // return "offline/cbb_point.json"
//         return "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%2Cname%2Canno%2CST_AsGeoJSON(the_geom)%20as%20the_geom_gj%2Ccreated_at%2Cupdated_at%20from%20cbb_point%20WHERE%20anno%20LIKE%20%27Huell%25%27&callback=jQuery211022427363438226922_1419124391932&_=1419124391933"
//     },
//     initialize: function(options) {
//         options || (options = {});
//         return this
//     },
//     parse: function(data){
// console.log("in parse of 59");
// console.log(data);alk
// return data.rows
//     }
// }) //CBBCollx
var CartoQuery = Backbone.Model.extend({
    defaults: {
        rawstring: "*:*",
        solrstring: "*:*"
        // rawstring: 'california "huell howser" grove "paul f."'
    },
        initialize: function(options) {
        options || (options = {});
        this.listenTo(this, "change", this.solrstring)
        return this
    },
    solrstring: function() {

// here because we COULD do some manip at this point
// but right now we just pass it through
        var ss = this.get("rawstring")

        this.set({solrstring:ss})
        // return this.get("rawstring");
        return ss
    }
    
});
var CartoCollection = Backbone.Collection.extend({
    model: CartoItem,
    host:window.host,
    url: function() {
        // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
        return "http://solr-lbones.rhcloud.com/cbb_carto/select?json.wrf=cwmccallback&wt=json&rows=100&q=" + appCartoQuery.get("solrstring")
    },
    initialize: function(options) {
        options || (options = {});
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
}); //livecarto
var CartoCollectionDev = Backbone.Collection.extend({
    model: CartoItem,
        host:window.host,
    url: function() {
        // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
        return "http://localhost:8983/solr/cbb_carto/select?json.wrf=cwmccallback&rows=100&wt=json&q=" + appCartoQuery.solrstring()
    },
    comparator: function(m) {
    return -m.get('active');
},
    initialize: function(options) {
        options || (options = {});
        this.bind('change queued', this.queue, this);
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
        // console.log("rsponse at 261:");console.log(response);
        return response.response.docs
    }
}); //fakecarto

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
        return this;
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
        message: "Console Console. Helpful stuff like -- the 'z' key will toggle the main pane."
    }
});
/* -------------------------------------------------- ACTIVITY -----------------------  */
var Activity = Backbone.Model.extend({
    defaults: {
        message: "Activity Console: wuzzup as it happens.",
        show:false
    }
});
/* -------------------------------------------------- WIKIAZ 
kind of an unfornuate offline bootstrapping call to previously-downloaded wikiaz content just so we can have full epi titles on hand
-----------------------  */
var Wikia = Backbone.Model.extend({
    defaults: {
    }
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
    defaults: {
    }
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
// sync: function(method, collection, options) {
//         // By setting the dataType to "jsonp", jQuery creates a function
//         // and adds it as a callback parameter to the request, e.g.:
//         // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
//         // If you want another name for the callback, also specify the
//         // jsonpCallback option.
//         // After this function is called (by the JSONP response), the script tag
//         // is removed and the parse method is called, just as it would be
//         // when AJAX was used.
//         options.dataType = "jsonp";
//         options.jsonpCallback = 'solrfieldzcallback';
//         return Backbone.sync(method, collection, options);
//     },
//     parse: function(response) {
//         console.log("response in parse");
//         console.log(response);
//         return response.fields
//     }
}); //solrfields