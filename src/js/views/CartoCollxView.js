var CartoCollxView = Backbone.View.extend({
    events: {
        // "click .bt.marker": 'stageeps',
        // "click .bt-cartoobj-episodes": 'stageeps'
    },
    initialize: function() {
        // this.collection.bind('change', this.debug, this);
        this.listenTo(this.collection, 'reset', this.render);
        // this.listenTo(this.collection, "change", this.render);
        return this
            // .render()
    },
    fit: function() {
        map.fitBounds(cbbItems.getBounds())
        return this
    },
    render: function() {

        appActivity.set({
            message: "preparing map objects..."
        })
        cbbItems.clearLayers();
        this.collection.each(function(hit, i) {
            // var gjraw = hit.get("the_geom_gj");
            var hitTemplate = Handlebars.templates['hitMarkerViewTpl']
            var pu = hitTemplate(hit.toJSON());
            // if(hit.get("active")==true){
            // var mstyle=markerseen
            // } else {
            // var mstyle = markernew
            // }
            // var hitloc = hit.get("loc")
            // Create a new Wicket instance
            // var wkt = new Wkt.Wkt();
            // Read in any kind of WKT string
            // wkt.read(hit.get("the_geom"));
            // var geomtype = wkt.type
            var geomtype = hit.get("geom_type")
            var hitm = {
                "type": "Feature",
                "properties": {
                    "name": hit.get("name"),
                    // "active":hit.get("active"),
                    "cartodb_id": hit.get("cartodb_id"),
                    "geom_type": hit.get("geom_type"),
                    "anno": hit.get("anno"),
                    "created_at": hit.get("created_at"),
                    "updated_at": hit.get("updated_at")
                },
                "geometry": $.parseJSON(hit.get("the_geom"))
                    // hit.get("the_geom")
            };
            // .get("the_geom");
            // console.log("hitm:");console.log(hitm);
            if (geomtype == "point") {
                // var hitll = wkt.toObject().getLatLng()
                // var hitm = L.circleMarker(hitll, markernew)
                var activeStyle = markernew
                var foot = L.geoJson(hitm, {
                        seen: false,
                        cartodb_id: hit.get("cartodb_id"),
                        pointToLayer: function(feature, latlng) {
                            return L.circleMarker(latlng, activeStyle);
                        }
                    })

                foot.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                        // first mark it seen
                        var stale = _.find(cbbItems._layers, function(i) {
                            return i.options.seen == true
                        });
                        processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                     -----------------------  */
                        p.model = hitm.properties
                        puFactory(p)
                    })
                    //on popup
                    // var seenStyle = markerseen
            } else {
                // var hitm = wkt.toObject().setStyle(linenew)
                var activeStyle = linenew
                    // var zoomer = hitm.coordinates
                    // var seenStyle = lineseen
                    // console.log("hitll:");console.log(hitll);
                var foot = L.geoJson(hitm, {
                    seen: false,
                    cartodb_id: hit.get("cartodb_id"),
                    style: activeStyle
                })
                foot.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                        var stale = _.find(cbbItems._layers, function(i) {
                            return i.options.seen == true
                        });
                        processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                     -----------------------  */
                        p.model = hitm.properties
                        puFactory(p)
                    }) //on popup

                // var hitm = L.multiPolyline(hitll, linenew);
            }

            if (hit.get("active" == "true")) {

                console.log("active hit! we'll pop its popup...");
                console.log(foot);
                    foot.openPopup()
                }
            // if (this.collection.length == 1) {
            //     cbbItems.openPopup()
            // }

            foot.on("popupopen",function(p){

activecouple = activeFactory(hit.get("geom_type") + ":" + hit.get("cartodb_id"))
        appCBB.activate();

            }) //.on

            // var hitm = wkt.toObject().addTo(cbbItems).on("click", function(m) {
            // var hitm = L.circleMarker(hitll, mstyle).addTo(cbbItems).on("click", function(m) {
            // console.log("hitm just after bindpopu:");console.log(hitm);
            // hitm.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
            //     var stale = _.find(cbbItems._layers, function(i) {
            //         return i.options.seen == true
            //     });
            //     processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
            // });
            if (typeof hitm.options == 'undefined') {
                hitm.options = {
                    cartodb_id: null
                }
            }
            hitm.options.cartodb_id = hit.get("cartodb_id").toString()
                // var count = this.collection.length;
                // if (hit.get("active") == true || count == 1) {
                // if (map.getBounds().contains(hitm.getLatLng()) == false) {
                //     map.setView(hitm.getLatLng(), 9);
                // }
                // hitm.zoomTo()
                // }
        }, this);
        // appActivity.set({
        //     message: null,
        //     show: false
        // })
        appActivityView.stfu()
        return this.fit()
    }
});