var RecentsView = Backbone.View.extend({
    // tagName: "li",
    el: "#huh-recent",
    events: {
        "click .copy-trigger": "singular"
    },
    template: Handlebars.templates['recentsViewTpl'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('reset', this.render, this);
        return this
    },
    singular: function(e) {
        e.preventDefault()
         var ds = $(e.currentTarget).attr("data-string")
        locTrigger(e, true, ds)
        return this
    },
    rewire: function() {
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            html: true,
            trigger:"hover",
            title: "These links load the results in the background - switch to the query tab to interrogate further."
        })
        // $(this.el).find('[data-toggle="tooltip"]').on('mouseleave',function(elf){
        //     console.log(elf)
        //     $(this.el).tooltip('hide')
        // });

        return this
    },
    render: function() {
        console.log("in recentsview render");
        // console.log(this.collection);
        // if (verbose == true) {
            // console.log("rendering recentsview")
            // console.log(this.collection)
        // }
        // this.collection.sortBy('location_id')
            // this.collection.sortBy(function(m) {
            // console.log("803 sortby:");console.log(m);
            //     return -m.get('updated_at') });
            // sorted.each(function(recentitem) {
        // this.collection.each(function(recentitem) {
        //     if (verbose == true) {
        //         // console.log("gonna render the recentitemview")
        //     }
            // var riv = new RecentItemView({
            //     model: recentitem
            // });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            // $(this.el).append(thisRecentItemView.render().el
            // "recent item will go here"
            // );
            // this.collection = _.first(this.collection,10)
            var rec = _.first(this.collection.toJSON(),6)
            $(this.el).html(this.template({
                    // recents: rec.toJSON()
                    recents: rec
                }));
        // }, this);
        return this
        .rewire()
    }
});