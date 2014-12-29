/* -------------------------------------------------- CartoDBs
-------------------------------*/
var CartoCollxView = Backbone.View.extend({
    // markerTemplate:Handlebars.templates['hitMarkerViewTpl'],
    initialize: function() {
        // this.collection.bind('change', this.debug, this);
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
            // if(hit.get("active")==true){
            // var mstyle=markerseen
            // } else {
            var mstyle = markernew
            // }
            var hitloc = hit.get("loc")
            var hitloca = hitloc.split(",")
            var hitll = L.latLng(hitloca[0], hitloca[1]);
            var hitm = L.circleMarker(hitll, mstyle).addTo(cbbItems).on("click", function(m) {
                // var id = m.options.cartodb_id
                // activateSuperficials(id)
                // _.each(cbbItems._layers,function(mar){
                //     console.log("ma in each cbbitems:");console.log(mar.options.seen);
                // })
                // 
                var stale = _.find(cbbItems._layers,function(i){
                    return i.options.seen == true
                });
processLeaf(hit.get("cartodb_id").toString());
                // _.each(cbbItems._layers, function(i) {
                //     if (i.options.seen == true) {
                //         i.setStyle(markerseen)
                //     }
                // }) //each
                
                // if(typeof stale !== 'undefined'){
                // stale.setStyle(markerseen)}
                this.setStyle(markeractive)
                // hit.set({active:true});
                this.options.seen = true;
                hit.set({
                    queued: true
                });
            }).bindPopup(pu);
            // var hitm = L.circleMarker(hitll, mstyle).addTo(cbbItems).bindPopup(pu);
            // this.collection.activate(chid)
            hitm.options.cartodb_id = hit.get("cartodb_id").toString()
            if (hit.get("active") == true) {
                // if(!$("#main").hasClass('hidden')){
                if (map.getBounds().contains(hitm.getLatLng()) == false) {
                    map.setView(hitm.getLatLng(), 9);
                }
                // }
                hitm.openPopup()
                // hitm.zoomTo()
            }
            // var pu = this.markerTemplate(hit.toJSON());
            // var gj = $.parseJSON(hit.get("the_geom_gj"))
            //             var geojson = L.geoJson(gj, {
            //                 pointToLayer: function(feature, latlng) {
            //                     return L.circleMarker(latlng, markernew);
            //                 }
            //                 ,
            //                 options:{id :hit.get("id")}
            //             }).addTo(cbbItems).on("click",function(m){
            // console.log("this");
            // console.log(this);
            // console.log("m");
            // console.log(m);
            //                 hit.set({active:true});
            //                 this.setStyle(markerseen)
            //             }).bindPopup(pu);
        }, this);
        return this
    }
});
var CartoPlainView = Backbone.View.extend({
    // tagName: "li",
    el: "#query-list",
    events: {
        "click .bt-cartoobj-zoomto": 'activate'
    },
    template: Handlebars.templates['cartoPlainView'],
    initialize: function() {
        // this.collection.bind('change', this.render, this);
        this.listenTo(this.collection, "change", this.render);
        // this.listenTo(this.model, "change", this.render);
        // this.collection.bind('change', this.render, this);
        return this
        // .render()
    },
    unwire: function() {
        $('.bt-cartoobj').tooltip('destroy')
        return this
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
    activate: function(e) {
        if(verbose == true){console.log("in activate of CPV")}
        e.preventDefault()
        var id = $(e.currentTarget).parents('li').data("id").toString();
        console.log("id from parent li");
        console.log(id);
        // mo.set({queued:false})
        // actually first silently deactivate the others
        _.each(_.reject(this.collection.models, function(mod) {
            return mod.get("cartodb_id") == id;
        }), function(mo) {
            mo.set({
                active: false,
                queued: false
            }, {
                silent: true
            })
        }, this)
        // 
        var item = this.collection.findWhere({
            "cartodb_id": id
        });
        console.log("item out of collection findwhere:");console.log(item);
        item.set({
            queued: true
        })

// send id and popup flag
processLeaf(id,true)
        // _.each(cbbItems._layers, function(i) {
        //             if (i.options.cartodb_id == id) {
        //             i.setStyle(markeractive)
        //                 // i.setStyle(markerseen)
        //                 if (map.getBounds().contains(i.getLatLng()) == false) {
        //             map.setView(i.getLatLng(), 9);
        //         } 

        //         }
        //         }) //each

    },
    render: function() {
        this.unwire()
        if (verbose == true) {
            console.log("rendering cartoplain")
        }
        // as good a place as any -- if we're firing here then the arto material changed
        appConsole.set({
            // message: "queried <a href='http://cartodb.com'>CartoDB</a> with: <code>" + appCartoQuery.get("sqlstring") + "</code>"
            message: "queried <a href='http://cartodb.com'>CartoDB</a> with: <code>" + appCartoQuery.solrstring() + "</code>"
        });
        // var esc = appCartoQuery.ready()
        // var esc = decodeURIComponent(appCartoQuery.get("wherestring"))
        var esc = appCartoQuery.solrstring()
        $("#query-form-input").val(esc)
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
    events: {
        "click .trigger-loc": "singular",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    el: "#method",
    template: Handlebars.templates['method'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    singular: function() {
        // zoom to a given map obj
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
    setActive: function(e) {
        e.preventDefault()
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
/* -------------------------------------------------- RecentV
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
/* -------------------------------------------------- RecentsV
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