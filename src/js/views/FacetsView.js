var FacetsView = Backbone.View.extend({
    el: ".blocks-explore",
    initialize: function() {
        // var subdivision = this.collection.facets.episodes
        // this.collection=subdivision
        this.listenTo(this.collection, 'reset', this.chop);
        // this.listenTo(this.collection, 'request', this.throb);
        // return this.render()
    },
    chop: function() {
        // this.collection = this.collection.episode
        console.log("in chop, collx");
        console.log(this.collection);
        return this.render()
    },
    throb: function() {
        // $(".query-subnav-count-bits").html('<div class="spinner"></div>');
        return this
    },
    render: function() {
        var len = this.collection.models.length
        $(this.el).html(this.collection.models.length);
        return this
    }
}); //bitscountview