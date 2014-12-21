/* -------------------------------------------------- MIV
-------------------------------*/
var RecentItemView = Backbone.View.extend({
    tagName: "li",
    template: Handlebars.templates['recentItemViewTpl'],
    // className: "fi-social-instagram",
    // className: function(){return this.model.get("icon")},
    events: {
        "change": "render",
        // "click": function() {
        //     appRoute.navigate(this.model.get("url"), {
        //         trigger: true,
        //         replace: true
        //     })
        // }
    } //events
    ,
    initialize: function() {
        // console.log("rim:");
        // console.log(this.model);
        return this.render()
    },
    // ,className:"general foundicon-plus"
    render: function() {
        if (verbose == true) {
            // console.log("rendering recentitemview")
        }
        $(this.el).html(this.template(this.model.toJSON()));
        return this
    }
});
/* -------------------------------------------------- MIsV
-------------------------------*/
var RecentsView = Backbone.View.extend({
    // tagName: "li",
    el: ".recents",
    initialize: function() {
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('change active', this.render, this);
        return this.render()
    },
    render: function() {
        if (verbose == true) {
            // console.log("rendering recentsview")
            // console.log(this.collection)
        }
        this.collection.each(function(recentitem) {
            if (verbose == true) {
                // console.log("gonna render the recentitemview")
            }
            var thisRecentItemView = new RecentItemView({
                model: recentitem
            });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            $(this.el).append(thisRecentItemView.render().el
                // "recent item will go here"
            );
        }, this);
        return this
    }
});
/* -------------------------------------------------- CartoDBs
-------------------------------*/
var CartoCollxView = Backbone.View.extend({
    // markerTemplate:Handlebars.templates['hitMarkerViewTpl'],
    initialize: function() {
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change", this.render);
        return this
        // .render()
    },
    render: function() {
        cbbItems.clearLayers();
        this.collection.each(function(hit, i) {
            // var gjraw = hit.get("the_geom_gj");
            
            var markerTemplate = Handlebars.templates['hitMarkerViewTpl']
            var pu = markerTemplate(hit.toJSON());
            
            // var pu = this.markerTemplate(hit.toJSON());
            var gj = $.parseJSON(hit.get("the_geom_gj"))
            var markerseen = {
                radius: 5,
                fillColor: "#ffffff",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.2
            };
            var markernew = {
                radius: 7,
                fillColor: "#000",
                color: "#ffffff",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6
            };
            var geojson = L.geoJson(gj, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, markernew);
                }
                
                ,
                options:{id :hit.get("id")}
            }).addTo(cbbItems).on("click",function(m){

console.log("this");
console.log(this);
console.log("m");
console.log(m);
                hit.set({active:true});
                this.setStyle(markerseen)
            }).bindPopup(pu);
        });
        return this
    }
});
var CartoPlainView = Backbone.View.extend({
    // tagName: "li",
    el: "#query-list",
    // events:{
    //     "change":'render'
    // },
    template: Handlebars.templates['cartoPlainView'],
    initialize: function() {
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change", this.render);
        // this.listenTo(this.model, "change", this.render);
        // this.collection.bind('change', this.render, this);
        return this
        // .render()
    },
    debug: function() {
        console.log("debug cpv signifies change event!");
    },
    rewire: function() {
        $('#query-list').liveFilter("#query-livefilter", 'li', {
            filterChildSelector: 'div'
        });
        $('.bt-cartoobj').tooltip({
            container: 'body',
            placement: 'right',
            trigger: 'hover'
        })
        return this
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering cartoplain")
            console.log(this.collection)
        }
        // as good a place as any -- if we're firing here then the arto material changed
        appConsole.set({
            // message: "queried <a href='http://cartodb.com'>CartoDB</a> with: <code>" + appCartoQuery.get("sqlstring") + "</code>"
            message: "queried <a href='http://cartodb.com'>CartoDB</a> with: <code>" + appCartoQuery.get("wherestring") + "</code>"
        });
        // notice we are wrapping the collection in rows: cuz cartodb does it
        $(this.el).html(this.template({
            rows: this.collection.toJSON()
        }));
        return this.rewire()
    }
});
/* -------------------------------------------------- AbtV
-------------------------------*/
var HuhView = Backbone.View.extend({
    // tagName: "li",
    el: "#huh",
    template: Handlebars.templates['home'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    render: function() {
        // $(this.el).empty();
        // $(this.el).html(
        //     "<div class='content-wrap'><h1>Guh.</h1></div>");
        // this.collection.each(function(menuitem) {
        //     if (verbose == true) {
        // console.log("gonna render the menuitemview")
        //     }
        //     var thisMenuItemView = new MenuItemView({
        //         model: menuitem
        //     });
        $(this.el).html(this.template(this.model.toJSON()))
        // }, this);
        return this
    }
});
/* -------------------------------------------------- Method
-------------------------------*/
var MethodView = Backbone.View.extend({
    // tagName: "li",
    el: "#method",
    template: Handlebars.templates['method'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    render: function() {
        // $(this.el).empty();
        // $(this.el).html(
        //     "<div class='content-wrap'><h1>Guh.</h1></div>");
        // this.collection.each(function(menuitem) {
        //     if (verbose == true) {
        // console.log("gonna render the menuitemview")
        //     }
        //     var thisMenuItemView = new MenuItemView({
        //         model: menuitem
        //     });
        $(this.el).html(this.template(this.model.toJSON()))
        // }, this);
        return this
    }
});
/* -------------------------------------------------- BMV -----------------------  */
var BaseLayerMenuItemView = Backbone.View.extend({
    tagName: "li",
    className: "span1",
    template: Handlebars.templates['baseLayerMnuItem'],
    events: {
        "click .mnuThumbnail": "setActive",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    initialize: function() {
        // this.model.bind("change", this.render, this);
    },
    debug: function() {
        console.log(this);
        return this
    },
    killtt: function() {
        // we need to be sure we kill any active tooltips
        // $(this.el).find("a").tooltip('destroy');
    },
    setActive: function() {
        // first a little sugar
        // $("#BaseMapConsole").css("color","white").animate(1500)
        if (this.model.get("active") == true) {
            // it's already active, do nothing
            return this
        } else {
            // voodoo? let's verify this works
            _.invoke(appBaseLayers.models, function() {
                this.set({
                    active: false
                }, {
                    silent: true
                })
            });
            this.model.set({
                active: true
            })
            appConsole.set({
                message: "basemap switched to " + this.model.get("nom")
            })
            return this
        }
        // return this
    },
    setBaseMap: function() {
        // the clicked one becomes active 
        // (noting that the collx will post-process this to deactivate the others)
        this.model.set({
            "active": true
        });
        var newBLayer = this.model;
        appBaseMap.set(newBLayer);
    },
    render: function() {
        this.killtt();
        $(this.el).html(this.template(this.model.toJSON()));
        return this.rewire()
    },
    rewire: function() {
        this.$("a").tooltip({
            container: "#mnuBaseMap",
            placement: 'top',
            trigger: 'hover'
        });
        // this.$(".tooltip").css("top","-140px");
        // this.$(" > .tooltip").css("top","-140px")
        return this
    }
});
var BaseLayersMenuView = Backbone.View.extend({
    tagName: "ul",
    el: "#mnuBaseMap",
    events: {
        // "click .mnuThumbnail":"process",
        // "click a":"killtt",
        // "click a":"rewire"
        // "change": "render"
    },
    // className : "mnuThumbnails",
    initialize: function() {
        this.collection.bind('change:active', this.render, this);
        this.render()
    },
    render: function() {
        // console.log("in render of BLsMV");
        $(this.el).empty();
        // var baselayerTrue = _.find(this.collection.models, function(lay) {
        //     // lay.get("active")==true ? function(){return lay} : function(){return null};
        //     if (lay.get("active") == true) {
        //         return lay
        //     }
        // });
        // if (typeof appBaseMap == 'undefined') {
        //     // we gonna need one of these...
        //     appBaseMap = new BaseMap(baselayerTrue)
        //     if (typeof appBaseMapView == 'undefined') {
        //         appBaseMapView = new BaseMapView({
        //             model: appBaseMap
        //         })
        //     }
        // } else {
        // }
        // appBaseMap.set(baselayerTrue)
        // var bltDef = baselayerTrue.get("definition")
        this.collection.each(function(baselayer) {
            var baseLayerMenuItemView = new BaseLayerMenuItemView({
                model: baselayer
            });
            $(this.el).append(baseLayerMenuItemView.render().el);
        }, this);
        return this.rewire()
    },
    rewire: function() {
        console.log("render of BLMV");
        // $("#BaseMapConsole").html(this.model.get("nom"))
        // #returnto -- use underscore to pull this from the collx
        // $("#mnuBaseMap").attr("title",this.title)
        $("#mnuBaseMap").tooltip()
        $("#BaseMapConsole").html($(".mnuThumbnail.true").attr("title"))
        // 
        this.$(".mnuThumbnail").hover(function() {
            $("#BaseMapConsole").addClass("temp")
            $("#BaseMapConsole").html(this.title)
        }, function() {
            /* Stuff to do when the mouse leaves the element */
            // $("#BaseMapConsole").html(og)
            $("#BaseMapConsole").removeClass("temp")
            // $("#BaseMapConsole").html(_.findWhere(this.collection,model.get("active")==true));
            $("#BaseMapConsole").html($(".mnuThumbnail.true").attr("title"));
        }, this);
        return this
    },
    process: function(amodel) {
        //A model was toggled (on or off)
        if (amodel.get('active') == true) {
            //A model was toggled ON, so check if a different model is already selected
            var nonActive = this.collection.find(function(model) {
                return amodel !== model && model.get('active');
            });
            if (nonActive != null) {
                //Another model was selected, so toggle it to off
                nonActive.set({
                    'active': false
                });
            }
        }
    } //process
});
var BaseLayersView = Backbone.View.extend({
    // tagName: "ul",
    id: 'map',
    // el: "#mnuBaseMap",
    events: {
        // "click .mnuThumbnail":"process",
        // "click a":"killtt",
        // "click a":"rewire"
        // "change": "render"
    },
    // className : "mnuThumbnails",
    initialize: function() {
        window.map = new L.Map(this.id, {
            zoomControl: false,
            center: [42.22852, -99.05273],
            zoom: 4,
            attributionControl: false
        });
        this.collection.bind('change:active', this.render, this);
        this.render()
    },
    render: function() {
        if (typeof baseLayer == 'undefined') {
            baseLayer = null;
        } else {
            map.removeLayer(baseLayer);
        }
        // get the active layer's def
        var aldef = this.collection.findWhere({
            'active': true
        }).get("definition")
        if (aldef.subdomains != undefined) {
            baseLayer = new L.TileLayer(aldef.url, {
                subdomains: aldef.subdomains,
                maxZoom: 18
            });
        } else {
            baseLayer = new L.TileLayer(aldef.url, {
                maxZoom: 18
            });
        }
        map.addLayer(baseLayer);
        baseLayer.bringToBack();
        // $(this.el).empty();
        // var baselayerTrue = _.find(this.collection.models, function(lay) {
        //     // lay.get("active")==true ? function(){return lay} : function(){return null};
        //     if (lay.get("active") == true) {
        //         return lay
        //     }
        // });
        // if (typeof appBaseMap == 'undefined') {
        //     // we gonna need one of these...
        //     appBaseMap = new BaseMap(baselayerTrue)
        //     if (typeof appBaseMapView == 'undefined') {
        //         appBaseMapView = new BaseMapView({
        //             model: appBaseMap
        //         })
        //     }
        // } else {
        // }
        // appBaseMap.set(baselayerTrue)
        // var bltDef = baselayerTrue.get("definition")
        // this.collection.each(function(baselayer) {
        //     var baseLayerMenuItemView = new BaseLayerMenuItemView({
        //         model: baselayer
        //     });
        //     $(this.el).append(baseLayerMenuItemView.render().el);
        // }, this);
        return this
        // .rewire()
    }
});
/* -------------------------------------------------- BASEMAPVIEW -----------------------  */
var BaseMapView = Backbone.View.extend({
    id: "map",
    initialize: function() {
        // this.updateBaseMap();
        // this.model.bind("change", this.updateBaseMap, this);
        // this.listenTo(this.model, "change", this.debug);
        // this.model.bind("change:bbox_west change:bbox_south change:bbox_east change:bbox_north", this.render, this);
        // this.render();
        return this
        // .updateBaseMap()
    },
    debug: function() {
        console.log("debug bmv 338:");
        console.log(this.model);
        return this
    },
    render: function() {
        var mapBounds = this.model.getBounds();
        // map.fitBounds(mapBounds);
        return this
        // .zoomCheck()
    },
    zoomCheck: function() {
        var def = this.model.get("definition");
        if (typeof def.minZoom != "undefined") {
            map.setZoom(def.minZoom)
        }
    },
    updateBaseMap: function() {
        var def = this.model.get("definition");
        // remove global layer here first so we don't keep stacking baselayers
        // (we only need one baselayer at a time, of course)
        if (typeof baseLayer == 'undefined') {
            baseLayer = null;
        } else {
            map.removeLayer(baseLayer);
        }
        // a little special handling for stamen maps
        if (this.model.get("source") == "stamen") {
            baseLayer = new L.StamenTileLayer(def.id);
            appConsole.set({
                message: "FYI, some of the Stamen layers have zoom restrictions."
            })
        } else if (def.subdomains != undefined) {
            baseLayer = new L.TileLayer(def.url, {
                subdomains: def.subdomains,
                maxZoom: 18
            });
        } else {
            baseLayer = new L.TileLayer(def.url, {
                maxZoom: 18
            });
        }
        map.addLayer(baseLayer);
        baseLayer.bringToBack();
        return this
        // .zoomCheck()
    }
});
/* -------------------------------------------------- CONSOLEVIEW -----------------------  */
var ConsoleView = Backbone.View.extend({
    el: $("#consoleContainer"),
    template: Handlebars.templates['consoleViewTpl'],
    initialize: function() {
        this.render();
        this.model.bind("change", this.render, this);
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
        return this;
    },
    reset: function() {
        this.model.set({
            message: "Hi, I'm Console."
        })
        return this.render()
    }
});