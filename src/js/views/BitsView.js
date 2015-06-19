var BitsView = Backbone.View.extend({
    // tagName: "li",
    el: "#querylist-bits",
    events: {
        // "click .bt-cartoobj-zoomto": 'zoomtointernal',
        // "click .bt-cartoobj-episodes": 'pulleps',
        // "click .bt-getid": 'echoid'
    },
    template: Handlebars.templates['bitsView'],
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change active", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change queued", this.fromzoom);
        // this.listenTo(this.collection, "change active", this.render);
        // this.listenTo(this.model, "change", this.render);
        // this.listenTo(this.collection, "reset", this.render);
        // this.collection.bind('change', this.render, this);
        return this
            // .render()
    },
    debug: function() {
        console.log("here cuzza change queued");
    },
    echoid: function(e) {
        var locid = $(e.target).attr("data-id")
        var str = '<span class="loc-trigger" data-string="cartodb_id:' + locid + '"><span class="loc-string">SOME STRING</span><i class="glyphicon glyphicon-map-marker"></i></span>';
        console.log(str);
        return this
    },
    unwire: function() {
        $('.bt-cartoobj').tooltip('destroy')
        return this
    },
    stageeps: function(e) {
        return this.pulleps(e)
    },
    sort: function() {
        this.collection.sort()
        return this
    },
    pulleps: function(e) {
        console.log(e);
        // appActivity.set({
        //     message: "fetching episodes...",
        //     show: true,
        //     altel: null
        //         // altel: "#episodes-list"
        // })
        var locid = $(e.target).attr("data-id")
        var loctype = $(e.target).attr("data-type");
        switch (loctype) {
            case 'line':
                locid = locid / plierline
                break;
            case 'poly':
                locid = locid / plierpoly
                break;
            default:
                locid = locid;
        }
        appEpisodes.activeloc = Number(locid);
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {
                
            }
        });
        e.preventDefault()
            // var am = $(e.currentTarget).parents('li').data("id").toString();
        var a = $(e.currentTarget).parents('li')
            // some positioning so it's clear what wz activated
            // $(a).scrollIntoView()
            // var voff = e.currentTarget.offsetTop;
        var voff = $(a).offsetTop;
        // appEpisodes.verticaloffset = voff;
        return this.activate(a)
    },
    rewire: function() {
        // reactivating some pieces that get wiped in the render
        // actually -- first, since we're here for the same reason -- let's wipe the episodes list, too
        appEpisodesView.wipe();
        $('#querylist-bits').liveFilter("#query-livefilter", 'li', {
            filterChildSelector: 'div'
        });
        // $('.bt-cartoobj').tooltip({
        //     container: 'body',
        //     placement: 'right',
        //     trigger: 'hover'
        // })
        // a little non-backbone stuff
        // $("#stats-hits").html("total hits: " + this.collection.length)
        return this
    },
    activate: function(a) {
        // first wipe the list of any true classes (see ~184 for explanation)
        $(this.el).find("li").removeClass("true")
            // var amid = am.get("cartodb_id")
        var amid = $(a).data("id").toString();
        if (verbose == true) {
            console.log("in activate for " + a);
        }
        // actually first silently deactivate the others
        // _.each(_.reject(this.collection.models, function(mod) {
        //     return mod.get("cartodb_id") == amid;
        // }), function(mo) {
        //     mo.set({
        //         active: false,
        //         queued: false
        //     }, {
        //         silent: true
        //     })
        // }, this)
        //
        // var item = this.collection.findWhere({
        //     "cartodb_id": amid
        // });
        // item.set({
        //     active: true
        // })
        // send id and popup flag
        //
        // SHOULD NOT BE AN EACH #returnto
        //
        $(a).addClass("true")
        $(a).addClass("well")
        return this
            // .render()
    },
    render: function() {
        this.unwire()
        _.sortBy(this.collection.models, function(mod) {
            return mod.get("active") == 'true';
        });
        // notice we are wrapping the collection in rows: cuz cartodb does it
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));
        return this.rewire()
    }
});