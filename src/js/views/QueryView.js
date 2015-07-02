var QueryView = Backbone.View.extend({
    el: $("#query-form"),
    events: {
        "click #query-form-bt": "fire",
        "click #query-form-randomize": "randomize",
        "click #solrfields .glyphicon": "togglehelp"
            // "change": "render"
    },
    template: Handlebars.templates['queryViewTpl'],
    initialize: function() {
        this.render();
        var q = this.model;
        // q.on("change", q.setstrings);
        // this.listenTo(this.model, "change", this.render)
            this.model.bind("change:urlstring", this.fire, this);
    },
    fire: function(goto) {

        appCBB.deactivate()
        $(".episodes-arrow").addClass("hidden")

        if (typeof goto == 'undefined' || goto==null) {
            console.log("not sure who fired this, setting goto to false:");
            console.log(goto);
            goto = false
        }
        if (goto.type == "click") {
            goto = true
        }
        // var ss = $("#query-form-input").val()
        var ss = $("#query-form-input").val()
        // if (ss == '' || ss == null) {
        //     this.model.set({
        //         urlstring: "",
        //         rawstring: "",
        //         displaystring: ""
        //     })
        // } else {
        //     this.model.set({
        //             urlstring: ss,
        //             rawstring: ss,
        //             displaystring: ss
        //         })
        // }

        if (goto == true) {

            // goto true, we'll basically run ourselves by visiting #query, which runs this
            appRoute.navigate(urlFactory("#query"), {
                trigger: true,
                replace: true
            })
        } else {
            // ok we didn't wanna disrupt pane state but we still wanna fire off a query
            // gotta do this here rather than rely on a route to do it
            //
console.log("appbits.fetch@QV 60")
            appBits.fetch({
                    reset: true,
                    // dataType: "jsonp"
                    success: function() {
                        // i can't for the life of me get that view to bind to this collection's events - dunno
                        // appBitsView.render()
                        // appBitsCountView.render()
                        appCBB.fetch({
                            reset: true,
                            // dataType: "jsonp"
                            success: function() {
                                // console.log("successful fetch of appcbb at 76");
                                // appCBBListView.render()
                                // appCBBMapView.render()
                                // appCBBCountView.render()
                            },
                            error: function() {
                                appConsole.set({
                                        message: "query errored out"
                                    })

                            }
                        })



                    }, //success fetch
                    error: function() {
                        appConsole.set({
                                message: "query errored out"
                            })
                            // actually, if it's a true error we wanna be more forthcoming:
                        $("#querylist-carto").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                        $("#querylist-bits").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")

                    }
                })
                //
                //
        }

return this
.render()
    },
    setstage: function() {
        $("#querylist-carto").html("")
    },
    render: function() {
        // appRoute.update()
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
        $(this.el).html(this.template(this.model.toJSON()))
            // $(this.el).val(this.model.get("solrstring"))
        return this
    }
});