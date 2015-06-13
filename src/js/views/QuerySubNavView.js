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