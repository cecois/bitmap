var DownloadsQueueView = Backbone.View.extend({

  tagName: "div",
  events:{"click #downloadBrowserWarning .checkbox":"denagDownload"},
  className: "downloadsQueued span12",
  initialize: function() {


    var colxIndex = 0;
    Handlebars.registerHelper('colx', function() {

      if (colxIndex == 3) {
        colx = "colright";
      } else {
        colx = "colleft";
      }
      if (colxIndex > 3) {
        colxIndex = 0
      }

      colxIndex++;
      return colx;
    });

    /* ----------
HANDLEBARS HELPER
------------ */
    // this one from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
    // if you need other comparisons (>,<, etc.) return to that post
    Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
      if (arguments.length < 3) throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });
  },

  render: function() {

    $(this.el).empty();

    $(this.el).prepend('<div class="fader span12"></div>');
    $(this.el).append('<div style="height:33px;"></div>');


console.log($.cookie('lllgeo_download_browser-warning'))
if ($.cookie('lllgeo_download_browser-warning') !== "false") {
    $(this.el).html('<div id="downloadBrowserWarning" class="alert alert-info">We advise right- or option-clicking these links in order to force a background download. In some browsers, single-clicking will cause the download to commandeer the browser window until it completes.<div><label class="checkbox"><input type="checkbox"> Hide this nag (requires cookies to persist).</label></div></div>');
}
    // for each requested resource, create a view and prepend it to the list.
    this.collection.each(function(download) {
      var downloadQueueView = new DownloadQueueView({
        model: download
      });
      $(this.el).append(downloadQueueView.render().el);

      setInterval(function() {
        downloadQueueView.selectiveFetch();
        intervalStarted = new Date().getTime();
        
      }, 60000);


    }, this);



    return this
  },
  denagDownload:function(){

    $.cookie('lllgeo_download_browser-warning', 'false', { expires: 365 });
    $(this.el).find("#downloadBrowserWarning").hide();

  }

});
