var Huh = Backbone.Model.extend({});
var Method = Backbone.Model.extend({});
var RecentItem = Backbone.Model.extend({});
var RecentsCollection = Backbone.Collection.extend({
    model: RecentItem,
    url: function() {
        return "../api/recentitems.json"
    },
    initialize: function(options) {
        options || (options = {});
        // if(verbose==true){console.log("initting RecentsCollection")}
        // this.query = options.query;
        return this.recents
    },
    parse: function(data) {
        // if(verbose==true){console.log("parsing data in parse of RecentsCollection")}
        var items = data.recents;
        // if(verbose==true){console.log("items in menuitemscollection");console.log(items);}
        return items;
    }
}); //recentscollx
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
        rawstring: "anno:huell*"
        // rawstring: 'california "huell howser" grove "paul f."'
    },
    solrstring: function(){

return this.get("rawstring");

    },
    wherestring: function() {
        // HERE WE PUT SOME RUDIMENTARY PARSING OF KEYWORDS/QUOTED STRINGS/PLUSES/MINUSES
        // ALL OTHER WORDS WILL BE SPACE-SLICED AND ANDED TOGETHER
        // IF WE NEED MORE THAN THAT WE'LL MOVE TO SOLR
        var raw = this.get("rawstring")
        // first check for the WHERE flag:
        if (raw.indexOf('WHERE') == 0) {
            return raw
        } else {
            var quosYes = this.pullQuosYes(raw)
            var quosNo = this.pullQuosNo(raw)

            console.log("quosYes:");
            console.log(quosYes);
            console.log("quosNo:");
            console.log(quosNo);
            
            return quos.join(" AND ")
        }
    },
    pullQuosYes: function(str) {
        var quosYes = []
        XRegExp.forEach(str, /"[^\"]*"/, function(match, i) {
            quosYes.push(match[0])
            //quos.push(+match[0]);
        }, []);
        return quosYes
    },
    pullQuosNo: function(str) {
        var quosNo = []
        XRegExp.forEach(str, /-"[^\"]*"/, function(match, i) {
            quosNo.push(match[0])
            //quos.push(+match[0]);
        }, []);
        return quosNo
    },
    ready: function() {
        return encodeURIComponent(this.wherestring())
    }
});
var LiveCartoCollection = Backbone.Collection.extend({
    model: CartoItem,
    url: function() {
        // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
        return "http://solr-lbones.rhcloud.com/cbb/select?json.wrf=cwmccallback&wt=json&q=" + appCartoQuery.solrstring()
    },
    initialize: function(options) {
        options || (options = {});
        return this
    },
    sync: function(method, collection, options) {
        console.log("collection:");console.log(collection);
        console.log("options:");console.log(options);
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
        console.log("in parse of live..., data:");
        console.log(response);
        return response.response.docs
    }
}); //livecarto
var FakeCartoCollection = Backbone.Collection.extend({
    model: CartoItem,
    url: function() {
        // return "https://pugo.cartodb.com/api/v1/sql?q=select cartodb_id,name,anno,ST_AsGeoJSON(the_geom) as the_geom_gj,created_at,updated_at from cbb_point " + appCartoQuery.ready()
        return "http://localhost:8983/solr/cbb/select?json.wrf=cwmccallback&wt=json&q=" + appCartoQuery.solrstring()
    },
    initialize: function(options) {
        options || (options = {});
        this.bind('change queued', this.queue, this);
        return this
    },
    queue: function(qmod){

var inid = qmod.get("cartodb_id").toString()

// actually first silently deactivate the others
 _.each(_.reject(this.models, function(mod){ return mod.get("cartodb_id") == inid;}), function(mo){
mo.set({active:false},{silent:true})
 }, this)
        
        var item = this.findWhere({"cartodb_id":inid});

// this should fire any change active listeners
        item.set({active:true,queued:false})

return this

    },
    sync: function(method, collection, options) {
        console.log("collection:");console.log(collection);
        console.log("options:");console.log(options);
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
        console.log("in parse of live..., data:");
        console.log(response);
        return response.response.docs
    }
}); //fakecarto
// var CartoCollection = Backbone.Collection.extend({
//     model:CartoItem,
//     initialize: function() {
//         // init a cartodb obj
//         // var sql = new cartodb.SQL({ user: 'pugo' });
//         return this
//     },
//     sql: function(){
// return new cartodb.SQL({ user: 'pugo' });
//     },
//     fetch:function(){
// var sql = this.sql();
// sql.execute("SELECT cartodb_id,name,anno,st_y(the_geom) as lat, st_x(the_geom) as lon FROM cbb_point "+appCartoQuery.get("wherestring"))
//   .done(function(data) {
//     console.log(data.rows);
//     // _.each(data.rows,function(r){
//     //     console.log(r);
//     // })
//     this.collection = data.rows
//   })
//   .error(function(errors) {
//     // errors contains a list of errors
//     console.log("errors:" + errors);
//   })
//   return this
//     }
// });
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
        message: "Hi, I'm Console. The 'z' key will toggle the main pane."
    }
});