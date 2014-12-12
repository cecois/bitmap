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
        // SWAP THIS OUT WHEN HANDLEBARS GETS RUNNING
        $(this.el).html(this.template(this.model.toJSON()));
        // console.log(this.model.get("name") + " model");
        // $(this.el).html("<a>"+this.model.get("name")+"</a>");
        // $(this.el).html("heyo");
        // $(this.el).addClass(this.model.get("active"))
        // $(this.el).addClass(this.model.get("icon"))
        // $(this.el).attr("href", this.model.get("url"))
        // $(this.el).css("font-size", this.model.get("nudge"))
        // now go show the associated el
        // the url doubles as a jq selector
        // $(this.model.get("url")).toggle()
        return this
        // .trailerel()
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
var CartoPlainView = Backbone.View.extend({
    // tagName: "li",
    el: "#query-list",
    template: Handlebars.templates['cartoPlainView'],
    initialize: function() {
        // this.collection.bind('change active', this.render, this);
        return this.render()
    },
    rewire: function(){

$('#query-list').liveFilter("#query-livefilter",'li',{filterChildSelector:'span'});

return this

    },
    render: function() {
        if (verbose == true) {
            console.log("rendering cartoplain")
            console.log(this.collection)
        }
        
// as good a place as any -- if we're firing here then the arto material changed
appConsole.set({message:"queried <a href='http://cartodb.com'>CartoDB</a> with: <code>"+appCartoQuery.get("sqlstring")+"</code>"});
        
        // notice we are wrapping the collection in rows: cuz cartodb does it
        $(this.el).html(this.template({rows:this.collection.toJSON()}));
        
        return this
        .rewire()
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
/* -------------------------------------------------- BMV -----------------------  */
var BaseLayerMenuItemView = Backbone.View.extend({
    tagName: "li",
    className: "span1",
    template: Handlebars.templates['baseLayerMnuItem'],
    events: {
        "click .mnuThumbnail": "setActive",
        // "click a":"killtt",
        // "click a":"rewire"
        // "click":"debug"
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
    setActive: function(){
        // first a little sugar
        // $("#BaseMapConsole").css("color","white").animate(1500)
if(this.model.get("active") == true){
    // it's already active, do nothing
    return this
} else {
    // voodoo? let's verify this works
    _.invoke(appBaseLayers.models, function(){this.set({active:false},{silent:true})});
this.model.set({active:true})
  appConsole.set({message:"basemap switched to "+this.model.get("nom")})
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
        // this.$("a").tooltip({placement:'top',trigger:'hover',delay: { show: 1200, hide: 500 }});
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
        var baselayerTrue = _.find(this.collection.models, function(lay) {
            // lay.get("active")==true ? function(){return lay} : function(){return null};
            if(lay.get("active")==true)
                {return lay}
        });
        // var bltDef = baselayerTrue.get("definition")

        this.collection.each(function(baselayer) {
            var baseLayerMenuItemView = new BaseLayerMenuItemView({
                model: baselayer
            });
            $(this.el).append(baseLayerMenuItemView.render().el);
            if (typeof appBaseMap == 'undefined') {
                appBaseMap = new BaseMap(baselayerTrue)
                    if (typeof appBaseMapView == 'undefined') {appBaseMapView = new BaseMapView({model:appBaseMap})}
            } else {
                appBaseMap.set(baselayerTrue)
            }
        }, this);
        return this.rewire()
    },
    rewire: function() {
        console.log("render of BLMV");
        // $("#BaseMapConsole").html(this.model.get("nom"))
        // #returnto -- use underscore to pull this from the collx
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
/* -------------------------------------------------- BASEMAPVIEW -----------------------  */
var BaseMapView = Backbone.View.extend({
    id: "map",
    initialize: function() {
        // this.updateBaseMap();
        this.model.bind("change", this.updateBaseMap, this);
        // this.model.bind("change:bbox_west change:bbox_south change:bbox_east change:bbox_north", this.render, this);
        this.render();
    },
    render: function() {
        var mapBounds = this.model.getBounds();
        
        // map.fitBounds(mapBounds);
        console.log("then et out and do a zoomcheck")
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
    return this
    .render()
  }
});