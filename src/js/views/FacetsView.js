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
        console.log("in chop, fat_tags collx");
                var fattags = _.find(this.collection.models, function(e,i) {
// console.log("keys:")
// console.log(e.keys())
return _.findWhere(e.keys(),function(k){k=="tags"})
// return e.keys()["tags"]
            // return _.findWhere(e.keys(),"tags");
        })

        console.log("fattags:");
        console.log(fattags);
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