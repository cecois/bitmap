var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: Handlebars.templates['activityViewTpl'],
    initialize: function() {
        this.model.bind("change", this.render, this);
        this.render();
    },
    render: function() {
        var show = this.model.get("show")
        var msg = this.model.get("message")
        var altelstring = this.model.get("altel")
        if (typeof altelstring == 'undefined' || altelstring == false || altelstring == null) {
            var altel = $("#activity-default").find(".throbber");
        } else {
            var altel = $(altelstring)
        }
        if (show == true) {
            altel.addClass("refreshing-loader")
                // NProgress.configure({
                //         parent: altel
                //     });
                //     NProgress.start();
        } else {
            altel.remove(".throbber")
                // NProgress.done()
        }
        $(this.el).html(this.template(this.model.toJSON()))
        return this
    }
});