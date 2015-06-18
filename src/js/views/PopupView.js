var PopupView = Backbone.View.extend({
    // el: $("#activityContainer"),
    template: Handlebars.templates['hitMarkerViewTpl'],
    initialize: function() {
        this.ogwidth = null;
        this.model.bind("change", this.render, this);
        return this.render();
    },
    events: {
        "click .bt-cartoobj-episodes": "triage",
        // "click .bt-cartoobj-feedback": "ghsubmit",
        // "click .bt-cartoobj-leafletcloser": "reset"
        "click button[type='submit']": "issue_submit",
        "click .btn-pu-nav": "navinternal"
    },
    navinternal: function(e) {
        $cuta = $(e.currentTarget)
            // so few no real performance hit here
        $(this.el).find(".btn-pu-nav").removeClass("active")
        $cuta.addClass("active")
            // var tel = e.currentTarget.getAttribute("data-target")
        var tel = $cuta.attr("data-target")
        console.log("this.ogwidth:");
        console.log(this.ogwidth);
        $(".leaflet-popup-content").css("width", this.ogwidth + "px")
        $(this.el).find(".pu-copy").addClass("hidden")
        $(this.el).find(".pu-copy-" + tel).removeClass("hidden")
        if (tel == "episodes") {
            return this.pulleps()
        } else if (tel == "feedback") {
            return this.issue($cuta)
        } else {
            return this
        }
    },
    rewire: function() {
        // wire up those tooltips
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
                position: "right"
            })
            // and the submit button
            //
            // $(this.el).find("button[type='submit']").click(function(t){
            // this.issue_submit()
            // });
    },
    issue_submit: function(e) {
        var it = $(this.el).find("[data-class='pu-issue-title']").attr("placeholder")
        var ib = $(this.el).find("[data-class='pu-issue-body']").val()
        var ic = $(this.el).find("[data-class='pu-issue-contact']").val()
        if (typeof ib == 'undefined' || ib == null || ib == '') {
            $(this.el).find("[data-class='pu-issue-body']").attr("placeholder", "please provide some sort of clue to what's wrong")
            $(e.currentTarget).html("<span class='glyphicon glyphicon-warning-sign'></span> Submit")
        } else {
            // appActivity.set({
            //         message: "submitting issue to GitHub...",
            //         show: true
            //     })
                // do the submit
            console.log(it);
            console.log(ib);
            console.log(ic);
            // success will put a checkmark in submit button or something - github (octokat) doesn't return much
            // appActivity.set({
            //     message: null,
            //     show: false
            // })
            $(e.currentTarget).html("<span class='glyphicon glyphicon-thumbs-up' disabled></span> Thanks")
        }
        return this
    },
    //     reset: function(e){
    // $guts = $(this.el)
    // $guts.parent().find('div').first().html('');
    // $guts.parent().removeClass("newspaceready")
    // var lid = this.model.get("leafletid")
    // map._layers[lid].closePopup()
    // return this
    //     },
//     triage: function(e) {
//         e.preventDefault()

//         console.log("in triage of puview");

//         var locid = $(e.target).find("span").attr("data-id")
//         var loctype = $(e.target).find("span").attr("data-type");

// console.log("locid:");console.log(locid);
// console.log("loctype:");console.log(loctype);

//         // appCBB.activate(locid, loctype);
//         // activecouple = loctype+":"+locid
//         activecouple = activeFactory(loctype + ":" + locid)
//         appCBB.activate();
//         // this is one we want the url to reflect
//         appRoute.navigate(urlFactory("#query"), {
//             trigger: false,
//             replace: false
//         })
//         if (agent == "desktop") {
//             // return this.pulleps()
//             return this
//         } else if (agent == "mobile") {
//             // return this.pulleps_mobile()
//             return this
//         }
//     },
    pulleps: function(source) {
        var locid = this.model.get("cartodb_id")
        var loctype = this.model.get("geom_type")
            // ay ya ya this is fuxked up lazy #returnto
            // localStorage.setItem("activelocid", locid)
            // localStorage.setItem("activeloctype", loctype)
            // because we don't wan cbblistview to always show itself (and why bother passing a var), reveal it here manually
            // appRoute.navigate(pullURL("#query"), {
            //         trigger: false,
            //         replace: false
            //     })
        appCBB.activate(locid, loctype)
            appStatesView.setpos("episodes-pu","true")
            appCBBListView.pulleps()
        return this
        // .navaway()
    },
    // navaway: function() {
    //     appRoute.navigate(urlFactory("#query"), {
    //         trigger: true,
    //         replace: true
    //     })
    // },
    issue: function(el) {
        // this.prepspace()
        $(".leaflet-popup-content").css("width", "450px")
        var locid = this.model.get("cartodb_id")
        return this
    },
    //     prepspace: function(replace) {
    // $guts = $(this.el)
    // var gwide = $guts.width()
    // // $guts.parent().css("overflow","hidden").css("height","400px").css("weight","500px")
    // $guts.parent().addClass("newspaceready")
    // // $guts.css("position","relative").css("left","85%");
    // // $guts.parent().prepend('<div class="altspace pull-left" style="width:'+gwide+'px;">stuff can actually go here?</div>');
    // $guts.parent().prepend('<div class="altspace pull-left">stuff can actually go here?</div>');
    //     return this
    //     },
    render: function() {
        // bc we'll be messing with this width once in a while, we sock away the original
        this.ogwidth = $(".leaflet-popup-content").width()
        $(this.el).html(this.template(this.model.toJSON()))
        return this.rewire()
    }
});