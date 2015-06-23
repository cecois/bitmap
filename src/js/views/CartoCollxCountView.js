var CartoCollxCountView = Backbone.View.extend({
    el: ".query-subnav-count-locations",
    initialize: function() {
        this.listenTo(this.collection, 'request', this.throb);
        this.listenTo(this.collection, 'reset', this.render);
        return this.render()
    },
    throb: function(){

$(".query-subnav-count-locations").html("i->")

    },
    render: function() {
        var len = this.collection.models.length
        $(this.el).html(this.collection.models.length);
        return this
    }
}); //bitscountview