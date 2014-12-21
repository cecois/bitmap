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

var FakeCartoCollection = Backbone.Collection.extend({
    model: CartoItem,
    url: function() {
        // return "offline/cbb_point.json"
        return "offline/fake_cartodb_resp.json"
    },
    initialize: function(options) {
        options || (options = {});
        return this
    },
    parse: function(data) {
        
        _.each(data.rows,function(row,i){
console.log("i:");console.log(i);
console.log("row:");console.log(row);
row.id=i;
        })

        // console.log("in response of FakeCarto, data and data.rows are...");
        // console.log( data)
        // console.log( data.rows)
        
        return data.rows
    }
}); //fakecarto

var CartoQuery = Backbone.Model.extend({
    defaults: {
        wherestring: "WHERE anno LIKE 'Huell%'"
    }
});
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