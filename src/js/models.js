var Huh = Backbone.Model.extend({});
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
var BaseLayersCollection = Backbone.Collection.extend({
    model: RecentItem,
    url: function() {
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
        return "offline/cbb_point.json"
    },
    initialize: function(options) {
        options || (options = {});
        return this
    },
    parse: function(data) {
        // console.log("in response of FakeCarto, data and data.rows are...");
        // console.log( data)
        // console.log( data.rows)
        
        return data.rows
    }
}); //fakecarto

var CartoQuery = Backbone.Model.extend({
    defaults: {
        sqlstring: "SELECT * FROM cbb_point"
    }
});
var CartoCollection = Backbone.Collection.extend({
    initialize: function() {
        
        return this
    }
});
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