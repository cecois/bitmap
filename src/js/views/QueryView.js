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
        this.listenTo(this.model, "change", this.render)
            // this.model.bind("change", this.render, this);
    },
    fire: function(goto) {
        // doubles as a clearer of the episodes arrow, some other gui stuff
        appCBB.deactivate()
        $(".episodes-arrow").addClass("hidden")
        appHider.set({
            collapsed: "false"
        })
        if (typeof goto == 'undefined') {
            console.log("not sure who fired this, setting goto to false:");
            console.log(goto);
            goto = false
        }
        if (goto.type == "click") {
            goto = true
        }
        var ss = $("#query-form-input").val()
        if (ss == '' || ss == null) {
            this.model.set({
                urlstring: "*:*",
                rawstring: "",
                displaystring: ""
            })
        } else {
            this.model.set({
                    urlstring: ss,
                    rawstring: ss,
                    displaystring: ss
                })
                // this.model.set({urlstring:ss})
                // this.model.set({displaystring:ss})
        }
        // if(rawstring == '' || rawstring == null){rawstring = "*:*"}
        // appCartoQuery.set({
        //     rawstring: rawstring
        // })
        // console.log("qv rawstring:");console.log(rawstring);
        // console.log("qv goto:");console.log(goto);
        if (goto == true) {
            console.log("let's go to there")
            // appRoute.navigate(urlFactory("#query"), {
            //     trigger: true,
            //     replace: true
            // })
        } else {
            // ok we didn't wanna disrupt pane state but we still wanna fire off a query
            // gotta do this here rather than rely on a route to do it
            //
            // appActivity.set({
            //     message: "querying bits...",
            //     show: true,
            //     // altel: "#activity-default"
            // })
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
                                    // actually, if it's a true error we wanna be more forthcoming:
                                // appActivity.set({
                                //         message: "",
                                //         show: false
                                //     })
                                    // console.log("failed fetch");
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
                        // appActivity.set({
                        //         message: "",
                        //         show: false,
                        //         altel: false
                        //     })
                            // console.log("failed fetch");
                    }
                })
                //
                //
        }
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