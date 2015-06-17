var HiderView = Backbone.View.extend({
    el: $("#btn-hider"),
    template: Handlebars.templates['hiderViewTpl'],
    initialize: function() {
        this.render();
        this.model.bind("change", this.render, this);
    },
    events: {
        "click": "setpos"
    },
    swap: function() {
        if (this.model.get("collapsed") == "false") {
            this.model.set({
                collapsed: "true",
                operation: "plus",
                instructions: "expand main pane"
            });
        } else if (this.model.get("collapsed") == "true") {
            this.model.set({
                collapsed: "false",
                operation: "minus",
                instructions: "collapse/hide main pane"
            });
        }
        return this
    },
    setpos: function(newforwhom, collaps) {
        if (typeof newforwhom == 'undefined' || newforwhom == null) {
            var newforwhom = "main"
        }
        if (typeof collaps == 'undefined' || collaps == null) {
            // nothing explicit came in -- let's swap whatever current state is
            if (this.model.get("collapsed") == "true") {
                var collaps = "false"
            } else {
                var collaps = "true"
            }
        }
        switch (collaps) {
            case "true":
                var op = "plus"
                var instro = "expand main pane"
                break;
            case "false":
                var op = "minus"
                var instro = "collapse/hide main pane"
        }
        // if(this.model.get("collapsed")=="false"){
        this.model.set({
            collapsed: collaps,
            forwhom: newforwhom,
            operation: op,
            instructions: instro
        });
        // } else {
        //         this.model.set({collapsed:"false",operation:"minus",instructions:"collapse/hide main pane"})
        //     }
        return this
    },
    //     position: function(much){
    // if(typeof much == 'undefined' || much == null){
    //     var much = '99.5%';
    // }
    // this.model.set({collapsed:"true",operation:"plus",instructions:"expand main pane",distance:much});
    // return this
    // .render()
    //     },
    render: function() {
        var forwhom = this.model.get("forwhom")
        $(this.el).html(this.template(this.model.toJSON()))
        if (this.model.get("collapsed") == "true") {
            switch (forwhom) {   
                case "main":
                    forclass = "hiddenish"
                    break;   
                case "episodes-pu":
                    forclass = "hiddenish-episodes-pu";
                    break;
                default:
                    forclass = "hiddenish"
            }
            // first we clear out any current state
            // $("#main").attr("class","")
            console.log("forclass right b4 apply:");
            console.log(forclass);
            $("#main").addClass(forclass);
            $("#episodes").addClass(forclass);
            $("#episodes-list").addClass(forclass);
            $("#mnuBaseMap").addClass(forclass);
            $("#banner-bang").addClass(forclass);
            appConsoleView.$el.addClass("hidden")
            appConsole.set({
                "message": "the 'control' key also toggles the visibility of the main pane"
            })
        } else {
            $("#mnuBaseMap").removeClass('hiddenish');
            appConsoleView.$el.removeClass("hidden")
            $("#main").removeClass('hiddenish hiddenish-episodes-pu');
            $("#episodes").removeClass('hiddenish hiddenish-episodes-pu');
            $("#episodes-list").removeClass("hiddenish-episodes-pu hiddenish");
            $("#banner-bang").removeClass('hiddenish');
        }
        if (typeof this.model.get("distance") !== 'undefined' || this.model.get("distance") !== null) {
            $("#main").css('right', this.model.get("distance"));
        }
        return this.rewire()
    },
    rewire: function() {
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right"
        })
        return this
    },
    reset: function() {
        return this.render()
    }
});