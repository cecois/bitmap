var EpisodesView = Backbone.View.extend({
    // tagName: "li",
    el: "#episodes-list",
    initialize: function() {
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('reset', this.render, this);
        // this.collection.bind("reset", _.bind(this.debug, this));
        // this.listenTo(this.collection, "change", this.render);
        // return this.render()
    },
    debug: function() {
        console.log("RESET trigger");
    },
    wipe: function() {
        $(this.el).empty();
        return this
    },
    reset: function() {
        $(this.el).addClass("hidden")
        $(".episodes-arrow").addClass("hidden")
        return this
    },
    render: function() {
        $(this.el).empty()
            // by the time we get here, plainview will have an active element, go get it to match its position
        var ael = $(".carto-plain-title.true")
        // $(this.el).css("top", $(ael).position().top-30);

// $("#episodes-list").css("top", $("#episodes-list").position().top-130);

// $(this.el).scrollintoview(
// {
//     // duration: 2500,
//     direction: "vertical",
//     complete: function() {
//         // highlight the element so user's focus gets where it needs to be
//         // $("#episodes-list").css("top", $("#episodes-list").position().top-130);
//     }
// }
// );

// ael.scrollintoview()

        // and that stupid arrow
        $(".episodes-arrow").removeClass("hidden").css("top", $(ael).position().top);

        $(".episodes-arrow").removeClass("hidden");

        // $(this.el).css("top", this.collection.verticaloffset - 20)
        // $('.episodes-arrow').removeClass('hidden').css("position", "relative").css("top", this.collection.verticaloffset - 10)
        $(this.el).html(" <h3>Episodes</h3> <span class='cbbepsanno'>(referencing location: '" + appCBB.findWhere({
                active: true
            }).get("name") + "')</span>")
            // we use .episodes cuz we have some stuff outside of the el we wanna unhide, too
        if (this.collection.models.length > 0) {
            $(".episodes").removeClass('hidden')
        } else {
            $(this.el).html("None found (or <em>maybe</em> an error occurred. Who's to know?)")
        }
        if (verbose == true) {
            // console.log("rendering recentsview")
            // console.log(this.collection)
        }
        this.collection.each(function(episode) {
            if (verbose == true) {
                // console.log("gonna render the recentitemview")
            }
            var wikiaid = Number(episode.get("id_wikia"))
            var wikia = appWikiaz.findWhere({
                "id": wikiaid
            })
            if (typeof wikia !== 'undefined') {
                episode.set({
                    title: wikia.get("title")
                })
            } else {
                episode.set({
                    title: "[title not found at comedybangbang.wikia.com]"
                })
            }
            var thisEpView = new EpisodeView({
                model: episode
            });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            $(this.el).append(thisEpView.render().el
                // "recent item will go here"
            );
        }, this);
        return this
    }
});