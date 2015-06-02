/* -------------------------------------------------- CartoDBs
-------------------------------*/
var CartoCollxView = Backbone.View.extend({
    events: {
        // "click .bt.marker": 'stageeps',
        // "click .bt-cartoobj-episodes": 'stageeps'
    },
    initialize: function() {
        // this.collection.bind('change', this.debug, this);
        // this.listenTo(this.collection, "change", this.render);
        return this
        // .render()
    },
    fit: function() {
        map.fitBounds(cbbItems.getBounds())
        return this
    },
    render: function() {
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
        "cartodb_id":hit.get("cartodb_id"),
        "anno":hit.get("anno"),
        "created_at":hit.get("created_at"),
        "updated_at":hit.get("updated_at")
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

                 L.geoJson(hitm,{seen:false,cartodb_id:hit.get("cartodb_id"),pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, activeStyle);
    }}).bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                var stale = _.find(cbbItems._layers, function(i) {
                    return i.options.seen == true
                });
                processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
            });

                // var seenStyle = markerseen
            } else {
                // var hitm = wkt.toObject().setStyle(linenew)
                var activeStyle = linenew
                // var zoomer = hitm.coordinates
                // var seenStyle = lineseen
                // console.log("hitll:");console.log(hitll);
            L.geoJson(hitm,{seen:false,cartodb_id:hit.get("cartodb_id"),style:activeStyle}).bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                var stale = _.find(cbbItems._layers, function(i) {
                    return i.options.seen == true
                });
                processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
            });
                // var hitm = L.multiPolyline(hitll, linenew);
            }
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
            var count = this.collection.length;
            // if (hit.get("active") == true || count == 1) {
                // if (map.getBounds().contains(hitm.getLatLng()) == false) {
                //     map.setView(hitm.getLatLng(), 9);
                // }
                // hitm.openPopup()
                // hitm.zoomTo()
            // }
        }, this);
        return this.fit()
    }
});
var BitsView = Backbone.View.extend({
    // tagName: "li",
    el: "#querylist-bits",
    events: {
        // "click .bt-cartoobj-zoomto": 'zoomtointernal',
        // "click .bt-cartoobj-episodes": 'pulleps',
        // "click .bt-getid": 'echoid'
    },
    template: Handlebars.templates['bitsView'],
    initialize: function() {
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change active", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change queued", this.fromzoom);
        // this.listenTo(this.collection, "change active", this.render);
        // this.listenTo(this.model, "change", this.render);
        this.listenTo(this.collection, "reset", this.render);
        // this.collection.bind('change', this.render, this);
        return this
        // .render()
    },
    debug: function() {
        console.log("here cuzza change queued");
    },
    echoid: function(e) {
        var locid = $(e.target).attr("data-id")
        var str = '<span class="loc-trigger" data-string="cartodb_id:' + locid + '"><span class="loc-string">SOME STRING</span><i class="glyphicon glyphicon-map-marker"></i></span>';
       console.log(str);
        return this
    },
    unwire: function() {
        $('.bt-cartoobj').tooltip('destroy')
        return this
    },
    stageeps: function(e) {
        return this.pulleps(e)
    },
    sort: function() {
        this.collection.sort()
        return this
    },
    pulleps: function(e) {
        console.log(e);
        
        var voff = e.currentTarget.offsetTop;

        appActivity.set({
            message: "fetching episodes...",
            show: true,
            altel: "#episodes-list"
        })
        var locid = $(e.target).attr("data-id")

        var loctype = $(e.target).attr("data-type");

        switch(loctype) {
    case 'line':
        locid = locid/plierline
        break;
    case 'poly':
        locid = locid/plierpoly
        break;
    default:
        locid = locid;
}

        appEpisodes.activeloc = Number(locid);
        appEpisodes.loctype = loctype;
        appEpisodes.verticaloffset = voff;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {
                // appActivity.set({message:"fetching episodes...",spin:true})
                // appActivityView.stfu()
                // again i'm not sure why this isn't firing from its event trigger
                // appEpisodesView.render()
                appActivity.set({
                    message: "",
                    show: false,
                    altel: false
                })
            }
        });
        e.preventDefault()
        // var am = $(e.currentTarget).parents('li').data("id").toString();
        var a = $(e.currentTarget).parents('li')
        return this.activate(a)
    },
    rewire: function() {
        // reactivating some pieces that get wiped in the render
        // actually -- first, since we're here for the same reason -- let's wipe the episodes list, too
        appEpisodesView.wipe();
        $('#querylist-bits').liveFilter("#query-livefilter", 'li', {
            filterChildSelector: 'div'
        });
        // $('.bt-cartoobj').tooltip({
        //     container: 'body',
        //     placement: 'right',
        //     trigger: 'hover'
        // })
        // a little non-backbone stuff
        // $("#stats-hits").html("total hits: " + this.collection.length)
        return this
    },
    activate: function(a) {
        // first wipe the list of any true classes (see ~184 for explanation)
        $(this.el).find("li").removeClass("true")
        // var amid = am.get("cartodb_id")
        var amid = $(a).data("id").toString();
        if (verbose == true) {
            console.log("in activate for " + a);
        }
        // actually first silently deactivate the others
        // _.each(_.reject(this.collection.models, function(mod) {
        //     return mod.get("cartodb_id") == amid;
        // }), function(mo) {
        //     mo.set({
        //         active: false,
        //         queued: false
        //     }, {
        //         silent: true
        //     })
        // }, this)
        // 
        // var item = this.collection.findWhere({
        //     "cartodb_id": amid
        // });
        // item.set({
        //     active: true
        // })
        // send id and popup flag
        // 

// SHOULD NOT BE AN EACH #returnto
// 
        
        $(a).addClass("true")
        $(a).addClass("well")
        return this
        // .render()
    },
    render: function() {
        this.unwire()
        if (verbose == true) {
            console.log("rendering bits")
        }
        _.sortBy(this.collection.models, function(mod) {
            return mod.get("active") == 'true';
        });
        // notice we are wrapping the collection in rows: cuz cartodb does it
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        return this.rewire()
    }
});
var CartoPlainView = Backbone.View.extend({
    // tagName: "li",
    el: "#querylist-carto",
    events: {
        "click .bt-cartoobj-zoomto": 'zoomtointernal',
        "click .bt-cartoobj-episodes": 'pulleps',
        "click .bt-getid": 'echoid'
    },
    template: Handlebars.templates['cartoPlainView'],
    initialize: function() {
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change active", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        this.listenTo(this.collection, "change queued", this.fromzoom);
        // this.listenTo(this.collection, "change active", this.render);
        // this.listenTo(this.model, "change", this.render);
        // this.collection.bind('change', this.render, this);
        return this
        // .render()
    },
    debug: function() {
        console.log("here cuzza change queued");
    },
    echoid: function(e) {
        var locid = $(e.target).attr("data-id")
        var str = '<span class="loc-trigger" data-string="cartodb_id:' + locid + '"><span class="loc-string">SOME STRING</span><i class="glyphicon glyphicon-map-marker"></i></span>';
       console.log(str);
        return this
    },
    fromzoom: function(cm) {
        var czid = cm.get("cartodb_id")
        console.log("czid in fromzoom:");
        console.log(czid);
        // var a = $(e.currentTarget).parents('li')
        var a = $(this.el).find("li[data-id='" + czid + "']")
        console.log("a at 90:");
        console.log(a);
        return this.activate(a)
    },
    unwire: function() {
        $('.bt-cartoobj').tooltip('destroy')
        return this
    },
    stageeps: function(e) {
        return this.pulleps(e)
    },
    sort: function() {
        this.collection.sort()
        return this
    },
    pulleps: function(e) {
        console.log(e);
        
        var voff = e.currentTarget.offsetTop;

        appActivity.set({
            message: "fetching episodes...",
            show: true,
            altel: "#episodes-list"
        })
        var locid = $(e.target).attr("data-id")

        var loctype = $(e.target).attr("data-type");

//         switch(loctype) {
//     case 'line':
//         locid = locid/999
//         break;
//     case 'poly':
//         locid = locid/9999
//         break;
//     default:
//         locid = locid;
// }

locid=doctorId(loctype,locid)

        appEpisodes.activeloc = Number(locid);
        appEpisodes.loctype = loctype;
        appEpisodes.verticaloffset = voff;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {
                // appActivity.set({message:"fetching episodes...",spin:true})
                // appActivityView.stfu()
                // again i'm not sure why this isn't firing from its event trigger
                // appEpisodesView.render()
                appActivity.set({
                    message: "",
                    show: false,
                    altel: false
                })
            }
        });
        e.preventDefault()
        // var am = $(e.currentTarget).parents('li').data("id").toString();
        var a = $(e.currentTarget).parents('li')
        return this.activate(a)
    },
    zoomtointernal: function(e) {
        e.preventDefault()
        var a = $(e.currentTarget).parents('li')
        // console.log("a at 186:");console.log(a);
        return this.activate(a)
    },
    zoomfromexternal: function(czid) {
        console.log("czid in zoomfromexternal is :");
        console.log(czid);
        var a = $(this.el).find("li[data-id='" + czid + "']")
        return this.activate(a)
    },
    rewire: function() {
        // reactivating some pieces that get wiped in the render
        // actually -- first, since we're here for the same reason -- let's wipe the episodes list, too
        appEpisodesView.wipe();
        $('#querylist-carto').liveFilter("#query-livefilter", 'li', {
            filterChildSelector: 'div'
        });
        $('.bt-cartoobj').tooltip({
            container: 'body',
            placement: 'right',
            trigger: 'hover'
        })
        // a little non-backbone stuff
        $("#stats-hits").html("total hits: " + this.collection.length)
        return this
    },
    activate: function(a) {
        // first wipe the list of any true classes (see ~184 for explanation)
        $(this.el).find("li").removeClass("true")
        // var amid = am.get("cartodb_id")
        var amid = $(a).data("id").toString();
        if (verbose == true) {
            console.log("in activate for " + a);
        }
        // actually first silently deactivate the others
        _.each(_.reject(this.collection.models, function(mod) {
            return mod.get("cartodb_id") == amid;
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
            "cartodb_id": amid
        });
        item.set({
            active: true
        })
        // send id and popup flag
        // 

// SHOULD NOT BE AN EACH #returnto
// 
        _.each(cbbItems._layers, function(i) {
            // console.log("i in cbbitems zoomloop:");
            // console.log(i);
            // console.log(item.get("geom_type"))
            if (i.options.cartodb_id == amid) {

                // if(item.get("geom_type")=="line"){
                //     if (map.getBounds().contains(i.getLatLng()) == false) {
                //     map.setView(i.getLatLng(), 9);
                // }
                // }
                // if (map.getBounds().contains(i.getBounds()) == false) {
                    // map.setView(i.getLatLng(), 9);
                    // map.fitBounds(i.getBounds());
                // }

var ib = i.getBounds();
if(verbose==true){
console.log("ib:");console.log(ib);}
var typ = item.get("geom_type")


        switch(typ) {
    case 'point':
// map.setView(i.getBounds(),7)
map.fitBounds(ib)
        break;
    case 'poly':
// map.setView(i.getBounds(),7)
map.fitBounds(ib)
        break;
    default:
    // i.e. line
map.fitBounds(ib)
        // locid = locid;
}

                // if (map.getBounds().contains(i.getLatLng()) == false) {
                //     map.setView(i.getLatLng(), 9);
                // }
            }
        }) //each
        $(a).addClass("true")
        // $(a).addClass("well")
        processLeaf(amid, true, item.get("geom_type"))
        // GUH? WHAT'S THIS? It's a straight-up jquery hack to waaaaay more quickly light up the active model's list item
        // cuz doing it with a proper backbone re-render took forever (.8 seconds)
        return this
        // .render()
    },
    render: function() {
        this.unwire()
        if (verbose == true) {
            console.log("rendering cartoplain")
        }
        if(this.collection.models.length>0){

        _.sortBy(this.collection.models, function(mod) {
            return mod.get("active") == 'true';
        });
        // var esc = appCartoQuery.solrstring()
        // $("#query-form-input").val(esc)
        // notice we are wrapping the collection in rows: cuz cartodb does it
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
    } else {
        $(this.el).html("<span style='font-size:2em;'>Zero. RU a zero?</span>")
        return this.rewire()
    }
    }
});
var SolrFieldzView = Backbone.View.extend({
    // tagName: "li",
    el: "#solrfields-list",
    events: {
        "click .loc-trigger": "singular"
    },
    template: Handlebars.templates['solrfieldsView'],
    initialize: function() {
        // this.listenTo(this.collection, "reset", this.render);
        this.collection.bind('reset', this.render, this);
        this.collection.bind('change', this.render, this);
        return this.render()
    },
    singular: function(e) {
        $(this.el).addClass('hidden')
        console.log("singuler in qv");
        e.preventDefault()
        locTrigger(e)
        return this
    },
    render: function() {
        this.collection.sortBy('order')
        if (verbose == true) {
            // console.log("rendering solrfieldsview")
            // console.log(this.collection.models);
        }
        // $(this.el).html(this.template(this.collection.toJSON()))       
        $(this.el).html(this.template({
            count: this.collection.models.length,
            fields: this.collection.toJSON()
        }));
        return this
    }
});
/* -------------------------------------------------- AbtV
-------------------------------*/
var HuhView = Backbone.View.extend({
    // tagName: "li",
    el: "#huh",
    events: {
        // "click #bt-showmain":"reset"
    },
    template: Handlebars.templates['home'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
        // }, this);
        return this
    },
    reset: function() {
        console.log("showmain clicked");
        console.log(e);
        $("#bt-showmain").addClass('hidden')
        $("#main").addClass('hiddenish')
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
/* -------------------------------------------------- QUERYVIEW -----------------------  */
var QueryView = Backbone.View.extend({
    el: $("#query-form"),
    events: {
        "click #query-form-bt": "fire",
        "click #query-form-randomize": "randomize",
        "click #solrfields .glyphicon": "togglehelp"
        // "change": "render"
    },
    template: Handlebars.templates['queryViewTpl'],
    initialize: function() {
        this.render();
        var q = this.model;
    q.on("change", q.setstrings);
        this.listenTo(this.model, "change", this.render)
        // this.model.bind("change", this.render, this);
    },
    fire: function(goto) {
        // doubles as a clearer of the episodes arrow
        $(".episodes-arrow").addClass("hidden")
        if (typeof goto == 'undefined') {
            goto = true
        }
        if(goto.type=="click"){
            goto=true
        }
        
        var rawstring = $("#query-form-input").val()
        appCartoQuery.set({
            rawstring: rawstring
        })
        console.log("qv rawstring:");console.log(rawstring);
        console.log("qv goto:");console.log(goto);
        if (goto == true) {
            appRoute.navigate(pullURL("#query"), {
                trigger: true,
                replace: true
            })
        } else {
            // ok we didn't wanna disrupt pane state but we still wanna fire off a query
            // gotta do this here rather than rely on a route to do it
            // 
            // appCBB.fetch({
            //     success: function() {
            //         appCBBListView.render()
            //         appCBBMapView.render()
            //         appActivity.set({
            //             message: "",
            //             show: false,
            //             altel: false
            //         })

            //          appRoute.navigate(pullURL("#query"), {
            //     trigger: false,
            //     replace: true
            // })

            //     }, //success
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
            //     } //error
            // }, {
            //     reset: true
            // })
            // 
            // 
        }
    },
    setstage: function() {
        $("#querylist-carto").html("")
    },
    render: function() {
        // appRoute.update()
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
        $(this.el).html(this.template(this.model.toJSON()))
        // $(this.el).val(this.model.get("solrstring"))
        return this
    }
});
var QuerySubNavView = Backbone.View.extend({
    el: $("#query-subnav"),
    events: {
        "click .query-subnav-btn": "activate",
        // "click #query-form-randomize": "randomize",
        // "click #solrfields .glyphicon": "togglehelp"
        // "change": "render"
    },
    template: Handlebars.templates['querySubNavViewTpl'],
    initialize: function() {
        this.render();
        this.listenTo(this.model, "change", this.render)
        // this.model.bind("change", this.render, this);
    },
    render: function() {
        // appRoute.update()
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
        $(this.el).html(this.template(this.model.toJSON()))
        // $(this.el).val(this.model.get("solrstring"))
        return this
        .activate()
    },
    activate: function(e){

if(typeof e == 'undefined'){
    var elid = "locations"
} else {
    // $el = $(e.target)
    var elid = $(e.target).attr("data-id")
$(e.target).addClass("active")
}

$(this.el).find(".query-subnav-btn").removeClass("active")
$(".query-subnav-btn[data-id='"+elid+"']").addClass("active")

// blah - too lazy to fix this sitewide

if(elid=="locations"){
    $("#querylist-carto").removeClass("hidden")
    $("#querylist-bits").addClass("hidden")
} else {
    $("#querylist-carto").addClass("hidden")
    $("#querylist-bits").removeClass("hidden")
}
return this

    }
});
/* -------------------------------------------------- CONSOLEVIEW -----------------------  */
var ConsoleView = Backbone.View.extend({
    el: $("#consoleContainer"),
    template: Handlebars.templates['consoleViewTpl'],
    initialize: function() {
        this.render();
        this.listenTo(appCartoQuery, "change", this.render)
        this.model.bind("change", this.render, this);
    },
    render: function() {
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
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
/* -------------------------------------------------- ACTIVITYVIEW -----------------------  */
var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: Handlebars.templates['activityViewTpl'],
    initialize: function() {
        this.model.bind("change", this.render, this);
        this.render();
    },
    render: function() {
        var show = this.model.get("show")
        var msg = this.model.get("message")
        var altel = this.model.get("altel")
        if (show == true) {
            if (typeof altel == 'undefined' || altel == false || altel == null) {
            var altel = "#activity-default"    
            } 
            // else {
            //     // if(spin==true)  {
            //     // NProgress.start();
            // }
            NProgress.configure({
                    parent: altel
                });
                NProgress.start();
        } else {
            // NProgress.done();
            NProgress.done()
            // .configure({
            //     parent: "#main"
            // });
        }
        $(this.el).html(this.template(this.model.toJSON()))
        return this
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
    events: {
        "click .loc-trigger": "singular"
    },
    template: Handlebars.templates['recentsViewTpl'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('change active', this.render, this);
        return this.render()
    },
    singular: function(e) {
        e.preventDefault()
        locTrigger(e)
        return this
    },
    render: function() {
        if (verbose == true) {
            // console.log("rendering recentsview")
            // console.log(this.collection)
        }

this.collection.sortBy('location_id')

// this.collection.sortBy(function(m) { 
// console.log("803 sortby:");console.log(m);
//     return -m.get('updated_at') });

        // sorted.each(function(recentitem) {
        this.collection.each(function(recentitem) {
            if (verbose == true) {
                // console.log("gonna render the recentitemview")
            }
            var thisRecentItemView = new RecentItemView({
                model: recentitem
            });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            // $(this.el).append(thisRecentItemView.render().el
            // "recent item will go here"
            // );
            $(this.el).html(this.template(this.collection.toJSON()));
        }, this);
        return this
    }
});
/* -------------------------------------------------- EpiV
-------------------------------*/
var EpisodeView = Backbone.View.extend({
    tagName: "li",
    template: Handlebars.templates['episodeViewTpl'],
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
    rewire: function(){

this.$("a").tooltip({
            container: "body",
            placement: 'right',
            trigger: 'hover'
        });

return this
    },
    // ,className:"general foundicon-plus"
    render: function() {
        if (verbose == true) {
            // console.log("rendering recentitemview")
        }
        $(this.el).html(this.template(this.model.toJSON()));
        return this
        .rewire()
    }
});
/* -------------------------------------------------- EpsV
-------------------------------*/
var EpisodesView = Backbone.View.extend({
    // tagName: "li",
    el: "#episodes-list",
    initialize: function() {
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('reset', this.render, this);
        // this.collection.bind("reset", _.bind(this.debug, this));
        // this.listenTo(this.collection, "change", this.render);
        // return this.render()
    },
    debug: function() {
        console.log("RESET trigger");
    },
    wipe: function() {
        $(this.el).empty();
        return this
    },
    render: function() {
        $(this.el).empty()
        
        // console.log("voff in epiview:");
        // console.log(this.collection.verticaloffset);

        $(this.el).css("top",this.collection.verticaloffset-20)
        $('.episodes-arrow').removeClass('hidden').css("position","relative").css("top",this.collection.verticaloffset-10)

        // $(this.el).html(" <h3><span class='episodes' style='margin-right:12px;'>--------></span>Episodes</h3> <span class='cbbepsanno'>(referencing location: '" + appCBB.findWhere({
        $(this.el).html(" <h3>Episodes</h3> <span class='cbbepsanno'>(referencing location: '" + appCBB.findWhere({
            active: true
        }).get("name") + "')</span>")
        // we use .episodes cuz we have some stuff outside of the el we wanna unhide, too
        if (this.collection.models.length > 0) {
            $(".episodes").removeClass('hidden')
        } else {
            $(this.el).html("None found (or <em>maybe</em> an error occurred. Who's to know?)")
        }
        if (verbose == true) {
            // console.log("rendering recentsview")
            // console.log(this.collection)
        }
        this.collection.each(function(episode) {
            if (verbose == true) {
                // console.log("gonna render the recentitemview")
            }
            console.log("episode:");
            console.log(episode);
            console.log(episode.get("id_wikia"));
            var wikiaid = Number(episode.get("id_wikia"))
            var wikia = appWikiaz.findWhere({
                "id": wikiaid
            })
            if (typeof wikia !== 'undefined') {
                episode.set({
                    title: wikia.get("title")
                })
            } else {
                episode.set({
                    title: "[title not found at comedybangbang.wikia.com]"
                })
            }
            var thisEpView = new EpisodeView({
                model: episode
            });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            $(this.el).append(thisEpView.render().el
                // "recent item will go here"
            );
        }, this);
        return this
    }
});
/* -------------------------------------------------- Method
-------------------------------*/
var MethodView = Backbone.View.extend({
    // tagName: "li",
    events: {
        "click .loc-trigger": "singular",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    el: "#fullstory",
    template: Handlebars.templates['fullstory'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    singular: function(e) {
        e.preventDefault()
        locTrigger(e, false)
        return this
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
        // }, this);
        return this
    }
});

/* -------------------------------------------------- Minutiae
-------------------------------*/
var MinutiaeView = Backbone.View.extend({
    // tagName: "li",
    events: {
        // "click .loc-trigger": "singular",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    el: "#minutiae",
    template: Handlebars.templates['minutiae'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    singular: function(e) {
        e.preventDefault()
        locTrigger(e, false)
        return this
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
        // }, this);
        return this
    }
});