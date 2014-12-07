var BaseMapMenuView = Backbone.View.extend({

  tagName:"li",
  template: Handlebars.templates['baseMapMnu'],
  events: {
    "click .mnuThumbnail":"setBaseMap",
    "click a":"killtt",
    "click a":"rewire"
  },
  initialize: function() {
    this.model.bind("change", this.render, this);

  },
  killtt:function(){
// we need to be sure we kill any active tooltips
  $(this.el).find("a").tooltip('destroy');

  },

  setBaseMap: function(){
    // the clicked one becomes active 
    // (noting that the collx will post-process this to deactivate the others)
this.model.set({"active":true});
var newBLayer = this.model;
appBaseMap.set(newBLayer);
  },

	render: function() {
    this.killtt();
    $(this.el).html(this.template(this.model.toJSON()));
    return this
    .rewire()

	},

  rewire:function(){
this.$("a").tooltip({placement:'top',trigger:'hover',delay: { show: 1200, hide: 500 }});
// this.$(".tooltip").css("top","-140px");
    // this.$(" > .tooltip").css("top","-140px")
// this.$("a").hover(function(){
    // var container = $("#mnuBaseMap > .tooltip").css('top');
    // console.log(container)
//   var oldtop = parseInt($('#mnuBaseMap > .tooltip').css('top'));
//   var newtop = oldtop-40;
// //   console.log("oldtop,newtop:"); console.log(oldtop+","+newtop);
//     $('#mnuBaseMap > .tooltip').css('top', newtop + 'px')
// });
return this

  }

});