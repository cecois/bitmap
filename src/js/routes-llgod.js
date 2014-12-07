var Route = Backbone.Router.extend({
  routes: {
    "": "default",
    "home": "home",
    "beta": "beta",
    "search/lll:hash": "searchWithHashed",
    "search/p:page/:querystring": "search",
    "search": "searchEmpty",
    "fmp/:disc": "searchFromFMP",
    "examine": "examine",
    "download": "stageDownload",
    "download/:apikey/:sessionid": "download",
    "details": "detailsEmpty",
    "details/": "detailsEmpty",
    "details/:series/:handle": "detailsWithHandle",
    "updates": "updatesEmpty",
    "updates/": "updatesEmpty",
    "updates/:series": "updatesMissingRange",
    "updates/:series/": "updatesMissingRange",
    "updates/:series/:range": "updates",
    "help": "help"
  },
  stageDownload: function() {
    /* ----------
why this? well, we want anybody who has apikey+sessionid in hand to be able
to run straight into their download list

but most cases they won't yet have this (e.g. if they're just here doin' stuff)
so we'll pull it for them
------------ */
    // if (cookies == true) {
    //     sessionid = $.cookie('lllgeo_download_session');
    // } else{
    //   sessionid = 
    // };
    // definitely this is gui, so apikey is hardwired to 0
    apikey = 0;
    this.download(apikey, sessionkooky);
  },
default:

  function() {
    this.home()
  },
  home: function() {
    if (typeof appHome == 'undefined') {
      appHome = new Home({});
      appHomeView = new HomeView({
        model: appHome
      });
    }
    var $el = $("#paneContainer > #home");
    // this elString thing ties routig to nav-tabs
    // every route will update corresponding tab state
    var elString = "home";

    wakeTheKids(elString);
  },
  help: function() {
    var elString = "help";

    wakeTheKids(elString);
  },
    beta: function() {
    var elString = "beta";
    wakeTheKids(elString);
  },
  examine: function() {
    var elString = "examine";
    wakeTheKids(elString);
  },
  resolveHandleSolr: function(series, handle) {
    /* ----------
What we're doing here is taking a resource handle and resolving it to its actual id using solr.
Why not query directly using the handle? Because it would be wasteful to make a new model copy of Hit, since nearly all of the functionality will be the same. And Hit needs the id, cannot really use just the handle. It's still less wasteful to make two quick solr queries than to maintain another model and view pair that does almost all of the same things (just with, you know, more detail).
------------ */
    var json = (function() {
      var json = null;
      $.ajax({
        url: solrRoot + 'series:' + series + '+AND+handle:' + handle,
        async: false,
        type: 'GET',
        dataType: 'json',
        'success': function(data) {
          // we know there should really only be one unless we've effed up the Solr/Mongo end of things
          json = data.response.docs[0]._id;
        }
      });
      return json;
    })();
    return json
  },
  detailsEmpty: function() {
    masterClearLayers()
    var $el = $("#paneContainer > #details");
    if (typeof appDetail == 'undefined') {
      $el.html("<div class='row' style='padding-top:50px;'><div class='alert span6 offset4'>No series/handle combo (e.g. '<a href='#details/vmap01/hydro_coasta'>vmap01/hydro_coasta</a>' or '<a href='#details/srtm01/srtm01'>srtm01/srtm01</a>') has been selected for more detail. Probably easiest to just <a href='#search/p1/*:*'>search</a> and use the buttons on each hit to request details.</div></div>")
    }
    var elString = "details";
    wakeTheKids(elString);
  },
  updatesEmpty: function() {
    masterClearLayers()
    var $el = $("#paneContainer > #updates > #updatesViewWrapper");
    if (typeof appUpdates == 'undefined') {
      $el.html("<div class='row' style='padding-top:50px;'><div class='alert span6 offset4'>No series (e.g. '<a href='#updates/dted00'>dted00</a>' or '<a href='#updates/srtm01'>srtm01</a>') has been selected to check against.</div></div>")
    } else {
      var series = appUpdates.get("series")
      var range = appUpdates.get("range")
      appRoute.navigate("updates/" + series + "/" + range, {
        trigger: false,
        replace: false
      });
      $el.html(appUpdatesView.render().el)
      appUpdatesSliderView.render()
    }
    var elString = "updates";
    wakeTheKids(elString);
  },
  updatesMissingRange: function(series) {
    // we'll get things set up by clearing layers and setting the el
    // we'll also check to see if the series is actually an individual mongo id
    // then finish the route accordingly
    masterClearLayers()
    var $el = $("#paneContainer > #updates > #updatesViewWrapper");
    var t = Time.now;
    // ok, so we first test to see if the "series" is actually just a mongo id for a single record
    var seriesOrId = seriesInterp(series);
    switch (seriesOrId.length) {
    case 2:
      // if there was an "id:" string to split on (meaning there were two pieces), we set range to zero
      // why? harkens back to Slim framework not handling option route pieces properly, so we just use 0 as an unequivocal marker
      appRoute.navigate("updates/" + series + "/0", {
        trigger: true,
        replace: true
      });
      break
    case 1:
      // no "id:" marker, so we'll just proceed as normal
      var range = t.year() + '-' + t.format('m') + "-01:" + t.year() + '-' + t.format('m') +'-'+ t.format('d');
      appRoute.navigate("updates/" + series + "/" + range, {
        trigger: true,
        replace: true
      });
      break;
    }
  },
  getMeta: function(series, handle) {
    var murl = '../api/v1/meta/' + series + '/' + handle;
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
  order: function(series, handle) { // var $el = $("#paneContainer > #order");
    // we have a whole new set of layers to mess with, so masterClear, here, is appropriate
    masterClearLayers()
    // if (typeof appOrder == 'undefined') {
    appOrder = new Order({
      "series": series
    });
    /* ----------
but first! we can shut this whole thing down if the requested series is already full, i.e. there won't be anything to order. We check this using the meta api route, which returns the mongo data for the series, in which we either find or do not find a complete=yes
------------ */
    appOrderView = new OrderView({
      model: appOrder
    });
    var meta = this.getMeta(series, handle)
    if (typeof meta !== 'undefined') {
      if (meta.complete != true) {
        /* ----------
here we load up the reference layers+models+views
------------ */
        // layers piped in from a db/config
        appOrderLayers = new OrderLayersCollection();
        appOrderLayers.setSeries(series);
        // and a menu view for stylish swappin'
        appOrderLayersView = new OrderLayersView({
          collection: appOrderLayers
        });
        // appOrderLayersMenuView.setSeries(series);
        // go get em
        appOrderLayers.fetch({
          success: function(collection) {
            var $el = $("#mnuOrderLayer");
            $el.empty();
            // and the prestige! (...of the menu)
            $el.html(appOrderLayersView.render().el);
          }
        });
      } else {
        appOrder.set({
          series: "unavailable"
        })
      }
    }
    // }
    appOrderView.render().el;
    var elString = "order";
    wakeTheKids(elString);
  },
  detailsWithHandle: function(series, handle) {
    // we have a whole new set of layers to mess with, so masterClear, here, is appropriate
    masterClearLayers()
    var mid = this.resolveHandleSolr(series, handle);
    var $el = $("#paneContainer > #details");
    $el.empty();
    appDetail = new Detail({
      "id": mid
    });
    appDetailView = new DetailView({
      model: appDetail
    });
    // let's go get that model, but note the 'middleware' in postParse
    appDetail.fetch({
      success: function(model) {
        $el.html(appDetailView.postParse().render().el);
        toolHit();
      },
      error: function(response) {
        $el.html("<div class='row' style='padding-top:50px;'><div class='alert alert-error span6 offset4'>Well...uh...this is embarrassing, but this thing has broken at the knees and cannot return results right now.</div></div>")
      }
    });
    var elString = "details";
    wakeTheKids(elString);
  },
  updates: function(series, range) {

    // we have a whole new set of layers to mess with, so masterClear, here, is appropriate
    // here's where we'll branch one way or another based on whether the range is 0
    var seriesArr = seriesInterp(series);
    var mongoid = seriesArr[1];

    masterClearLayers();
    var $el = $("#paneContainer > #updates > #updatesViewWrapper");
    $el.empty();
    if (typeof range == 'undefined') {
      console.log("need to set range")
    }
    if (typeof appUpdates == 'undefined') {

      // range is zero? (meaning there was an id: passed as series) or not
      if (range == "0") {
        appUpdates = new Updates({
          "mongoid": mongoid,
          "range":range
        })
      } else {
        appUpdates = new Updates({
          "series": series,
          "range": range
        });
      }
      appUpdatesView = new UpdatesView({
        model: appUpdates
      });
              if (typeof appUpdatesSliderView == 'undefined') {
          appUpdatesSliderView = new UpdatesSliderView({
            model: appUpdates
          });
        }
    } else //appUpdates extant already
    {

      if (range == "0") {
        appUpdates.set({
          "mongid": mongoid,
          "range":range
        })
      } else {
        appUpdates.set({
          "series": series,
          "range": range
        });

      }
     
    }
      $el.html(appUpdatesView.render().el)
      if (range !== "0") {appUpdatesSliderView.render()}
    var elString = "updates";
    wakeTheKids(elString);
  },
  download: function(apikey, sessionid) {
    // we have a whole new set of layers to mess with, so masterClear, here, is appropriate
    masterClearLayers()
    var $el = $("#paneContainer > #download");
    $el.empty();
    // we want a new downloads obj using apikey and session
    appDownloads = new Downloads({
      "apikey": apikey,
      "sessionid": sessionid
    });
    appDownloadsQueueView = new DownloadsQueueView({
      collection: appDownloads
    });
    appDownloads.fetch({
      success: function(collection) {
        if(collection.length > 0){
                // and the prestige!
                $el.html(appDownloadsQueueView.render().el);}
                else 
                  $el.html("<div class='row' style='padding-top:50px;'><div class='alert alert-error span6 offset4'>None! Sorry, but there just aren't any.</div></div>")
      },
      error: function(response) {
                $el.html("<div class='row' style='padding-top:50px;'><div class='alert alert-error span6 offset4'>Well...uh...this is embarrassing, but this thing has broken at the knees and cannot return results right now.</div></div>")
      }
    });
    var elString = "download";

    wakeTheKids(elString);
    appModal.set({
      "message": "Please be aware that there may be use and/or distribution limitations associated with one or more of these downloads."
    });
    // the download warning can get annoying FAST-LIKE!
    var dlwarningkooky = $.cookie('lllgeo_download_warning');
    // if the cookie is there (value agnostic)
    if (dlwarningkooky != 'seen') {
      // show it
      $('#modalContainer').modal('show');
    }
    // let's say it was shown this time -- enough already!
    $('#modalContainer').on('hidden', function() {
      $.cookie('lllgeo_download_warning', 'seen', {
        expires: 1
      });
    })
  },
  queue: function(apikey, session) {
    var elString = "queue";
    wakeTheKids(elString);
  },
  search: function(page, querystring) {
    // we have a whole new set of layers to mess with, so masterClear, here, is appropriate
    masterClearLayers()
    var elString = "search";

    /* ----------
the url has a page and querystring string, ya?
------------ */
    appSearch.set({
      "querystring": querystring
    })
    // fire it off!
    appSearchExec();
    wakeTheKids(elString);
  },
  searchFromFMP: function(disc) {
    // we have a whole new set of layers to mess with, so masterClear, here, is appropriate
    masterClearLayers()
    var elString = "search";

    var murl = '../api/v1/discs/'+disc+'/json/searchwith';
    var json = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': murl,
        'dataType': "json",
        'success': function(data) {
          json = data[0];
          var envo = json.envelope;
          var envolabel = json.resid;
          var querystring = json.series;


    var polygo = addPolyFromWKT(envo,envolabel);

    if(polygo == true){

          appConsole.set({
            "message":"found the "+envolabel+" disc, see the map for its envelope"
          })


      } else{
            appConsole.set({
            "message":"failed to find disc: "+envolabel
          })
        }

        appSearch.set({
          "querystring": querystring
        })
        // fire it off!
        appSearchExec();
        wakeTheKids(elString);

        } //success
      });
      return json;
    })();

  },
  getHashed: function(hash) {
    var hashUrl = '../../' + hash + ".json";
    var json = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': hashUrl,
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    })();
    return json;
  },
  searchWithHashed: function(hash) {
    var elString = "search";
    /* ----------
we receive a hash from the url
and we shop it to a db full of search/hash pairs
ALTHOUGH RIGHT NOW IT'S ALL FAKE #returnto
------------ */
    /* -------------
what is this? well, i couldn't get
backbone native fetching to work with the appsearch model, so...
i will manually fetch hashed saved searches and pass the 
whole model manually here
------------- */
    var hashModl = this.getHashed(hash);
    appSearch.set(hashModl);
    // fire it off!
    appSearchExec();
    wakeTheKids(elString);
  },
  searchEmpty: function() {
    var elString = 'search';
    /* ----------
this one is peculiar (but will repeat for every tab, prob): 
it could be that we just want to hit #search and see nothing, 
but more likely we've already done a search (so we have a viable appSearch model)
but the navigated away to another tabe and want to return.

If we do nothing here, the "current" appSearch will no longer be reflected in the url
so we'll first check appSearch for params, then nav to it
------------ */
// if no term was provided, we still wanna run it and let the spatial extent inform the results alone
      var queryInput = $("#inputSearch input");
      if(queryInput.val() == ''){queryInput.val("*:*")
        appSearch.set({querystring:"*:*"})
    }
      appSearchExec();
    var $el = $("#paneContainer > #search");
    // $el.html('<div class="alert span5 offset2">I have nothing for which to search :-(</div>')
    wakeTheKids(elString);
  }
});
var appRoute = new Route();
Backbone.history.start();