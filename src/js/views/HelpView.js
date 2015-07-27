var HelpView = Backbone.View.extend({
    // tagName: "li",
    el: "#help-copy",
    events: {
        "click .copy-trigger": "singular"
    },
    template: Handlebars.templates['help'],
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
        return this
    },
    reset: function() {
        // console.log("showmain clicked");
        // console.log(e);
        // $("#bt-showmain").addClass('hidden')
        // $("#main").addClass('hiddenish')
        return this
    }
});