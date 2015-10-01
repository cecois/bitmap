var SharesView = Backbone.View.extend({
    el: $("#btn-sharie"),
    template: Handlebars.templates['sharesViewTpl'],
    initialize: function() {
        this.rewire()
        this.collection.bind("change", this.render, this);
    },
    events: {
        "click": "render"
    },
    render: function() {
        // kill stragglers
        $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy');
        
        $("#share-container-modal").html(this.template(this.collection.toJSON()))

$("#share-container-modal").html(this.template({
                    shares: this.collection.toJSON()
                }));

        return this
        // .buttonize(plus)
    },
    show: function() {
        
        $("#share-container-modal").removeClass('hidden')

        return this
    },
    rewire: function() {
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            container: 'body'
        })
        return this
    },
    reset: function() {
        return this.render()
    }
});