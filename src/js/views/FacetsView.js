var FacetsView = Backbone.View.extend({
    // el: ".blocks-explore",
    template: Handlebars.templates['facetView'],
    initialize: function() {
        // var subdivision = this.collection.facets.episodes
        // this.collection=subdivision
        // this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection,'request', this.speak);
        this.listenTo(this.collection, 'reset', this.render);
        // this.listenTo(this.collection, 'request', this.throb);
        // return this.render()
    },
    speak: function(){

appActivity.set({message:"facetizing for "+appCartoQuery.get("displaystring")+"..."})

return this
.throb()

    },
    stfu: function(){
        // meta stfu
        appActivityView.stfu()
        $(this.el).find('.spinner').remove()
        return this
    },
    throb: function() {
        $(this.el).html('<div class="spinner"></div>');
        return this
    },
    render: function() {

if(verbose==true){console.log("rendering a facetsview")}

        // $(this.el).html(this.template(this.collection.toJSON()))
         $(this.el).html(this.template({
            group: this.group,
            facets: this.collection.toJSON()
        }));
        return this
        .stfu()
    }
}); //bitscountview