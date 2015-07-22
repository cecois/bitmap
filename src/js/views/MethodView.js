var MethodView = Backbone.View.extend({
    // tagName: "li",
    events: {
        "click .copy-trigger": "singular",
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
         var ds = $(e.currentTarget).attr("data-string")
        locTrigger(e, true, ds)
        return this
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
            // }, this);
        return this.rewire()
    },
    rewire: function() {
        // class="copy-trigger" data-toggle="tooltip"
        // $(this.el).find('[data-toggle="tooltip"]').tooltip({
        //     position: "right",
        //     html: true,
        //     title: "These links will load the results in the background - hide the map (<strong>CTRL KEY</strong>) or switch to the query tab to interrogate further."
        // })
        return this
    }
});