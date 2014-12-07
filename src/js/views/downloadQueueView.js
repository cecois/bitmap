var DownloadQueueView = Backbone.View.extend({

  tagName: "div",
  className: "row",
  events: {
    // "change": "render",
    "click .btnDLGroup .btn": "detool",
    "click .btnDLRemove": "removeDownload",
    "click .btnDLSubset": "subsetDownload"
  },

  template: Handlebars.templates['downloadQueueViewTpl'],
  templateOver: Handlebars.templates['downloadQueueViewOversizeTpl'],
  initialize: function() {
    var handl = this.model.get("handle");
    var series = this.model.get("series");
    // we want this so we can pick at the metadata at will
    var meta = this.getMeta(series,handl);

    if(typeof meta != 'undefined'){
    
        var qud = this.model.get("queued");
    
        var titl = meta.title;
    
        var descrip = meta.description;
    
        var rites = meta.rights;} else{

// dummies
          var qud = true;
        var titl = "Metadata Request Failed";
        var descrip = "the data should still download properly";
        var rites = "Metadata Request Failed";

        }

    this.model.set({
      "title": titl
    }, {
      silent: true
    });
    this.model.set({
      "rights": rites
    }, {
      silent: true
    });



    /* ----------
HANDLEBARS HELPERS
------------ */

    Handlebars.registerHelper('dlcnt', function(object) {


      var dlcnt = object.length;
      return new Handlebars.SafeString(
      dlcnt);

    });


    Handlebars.registerHelper('sizeBeautified', function(object) {
      var valkb = object*1024;
      val = $.filesizeformat(object); // bc model's loadsize is actually in bytes
      return new Handlebars.SafeString(
      val);

    });

    Handlebars.registerHelper('pctRounded', function(object) {

      val = object.toFixed(1);
      return new Handlebars.SafeString(
      val);

    });


    Handlebars.registerHelper("each_with_index", function(array, options) {
      var total = array.length;
      var fn = options.fn;
      var buffer = "";
      for (var i = 0, j = array.length; i < j; i++) {
        var item = array[i];
        // stick an index property onto the item, starting with 1, may make configurable later
        item.index = i + 1;
        item.realindex = i;
        item.total = total;
        // show the inside of the block
        buffer += fn(item);
      }

      // return the finished buffer
      return buffer;

    });


    Handlebars.registerHelper('compare', function(lvalue, operator, rvalue, options) {

      var operators, result;

      if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
      }

      if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
      }

      operators = {
        '==': function(l, r) {
          return l == r;
        },
        '===': function(l, r) {
          return l === r;
        },
        '!=': function(l, r) {
          return l != r;
        },
        '!==': function(l, r) {
          return l !== r;
        },
        '<': function(l, r) {
          return l < r;
        },
        '>': function(l, r) {
          return l > r;
        },
        '<=': function(l, r) {
          return l <= r;
        },
        '>=': function(l, r) {
          return l >= r;
        },
        'typeof': function(l, r) {
          return typeof l == r;
        }
      };

      if (!operators[operator]) {
        throw new Error("Handlebars Helper 'compare' doesn't know the operator " + operator);
      }

      result = operators[operator](lvalue, rvalue);

      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }

    });

    this.model.bind('change', function() {


      this.render();

      return this

    }



    , this);

  },
  render: function() {

    /* ----------
here's why: returning from subsetting view with mouse hovering over a tooltippable el
will fire the tooltip
but then we're re-rendering, so the tooltip becomes a zombie; here we just kill 'em all first
------------ */
    this.detool()
var loadsize=this.model.get("loadsize") //remember this is in bytes, not kb, hence the bump-up

if(loadsize > 2147483648){ //2 GB
    $(this.el).html(this.templateOver(this.model.toJSON()));
} else{

    $(this.el).html(this.template(this.model.toJSON()));
  }

    // and just a little sugar that adjusts text size by download count
    var dlcnt = this.model.get("outfiles").length;
    var fonx = dlcnt;
    if (fonx < 9) {
      $(this.el).find("li").css("font-size", "17px");
    } else {
      $(this.el).find("li").css("font-size", "11px");
    }
    return this.rewire()

  },

  rewire: function() {

    this.$(".btnDLGroup > .btn").tooltip({
      trigger: "hover",
      placement: "right"
    });

    return this
    .bakeProgressPie()
  },
  detool: function() {

    this.$(".btnDLGroup > .btn").tooltip('destroy');

  },
  title: function() {

    var handl = this.get("handle");
    var title = this.getMeta(handl, "title");
    this.set({
      "title": title
    }, {
      silent: true
    });


  },
  selectiveRender: function() {

/* ----------
selectiveRender is a more meticulously controlled render function. It's called by selectiveFetch (on a timer)
but note that it first checks if a hold was placed on the view.

A "hold"? Y, well in order to prevent render here (which destroys the subsetView), 
we first make sure we're not supposed to be on hold.
------------ */    


    var diff = this.model.changedAttributes();
    var subsetElVis = $(".dlSubset").is(":visible");
    var onhold = appDownloadsQueueView.options.onhold;
    if (onhold != true) {
      this.render()
    }


  },

  selectiveFetch: function() {


    /* ----------
selectiveFetch is called by setInterval and is designed to maintain a 
connection to mongo so that the download queue can feedback to the user a given job's progress.

Note that it is an asynchronous call that in turn runs selectiveRender.
------------ */

    /* ----------
#returnto - 
This is pretty wasteful, as we don't really need the entire model just to update the pctdone and outfiles values once in a while.
Need to add an endpoint that will return just the pctdone and a count of outfiles (not the sources therein)
------------ */

    var mid = this.model.get("_fakeid");
    var murl = '../api/v1/downloads/' + apikey + '/' + sessionkooky + '/' + mid;

    var json = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': murl,
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    })();

    this.model.set({
      pctdone: json.pctdone
    }, {
      silent: true
    })
    this.model.set({
      outfiles: json.outfiles
    }, {
      silent: true
    })

    this.selectiveRender()

    return this

  },
  getMeta: function(series,handl) {
    var murl = '../api/v1/meta/' + series +'/' + handl;
    var json = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': murl,
        'dataType': "json",
        'success': function(data) {
          json = data[0];
        }
      });
      return json;
    })();

    return json;

  },
  downloadCount: function() {

    var dl = this.model.get("outfiles").length;
    return dl;

  },
  removeDownload: function() {
    // first we kill any open tooltips
    this.detool()
    this.model.save("queued", false, {
      success: function(model, response) {},
      error: function(model, response) {

      }
    });
  },

  subsetDownload: function() {
    // first we kill any open tooltips
    this.detool()
    // then we launch a new view with the same model
    appSubsetView = new DownloadSubsetView({
      model: this.model
    })
    // also we kinda need a hold put on this view so we can prevent errant renders upon setinterval
    appDownloadsQueueView.options.onhold = true;
    $(this.el).html(appSubsetView.render().el);

  },
  bakeProgressPie: function() {


$(this.el).find(".chart-wrapper").tooltip({
  placement: 'right',
  trigger: 'hover',
  delay: 0,
  title: function(){

      var resp = "This chart will update every 60 seconds."

var n = Time.now

    if(typeof intervalStarted != "undefined"){
   

var r = (intervalStarted - 60000) - n;
var tdiff = new Time(r);

    resp = "This chart will update in "+tdiff.second()+ " seconds.";

    return resp;

    } else {

      return resp;

    }

  }
})

    $(this.el).find(".chart").empty();
    var pct = this.model.get("pctdone")


    var w = 30,
      h = 30,
      r = Math.min(w, h) / 2,
      data = [pct],
      color = d3.scale.ordinal().range(["gray", "red", "black"]);
    arc = d3.svg.arc().endAngle(function(d) {
      return 2 * Math.PI * (d / 100);
    }).outerRadius(r).innerRadius(0).startAngle(0);

    var vis = d3.select(this.el).select(".chart").append("svg:svg").attr("width", w).attr("height", h);
    var arcs = vis.selectAll("g.arc").data(data).enter().append("svg:g").attr("class", "arc").attr("transform", "translate(" + r + "," + r + ")");

    arcs.append("svg:path").attr("fill", function(d, i) {
      return color(i);
    }).attr("d", arc);

    arcs.append("text")
    .attr("text-anchor","middle")
    .attr("dy",".2em")
    .attr("dx",".1em")
    .attr("font-color","white")
    // .text(function(d){return d.toFixed(1)+"%"});
    .text(function(d){return Math.round(d)+"%"});



    return this
  }



});
