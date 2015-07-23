var CartoCollxCountView = Backbone.View.extend({
    el: ".query-subnav-count-locations",
    initialize: function() {
        this.listenTo(this.collection, 'request', this.throb);
        this.listenTo(this.collection, 'reset', this.render);
        // this.listenTo(appActivityView, 'stfu', this.render); DIDN'T WORK
        return this.render()
    },
    throb: function(){

$(".query-subnav-count-locations").html('<div class="spinner" style="margin:0;"></div>');

return this

    },
    render: function() {
        var len = this.collection.models.length
        
        $(this.el).html(this.collection.models.length);
        return this
    }
}); //bitscountview