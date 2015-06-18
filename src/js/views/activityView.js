var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: Handlebars.templates['activityViewTpl'],
    initialize: function() {
        // this.listenTo(appConsole,"change",this.listler)
        this.model.bind("change", this.render, this);
        this.render();
    },
    reset: function(){
        $(this.el).addClass("idle")
        this.model.set({message:null,show:null,altel:null})
        return this
    },
    render: function() {
        var show = this.model.get("show")
        var msg = this.model.get("message")
        var altelstring = this.model.get("altel")
        $(this.el).removeClass("hidden")
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