var FacetsView = Backbone.View.extend({
    // el: ".blocks-explore",
    events: {
        // "click .bt-facet": 'facetize'
    },
    template: Handlebars.templates['facetView'],
    initialize: function() {
        this.listenTo(this.collection, 'request', this.speak);
        this.listenTo(this.collection, 'reset', this.render);
    },
    facetize: function(e) {
        console.log("facetize")
        console.log(e)
        return this
    },
    speak: function() {
        appActivity.set({
            message: "facetizing for " + appCartoQuery.get("displaystring") + "..."
        })
        return this.throb()
    },
    stfu: function() {
        // meta stfu
        appActivityView.stfu()
        $(this.el).find('.spinner').remove()
        return this
    },
    throb: function() {
        $(this.el).html('<div class="spinner"></div>');
        return this
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering a facetsview")
        }
        // $(this.el).html(this.template(this.collection.toJSON()))
        $(this.el).html(this.template({
            group: this.group,
            facets: this.collection.toJSON()
        }));
        return this.rewire()
    },
    rewire: function(){

$(this.el).find(".bt-facet").click(function(e){

var fs = e.currentTarget.innerHTML

console.log("pushing "+fs+" into cartoquery...")
appCartoQuery.get("facetarray").push(fs)

})

        return this.stfu()
    }
}); //bitscountview