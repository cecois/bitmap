/* ----------
a little atypical, this basically binds to a true/false model and, if true, wires
various, select DOM elements with helpful popovers that help users be more familiar with app functionality
------------ */
var HelpNagView = Backbone.View.extend({

	el: $("#helpNagWrapper"),
  events: {
    "click": "toggle"
  },
  template: Handlebars.templates['helpNag'],
  initialize: function() {
    this.model.bind("change:status", this.getStatus, this);
    this.render();

  },

  getStatus: function(){
    // is the model's status true or false? process accordingly
    var tf = this.model.get("status") == true ? this.render() : this.unwire();

  },

	render: function() {
    // ok, model is true, let's render and wire

    $(this.el).html(this.template(this.model.toJSON()));

    return this.selfHelp()
    .toolTipize()

  },
  unwire: function(){
    // model is false, re-render, but unwire
    $(this.el).html(this.template(this.model.toJSON()));
    return this.selfHelp()
    .toolTipize()
  },
  toolTipize: function(){

    var tf = this.model.get("status")
/*
here we just have an array of dom elements and the corresponding message that will appear once the helpnag option is turned on
*/
var tipArray = {
      "#appendedInputButtons": "either placenames or keywords go here; pick from the list to zoom to a location or click 'Search for Data,' to...search for data",
      "#header":"you can press the '`' (backtick - under the tilde) key to toggle almost the entire set of elements that hover over the map, including this header and navbar",
        "#btnGeocode": "click to locate an area/place of interest and (potentially) zoom to it",
        "#btnSearch": "click to find datasets in our catalog by keyword (see the Help tab for some pro tips)",
        ".btnEnvelope": "display the entire spatial extent of the dataset",
        ".btnPreview": "render (a lower-resolution or feature-limited) view of actual data",
        ".btnCoverage": "display the extent of every individual tile contained in the dataset",
        ".btnDetails": "see more specific information about this dataset",
        ".btnDownload": "add this dataset to your queue (you can see it/adjust it using the 'Download Queue' tab, above)",
        ".orderLayerMnuItem":"in-house, recently-ordered, and requestable layers can be toggled on/off by clicking here",
        "#paneContainer":"an important feature here is that you can show/hide this main area with the 'z' key",
        ".icon-sun":"this means that the given layer's spatial extent explicitly intersects the spatial extent passed as a search parameter (whatever the underlying map was zoomed to at the time of search",
        ".subjectlist":"click one or more of these tags to toggle their presence in the search field, above",
        "#dateSlider":"The range selection can be made by dragging individual sliders or the current span area. The map will update with selections matching the criteria as soon as you stop moving the slider."

      }

$.each(tipArray, function(elem, msg) {
  var variable=(tf == true) ? 
    $(elem).tooltip({
    placement: 'bottom',
    trigger: 'hover',
    delay: 0,
    title: msg
  })
  : 
    $(elem).tooltip('destroy');
  ;

});

  },
  toggle: function(){
    // simple click-to-toggle model's on/off status
    // although either way we don't want any stray tooltips on the tooltip-izing btn
     $(".compass").tooltip('destroy');
    var attr = "status";
  var data = {}, value = this.model.get(attr);
  data[attr] = !value;
  this.model.set(data);
},
selfHelp: function(){

$(".compass").tooltip({
    placement: 'right',
    trigger: 'hover',
    delay: 0,
    title: "click to toggle 'helpful' nags"
  })
  return this
}
});