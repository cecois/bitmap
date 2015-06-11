/* -------------------------------------------------- CartoDBs
-------------------------------*/
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
            message: "preparing map objects...",
            show: true
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
                L.geoJson(hitm, {
                        seen: false,
                        cartodb_id: hit.get("cartodb_id"),
                        pointToLayer: function(feature, latlng) {
                            return L.circleMarker(latlng, activeStyle);
                        }
                    }).bindPopup(pu).addTo(cbbItems).on("click", function(m) {
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
                L.geoJson(hitm, {
                        seen: false,
                        cartodb_id: hit.get("cartodb_id"),
                        style: activeStyle
                    }).bindPopup(pu).addTo(cbbItems).on("click", function(m) {
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

                                if(this.collection.length==1){

    cbbItems.openPopup()

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
            // var count = this.collection.length;
            // if (hit.get("active") == true || count == 1) {
            // if (map.getBounds().contains(hitm.getLatLng()) == false) {
            //     map.setView(hitm.getLatLng(), 9);
            // }

            // hitm.zoomTo()
            // }
        }, this);
        appActivity.set({
            message: null,
            show: false
        })
        return this.fit()
    }
});
var BitsCountView = Backbone.View.extend({
    el: ".query-subnav-count-bits",
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        return this.render()
    },
    render: function() {
        var len = this.collection.models.length
        $(this.el).html(this.collection.models.length);
        return this
    }
}); //bitscountview
var CartoCollxCountView = Backbone.View.extend({
    el: ".query-subnav-count-locations",
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        return this.render()
    },
    render: function() {
        var len = this.collection.models.length
        $(this.el).html(this.collection.models.length);
        return this
    }
}); //bitscountview
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
        this.listenTo(this.collection, 'reset', this.render);
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

        appActivity.set({
            message: "fetching episodes...",
            show: true,
            altel: null
                // altel: "#episodes-list"
        })
        var locid = $(e.target).attr("data-id")
        var loctype = $(e.target).attr("data-type");
        switch (loctype) {
            case 'line':
                locid = locid / plierline
                break;
            case 'poly':
                locid = locid / plierpoly
                break;
            default:
                locid = locid;
        }
        appEpisodes.activeloc = Number(locid);
        appEpisodes.loctype = loctype;

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

// some positioning so it's clear what wz activated
        // $(a).scrollIntoView()
        // var voff = e.currentTarget.offsetTop;
        var voff = $(a).offsetTop;
// appEpisodes.verticaloffset = voff;

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
        // "click .bt-cartoobj-episodes": 'pulleps',
        "click .bt-cartoobj-episodes": 'triage',
        "click .carto-plain-title": 'triage',
        "click .bt-getid": 'echoid'
    },
    // template: Handlebars.templates['cartoPlainView'],
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        if (agent == "desktop") {
            this.template = Handlebars.templates['cartoPlainView'];
        } else if (agent == "mobile") {
            this.template = Handlebars.templates['cartoPlainView-Mobile'];
        }
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change active", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change queued", this.fromzoom);
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
    triage: function(e) {

e.preventDefault()

        var locid = $(e.target).attr("data-id")
        var loctype = $(e.target).attr("data-type");

        appCBB.activate(locid,loctype);

        if (agent == "desktop") {
            return this.pulleps()
        } else if (agent == "mobile") {
            return this.pulleps_mobile()
        }
    },
    sort: function() {
        this.collection.sort()
        return this
    },
    pulleps_mobile: function() {
        e.preventDefault()
        var a = $(e.currentTarget).parents('li')
        return this.activate(a)
    },
    pulleps: function(source) {
        if (typeof source == 'undefined' || source == null) {
            var source = "self"
        }
        appActivity.set({
            message: "fetching episodes...",
            show: true,
            // altel: "#episodes-list"
        })

            // we have to find the el to activate
            var act = appCBB.findWhere({active:true})
            var locid = act.attributes.cartodb_id
            var loctype = act.attributes.geom_type

            var a = $("#querylist-carto").find("span[data-id='" + locid + "'][data-type='" + loctype + "']").parents("li")

// $('#main').animate({scrollTop: a.offset().top}, 500);

// console.log("a:"); console.log(a);
            // var voff = a.offsetTop;
            // console.log("voff:"); console.log(voff);

        if (source == "self") {
            // force the scroll to the top jic we left it at the bottom
            $("#main").scrollTo(".querysubnavh");
        } else {
            // it means we're coming from somewhere else (prolly a popup or the router), which means in turn we might need to nudge the now-active gui elements into view
            $("#main").scrollTo($(a),200,{offset:-100});
            $("#episodes-list").addClass("episodespecial")
            appHiderView.setpos("episodes-pu","true")
        }
        locidDrd = doctorId(loctype, locid)
        appEpisodes.activeloc = Number(locidDrd);
        appEpisodes.loctype = loctype;
        // appEpisodes.verticaloffset = voff;
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

        // some positioning so it's clear what wz activated
        // a.scrollIntoView()
        // var voff = e.currentTarget.offsetTop;
// appEpisodes.verticaloffset = voff;

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
        $(this.el).find(".carto-plain-title").removeClass("true")
        var amid = $(a).data("id").toString();
        var amtyp = $(a).data("type").toString();


// this should be done already
        // appCBB.activate(amid,amtyp)

        // // actually first silently deactivate the others
        // _.each(_.reject(this.collection.models, function(mod) {
        //         return mod.get("cartodb_id") == amid;
        //     }), function(mo) {
        //         mo.set({
        //             active: false,
        //             queued: false
        //         }, {
        //             silent: true
        //         })
        //     }, this)
        //     //
        // var item = this.collection.findWhere({
        //     "cartodb_id": amid
        // });
                var item = this.collection.findWhere({
            "active": true
        });
        // item.set({
        //         active: true
        //     })
            //
            // SHOULD NOT BE AN EACH #returnto
            //
        _.each(cbbItems._layers, function(i) {

                // we can shop the now-active id to the leaflet layers bc we stored that id when we added them to the map
                if (i.options.cartodb_id == amid) {
                // if (i.active == true) {
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
                    if (verbose == true) {
                        console.log("ib:");
                        console.log(ib);
                    }
                    var typ = item.get("geom_type")
                    switch (typ) {
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
            // $(a).addClass("true") //OG

        $(a).find(".carto-plain-title").addClass("true")

            // if($(a).hasClass('carto-plain-title')){
            // $(a).addClass("true")
            // } else {
            //         $(a).siblings('.carto-plain-title').addClass("true")}
            // $(a).addClass("well")
        processLeaf(amid, true, item.get("geom_type"))
            // GUH? WHAT'S THIS? It's a straight-up jquery hack to waaaaay more quickly light up the active model's list item
            // cuz doing it with a proper backbone re-render took forever (.8 seconds)
        return this
    },
    render: function() {
        this.unwire()
        appActivity.set({
            message: "preparing list display...",
            show: true
        })
        if (verbose == true) {
            console.log("rendering cartoplain")
        }
        if (this.collection.models.length > 0) {
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
            // if there are no locations we wanna be cute and snide but also not make anybody see it
            appConsole.set({
                message: 'Just fyi - "' + appCartoQuery.get("rawstring") + '" brought zero mappable locations.'
            })
            $(this.el).html("<span style='font-size:2em;'>Zero. RU a zero?</span>")
            appQuerySubNavView.specify("bits")
            appCBBCountView.render()
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
        this.listenTo(this.collection, 'reset', this.render);
        // this.model.bind("change", this.updateBaseMap, this);
        // this.listenTo(this.model, "change", this.debug);
        // this.model.bind("change:bbox_west change:bbox_south change:bbox_east change:bbox_north", this.render, this);
        // this.render();
        return this.wireup()
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
        // q.on("change", q.setstrings);
        this.listenTo(this.model, "change", this.render)
            // this.model.bind("change", this.render, this);
    },
    fire: function(goto) {
        // doubles as a clearer of the episodes arrow, some other gui stuff
        appCBB.deactivate()
        $(".episodes-arrow").addClass("hidden")
        appHider.set({
            collapsed: "false"
        })
        if (typeof goto == 'undefined') {
            goto = true
        }
        if (goto.type == "click") {
            goto = true
        }
        var ss = $("#query-form-input").val()
        if (ss == '' || ss == null) {
            this.model.set({
                urlstring: "*:*",
                rawstring: "",
                displaystring: ""
            })
        } else {
            this.model.set({
                    urlstring: ss,
                    rawstring: ss,
                    displaystring: ss
                })
                // this.model.set({urlstring:ss})
                // this.model.set({displaystring:ss})
        }
        // if(rawstring == '' || rawstring == null){rawstring = "*:*"}
        // appCartoQuery.set({
        //     rawstring: rawstring
        // })
        // console.log("qv rawstring:");console.log(rawstring);
        // console.log("qv goto:");console.log(goto);
        if (goto == true) {
            console.log("let's go to there")
            appRoute.navigate(pullURL("#query"), {
                trigger: true,
                replace: true
            })
        } else {
            // ok we didn't wanna disrupt pane state but we still wanna fire off a query
            // gotta do this here rather than rely on a route to do it
            //
            appActivity.set({
                message: "querying bits...",
                show: true,
                // altel: "#activity-default"
            })
            appBits.fetch({
                    reset: true,
                    // dataType: "jsonp"
                    success: function() {
                        // i can't for the life of me get that view to bind to this collection's events - dunno
                        // appBitsView.render()
                        // appBitsCountView.render()
                        appCBB.fetch({
                            reset: true,
                            // dataType: "jsonp"
                            success: function() {
                                // console.log("successful fetch of appcbb at 76");
                                // appCBBListView.render()
                                // appCBBMapView.render()
                                // appCBBCountView.render()
                            },
                            error: function() {
                                appConsole.set({
                                        message: "query errored out"
                                    })
                                    // actually, if it's a true error we wanna be more forthcoming:
                                appActivity.set({
                                        message: "",
                                        show: false
                                    })
                                    // console.log("failed fetch");
                            }
                        })
                    }, //success fetch
                    error: function() {
                        appConsole.set({
                                message: "query errored out"
                            })
                            // actually, if it's a true error we wanna be more forthcoming:
                        $("#querylist-carto").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                        $("#querylist-bits").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                        appActivity.set({
                                message: "",
                                show: false,
                                altel: false
                            })
                            // console.log("failed fetch");
                    }
                })
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
        // this.listenTo(appBits,"reset",this.accoutrement)
        // this.listenTo(appCBB,"reset",this.accoutrement)
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
        return this.activate()
    },
    specify: function(w) {
        // just an extra we can use to specify which "tab"
        $(this.el).find(".query-subnav-btn").removeClass("active")
        $(".query-subnav-btn[data-id='" + w + "']").addClass("active")
        appEpisodesView.reset()
            // blah - too lazy to fix this sitewide
        if (w == "locations") {
            $("#querylist-carto").removeClass("hidden")
            $("#querylist-bits").addClass("hidden")
        } else {
            $("#querylist-carto").addClass("hidden")
            $("#querylist-bits").removeClass("hidden")
        }
        return this
    },
    //     accoutrement: function(){
    // // because we're subnavvin here, the models themselves aren't really here
    // $(this.el).find('.query-subnav-count-bits').html("("+appBits.length+")")
    // $(this.el).find('.query-subnav-count-locations').html("("+appCBB.length+")")
    //     },
    activate: function(e) {
        if (typeof e == 'undefined') {
            var elid = "locations"
        } else {
            // $el = $(e.target)
            var elid = $(e.target).attr("data-id")
            $(e.target).addClass("active")
        }
        $(this.el).find(".query-subnav-btn").removeClass("active")
        $(".query-subnav-btn[data-id='" + elid + "']").addClass("active")
        appEpisodesView.reset()
            // blah - too lazy to fix this sitewide
        if (elid == "locations") {
            $("#querylist-carto").removeClass("hidden")
            $("#querylist-bits").addClass("hidden")
        } else {
            $("#querylist-carto").addClass("hidden")
            $("#querylist-bits").removeClass("hidden")
        }
        return this
            // .accoutrement()
    }
});
/* -------------------------------------------------- MAINHIDER -----------------------  */
var HiderView = Backbone.View.extend({
    el: $("#btn-hider"),
    template: Handlebars.templates['hiderViewTpl'],
    initialize: function() {
        this.render();
        this.model.bind("change", this.render, this);
    },
    events: {
        "click": "setpos"
    },
    swap: function() {
        if (this.model.get("collapsed") == "false") {
            this.model.set({
                collapsed: "true",
                operation: "plus",
                instructions: "expand main pane"
            });
        } else if (this.model.get("collapsed") == "true") {
            this.model.set({
                collapsed: "false",
                operation: "minus",
                instructions: "collapse/hide main pane"
            });
        }
        return this
    },
    setpos: function(newforwhom, collaps) {
        if (typeof newforwhom == 'undefined' || newforwhom == null) {
            var newforwhom = "main"
        }
        if (typeof collaps == 'undefined' || collaps == null) {
            // nothing explicit came in -- let's swap whatever current state is
            if (this.model.get("collapsed") == "true") {
                var collaps = "false"
            } else {
                var collaps = "true"
            }
        }
        switch (collaps) {
            case "true":
                var op = "plus"
                var instro = "expand main pane"
                break;
            case "false":
                var op = "minus"
                var instro = "collapse/hide main pane"
        }
        // if(this.model.get("collapsed")=="false"){
        this.model.set({
            collapsed: collaps,
            forwhom: newforwhom,
            operation: op,
            instructions: instro
        });
        // } else {
        //         this.model.set({collapsed:"false",operation:"minus",instructions:"collapse/hide main pane"})
        //     }
        return this
    },
    //     position: function(much){
    // if(typeof much == 'undefined' || much == null){
    //     var much = '99.5%';
    // }
    // this.model.set({collapsed:"true",operation:"plus",instructions:"expand main pane",distance:much});
    // return this
    // .render()
    //     },
    render: function() {
        var forwhom = this.model.get("forwhom")
        $(this.el).html(this.template(this.model.toJSON()))
        if (this.model.get("collapsed") == "true") {
            switch (forwhom) {   
                case "main":
                    forclass = "hiddenish"
                    break;   
                case "episodes-pu":
                    forclass = "hiddenish-episodes-pu";
                    break;
                default:
                    forclass = "hiddenish"
            }
            // first we clear out any current state
            // $("#main").attr("class","")
            console.log("forclass right b4 apply:");
            console.log(forclass);
            $("#main").addClass(forclass);
            $("#mnuBaseMap").addClass(forclass);
            $("#banner-bang").addClass(forclass);
            appConsoleView.$el.addClass("hidden")
            appConsole.set({
                "message": "the 'control' key also toggles the visibility of the main pane"
            })
        } else {
            $("#mnuBaseMap").removeClass('hiddenish');
            appConsoleView.$el.removeClass("hidden")
            $("#main").removeClass('hiddenish hiddenish-episodes-pu');
            $("#banner-bang").removeClass('hiddenish');
        }
        if (typeof this.model.get("distance") !== 'undefined' || this.model.get("distance") !== null) {
            $("#main").css('right', this.model.get("distance"));
        }
        return this.rewire()
    },
    rewire: function() {
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right"
        })
        return this
    },
    reset: function() {
        return this.render()
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
/* -------------------------------------------------- PUVIEW -----------------------  */
var PopupView = Backbone.View.extend({
    // el: $("#activityContainer"),
    template: Handlebars.templates['hitMarkerViewTpl'],
    initialize: function() {
        this.ogwidth = null;
        this.model.bind("change", this.render, this);
        return this.render();
    },
    events: {
        "click .bt-cartoobj-episodes": "pulleps",
        // "click .bt-cartoobj-feedback": "ghsubmit",
        // "click .bt-cartoobj-leafletcloser": "reset"
        "click button[type='submit']": "issue_submit",
        "click .btn-pu-nav": "navinternal"
    },
    navinternal: function(e) {
        $cuta = $(e.currentTarget)
            // so few no real performance hit here
        $(this.el).find(".btn-pu-nav").removeClass("active")
        $cuta.addClass("active")
            // var tel = e.currentTarget.getAttribute("data-target")
        var tel = $cuta.attr("data-target")
        console.log("this.ogwidth:");
        console.log(this.ogwidth);
        $(".leaflet-popup-content").css("width", this.ogwidth + "px")
        $(this.el).find(".pu-copy").addClass("hidden")
        $(this.el).find(".pu-copy-" + tel).removeClass("hidden")
        if (tel == "episodes") {
            return this.pulleps()
        } else if (tel == "feedback") {
            return this.issue($cuta)
        } else {
            return this
        }
    },
    rewire: function() {
        // wire up those tooltips
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
                position: "right"
            })
            // and the submit button
            //
            // $(this.el).find("button[type='submit']").click(function(t){
            // this.issue_submit()
            // });
    },
    issue_submit: function(e) {
        var it = $(this.el).find("[data-class='pu-issue-title']").attr("placeholder")
        var ib = $(this.el).find("[data-class='pu-issue-body']").val()
        var ic = $(this.el).find("[data-class='pu-issue-contact']").val()
        if (typeof ib == 'undefined' || ib == null || ib == '') {
            $(this.el).find("[data-class='pu-issue-body']").attr("placeholder", "please provide some sort of clue to what's wrong")
            $(e.currentTarget).html("<span class='glyphicon glyphicon-warning-sign'></span> Submit")
        } else {
            appActivity.set({
                    message: "submitting issue to GitHub...",
                    show: true
                })
                // do the submit
            console.log(it);
            console.log(ib);
            console.log(ic);
            // success will put a checkmark in submit button or something - github (octokat) doesn't return much
            appActivity.set({
                message: null,
                show: false
            })
            $(e.currentTarget).html("<span class='glyphicon glyphicon-thumbs-up' disabled></span> Thanks")
        }
        return this
    },
    //     reset: function(e){
    // $guts = $(this.el)
    // $guts.parent().find('div').first().html('');
    // $guts.parent().removeClass("newspaceready")
    // var lid = this.model.get("leafletid")
    // map._layers[lid].closePopup()
    // return this
    //     },
    pulleps: function(source) {



        var locid = this.model.get("cartodb_id")
        var loctype = this.model.get("geom_type")
            // ay ya ya this is fuxked up lazy #returnto
        // localStorage.setItem("activelocid", locid)
        // localStorage.setItem("activeloctype", loctype)
            // because we don't wan cbblistview to always show itself (and why bother passing a var), reveal it here manually
        // appRoute.navigate(pullURL("#query"), {
        //         trigger: false,
        //         replace: false
        //     })

        appCBB.activate(locid,loctype)
appRoute.navigate(pullURL("#query"), {
                trigger: true,
                replace: true
            })

        // appHiderView.setpos("episodes-pu","true")
        // appCBBListView.pulleps("pu")
        return this
    },
    issue: function(el) {
        // this.prepspace()
        $(".leaflet-popup-content").css("width", "450px")
        var locid = this.model.get("cartodb_id")
        return this
    },
    //     prepspace: function(replace) {
    // $guts = $(this.el)
    // var gwide = $guts.width()
    // // $guts.parent().css("overflow","hidden").css("height","400px").css("weight","500px")
    // $guts.parent().addClass("newspaceready")
    // // $guts.css("position","relative").css("left","85%");
    // // $guts.parent().prepend('<div class="altspace pull-left" style="width:'+gwide+'px;">stuff can actually go here?</div>');
    // $guts.parent().prepend('<div class="altspace pull-left">stuff can actually go here?</div>');
    //     return this
    //     },
    render: function() {
        // bc we'll be messing with this width once in a while, we sock away the original
        this.ogwidth = $(".leaflet-popup-content").width()
        $(this.el).html(this.template(this.model.toJSON()))
        return this.rewire()
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
        var altelstring = this.model.get("altel")
        if (typeof altelstring == 'undefined' || altelstring == false || altelstring == null) {
            var altel = $("#activity-default").find(".throbber");
        } else {
            var altel = $(altelstring)
        }
        if (show == true) {
            altel.addClass("refreshing-loader")
                // NProgress.configure({
                //         parent: altel
                //     });
                //     NProgress.start();
        } else {
            altel.remove(".throbber")
                // NProgress.done()
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
    rewire: function() {
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
        return this.rewire()
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
    reset: function() {
        $(this.el).addClass("hidden")
        $(".episodes-arrow").addClass("hidden")
        return this
    },
    render: function() {
        $(this.el).empty()

// by the time we get here, plainview will have an active element, go get it to match its position
var ael = $(".carto-plain-title.true")
$(this.el).css("top",$(ael).position().top);
// and that stupid arrow
$(".episodes-arrow").removeClass("hidden").css("top",$(ael).position().top);

        // $(this.el).css("top", this.collection.verticaloffset - 20)
        // $('.episodes-arrow').removeClass('hidden').css("position", "relative").css("top", this.collection.verticaloffset - 10)
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
        return this.rewire()
    },
    rewire: function() {
        // class="loc-trigger" data-toggle="tooltip"
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            html: true,
            title: "These links will load the results in the background - hide the map (<strong>CTRL KEY</strong>) or switch to the query tab to interrogate further."
        })
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