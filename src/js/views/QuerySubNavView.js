var QuerySubNavView = Backbone.View.extend({
    el: $("#query-subnav"),
    events: {
        // "click .query-subnav-btn": "switchto",
        // "click #query-form-randomize": "randomize",
        // "click #solrfields .glyphicon": "togglehelp"
        "click .bt-episodes-hide": "reset"
        // "change": "render"
    },
    template: Handlebars.templates['querySubNavViewTpl'],
    initialize: function() {
        this.render();
        // this.listenTo(appBits,"reset",this.accoutrement)
        // this.listenTo(appCBB,"reset",this.accoutrement)
        // this.listenTo(this.model, "change", this.render)
        // this.listenTo(this.model, "change:patsy", this.episodize)
            // this.model.bind("change", this.render, this);
    },
    render: function() {
        // appRoute.update()
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
        $(this.el).html(this.template(this.model.toJSON()))
            // $(this.el).val(this.model.get("solrstring"))
        // return this.switchto()
        return this
    },
    reset: function(){


// switch (patsy) {
//    case "bits":
//       console.log("bits will be replaced by episodes")
//       break;
//    case "locations":
//       console.log("locations will be replaced by episodes")
//       break;
//    default:
//       console.log("shouldn't happen")
// }

// // this is NOT bits, so we'll use that space
// var cssog = $("#querylist-episodes").attr("class").split(" ")
var patsy = this.patsy
var cssog = this.cssog


// var cssogbt = $('.query-subnav-btn[data-id="episodes"]').attr("class").split(" ")
var cssogbt = this.cssogbt

_.each(cssog,function(c){
$("#querylist-"+patsy).addClass(c)
})
$("#episodes").addClass('hidden')
$("#querylist-"+patsy).removeClass('hidden')

$('.query-subnav-btn[data-id="episodes"]').addClass('hidden')
$('.query-subnav-btn[data-id="'+patsy+'"]').removeClass('hidden')

_.each(cssogbt,function(c){
    // console.log("adding back ")
    // console.log(c)
    if(c!=="query-subnav-btn"){
    $('.query-subnav-btn[data-id="episodes"]').removeClass(c)}
$('.query-subnav-btn[data-id="'+patsy+'"]').addClass(c)
})

      return this

    },
    episodize: function(patsy){

// var patsy = this.model.get("patsy")
      switch (patsy) {
   case "bits":
      console.log("bits will be replaced by episodes")
      break;
   case "locations":
      console.log("locations will be replaced by episodes")
      break;
   default:
      console.log("shouldn't happen")
}

// we'll use the patsy's space
// but first we'll store it so reset can set everything right
this.patsy=patsy
// storing its current css array
/* ------------------------------------ MAIN EL --------------------------------------------*/
var cssog = $("#querylist-"+patsy).attr("class").split(" ")
this.cssog=cssog

_.each(cssog,function(c){
$("#episodes").addClass(c)
})
$("#querylist-"+patsy).addClass('hidden')
$("#episodes").removeClass('hidden')

/* ------------------------------------ BT EL --------------------------------------------*/
var cssogbt = $('.query-subnav-btn[data-id="'+patsy+'"]').attr("class").split(" ")
this.cssogbt = cssogbt
_.each(cssogbt,function(c){
    console.log("adding back ")
    console.log(c)
$('.query-subnav-btn[data-id="episodes"]').addClass(c)
})

$('.query-subnav-btn[data-id="'+patsy+'"]').addClass('hidden')
$('.query-subnav-btn[data-id="episodes"]').removeClass('hidden')

      return this
      // .render()

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
            // $("#querylist-facets").addClass("hidden")
        } else if(w=="bits") {
            $("#querylist-bits").removeClass("hidden")
            $("#querylist-carto").addClass("hidden")
            // $("#querylist-facets").addClass("hidden")
        } else if(w=="facets"){
            // $("#querylist-facets").removeClass("hidden")
            $("#querylist-carto").addClass("hidden")
            $("#querylist-bits").addClass("hidden")
        }
        return this
    },
    //     accoutrement: function(){
    // // because we're subnavvin here, the models themselves aren't really here
    // $(this.el).find('.query-subnav-count-bits').html("("+appBits.length+")")
    // $(this.el).find('.query-subnav-count-locations').html("("+appCBB.length+")")
    //     },
    switchto: function(e) {
        if (typeof e == 'undefined') {
            var elid = "locations"
        } else {
            // $el = $(e.target)
            // var elid = $(e.target).attr("data-id")
            var elid = $(e.target.parentElement).attr("data-id")
            // $(e.target).addClass("active")
        }

// console.log("e:");console.log(e);
// console.log("elid:");console.log(elid);

        // console.log("btn:");console.log($(this.el).find(".query-subnav-btn"));

        // $(this.el).find(".query-subnav-btn").removeClass("active")
        // $(e.target).removeClass("active")

        // kill em all we'll sort it out
$(this.el).find(".query-subnav-btn").removeClass("active")
        // $(".query-subnav-btn:not([data-id='" + elid + "'])").removeClass("active")
        $(".query-subnav-btn[data-id='" + elid + "']").addClass("active")

        appEpisodesView.reset()
            // blah - too lazy to fix this sitewide
        if (elid == "locations") {
            $("#querylist-carto").removeClass("hidden")
            $("#querylist-bits").addClass("hidden")
            // $("#querylist-facets").addClass("hidden")
        } else if(elid == "bits") {
            $("#querylist-bits").removeClass("hidden")
            $("#querylist-carto").addClass("hidden")
            // $("#querylist-facets").addClass("hidden")
        } else if(elid =="facets"){
            // $("#querylist-facets").removeClass("hidden")
            $("#querylist-carto").addClass("hidden")
            $("#querylist-bits").addClass("hidden")
        }
        return this
            // .accoutrement()
    }
});