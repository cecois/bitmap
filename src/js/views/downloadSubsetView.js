var DownloadSubsetView = Backbone.View.extend({
  tagName: "div",
  className: "dlSubset",
  events: {
    "click #subsetToolbar .btn": "detool",
    "click #btnSubsetAccept": "acceptNewBounds",
    "click #btnSubsetCancel": "destroyResponsibly"
  },

  template: Handlebars.templates['downloadSubsetViewTpl'],

  initialize: function() {
    console.log(this)
    /* ----------
HANDLEBARS HELPERS
------------ */

    Handlebars.registerHelper('dlcnt', function(object) {


      var dlcnt = object.length;
      return new Handlebars.SafeString(
      dlcnt);

    });
    Handlebars.registerHelper('sizeBeautified', function(object) {

      val = $.filesizeformat(object);
      return new Handlebars.SafeString(
      val);

    });



    map.addLayer(drawnItems);
    var drawOps = {
      polyline: false,
      polygon: false,
      marker: false,
      circle: false,
      // Turns off this drawing tool
      rectangle: {
        shapeOptions: {
          clickable: false
        }
      }
    }

    // here's the control we'll use for drawing
    drawControl = new L.Control.Draw(drawOps);

    map.addControl(drawControl);
    drawControl.handlers.rectangle.enable();


    map.on('draw:drag', function(e) {

      var bbox = this.model.get("howmuch");

      var originalArea = pseudoAreaFromBbox(bbox);


      var dragStartLat = e.lat_orig;
      var dragStartLng = e.lng_orig;

      var dragNowLat = e.lat_new;
      var dragNowLng = e.lng_new;



      var horizontalNew = (Math.abs(dragNowLng - dragStartLng))
      var verticalNew = (Math.abs(dragNowLat - dragStartLat))


      var newArea = (horizontalNew * verticalNew);


      var areaRatio = (newArea / originalArea)


      var newSize = ((areaRatio) * this.model.get("loadsize"))

      newSize = $.filesizeformat(newSize);

      $(".leaflet-draw-label-single").text("new payload size estimate: ~" + newSize);

    }, this);

    map.on('draw:rectangle-created', function(e) {
      drawnItems.addLayer(e.rect);

      var newBounds = e.rect.getBounds().toBBoxString();
      this.model.set({
        "estimatebbox": newBounds
      }, {
        silent: true
      });
      this.estimateNewSize();

      // note we could just keep the control active
      drawControl.handlers.rectangle.disable();

      this.render();
    }, this);


this.model.set({covonoff:true});


    var appHitCoverageLayerView = new HitCoverageView({model: this.model}).render();


    this.model.on('change:estimatedloadsize change:estimateddlcnt', this.render, this);
    this.render().rewire();



  },
  destroyResponsibly: function() {

    // kill any tooltips that might have been caught wide open
    this.detool();
    // masterClearLayers()
    rasterEnvelopes.clearLayers()
    // a whole chain of killables
    drawControl.handlers.rectangle.disable();
    map.removeControl(drawControl);
    drawnItems.clearLayers();
    map.removeLayer(drawnItems);


    this.undelegateEvents();
    $(this.el).removeData().unbind();



    /*
when we launched the subsetview, we put a hold on the queue view so we could prevent render. here we reset it
*/

    appDownloadsQueueView.options.onhold = false;
    appDownloadsQueueView.render();
    return this
  },


  acceptNewBounds: function() {

    this.detool()

    var howmuchNew = this.model.get("estimatebbox");
    this.model.save({
      howmuch: howmuchNew
    }, {
      success: function(model, response) {

        var resp = response.status;

        if (resp == "OK") {
          appSubsetView.model.fetch()
        }


      }
    }, {
      silent: true
    });

    return this.destroyResponsibly()
  },
  estimateNewSize: function() {

    // we'll send these to size route
    var newCoords = this.model.get("estimatebbox");
    var series = this.model.get("series");
    var handle = this.model.get("handle");


    var ls = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': "../api/v1/size/" + series + "/" + handle + "/" + newCoords + "/bytes",
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    })();
    // the loadsize response will be written to the model
    this.model.set({
      "estimatedloadsize": ls
    }, {
      silent: true
    });

    // then we'll just guess at the filecount
    // note this is now a #returnto because the max chunk here may actually change in php
    // and this could therefore be handled more elegantly
    var estimateddlcnt = Math.ceil((ls / 524288000));
    this.model.set({
      "estimateddlcnt": estimateddlcnt
    }, {
      silent: true
    });

  },

  render: function() {

    $("#subsetPane").html($(this.el).html(this.template(this.model.toJSON()))).prepend($(".leaflet-control-container"));

    return this.rewire()

  },

  rewire: function() {
    this.$("#btnDrawDrag").toggle(function() {
      drawControl.handlers.rectangle.enable();
    }, function() {
      drawControl.handlers.rectangle.disable();
    });
    this.$("#subsetToolbar > span").tooltip({
      trigger: "hover",
      placement: "top"
    });
    return this
  },
  detool: function() {
    this.$("#subsetToolbar span").tooltip('destroy')

  }


});