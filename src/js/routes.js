var Route = Backbone.Router.extend({
    routes: {
        "": "default",
        ":hash": "default",
        // "home": "home",
        // "about": "about",
        // "search/lll:hash": "searchWithHashed",
        "search/p:page/:querystring": "search"
    },
    default: function(h) {
        console.log("running default route and hash:" + h);
        if (typeof h == 'undefined') {
            h = "huh";
            // console.log("hash was undefined so now it is: " + h);
        }
        var hmod = "#" + h;


_.each($("#main > .mainpanel"),function(p){

console.log(p.id);
console.log(h);

if(p.id == h){
    $(p).removeClass("hidden")
}
else{
    $(p).addClass("hidden")

}

});

        // if (h == "#map") {
        //     $(".non-menu-container").hide()
        // } else {
        //     $(".non-menu-container").show()
        //     // $('body').animate({scrollTop:$(".non-menu-container").find(h)},3000);
        //     $('html,body').animate({scrollTop:$(""+h+"").offset().top},300);
        // }
        // $(".site-nav ul.clear-list > a[href='"+h+"']").css("color","pink")
        
        _.each($("nav.site-nav > ul > li > a"), function(m) {
            if ($(m).attr("href") == hmod) {
                // console.log("h is:"+h);
                // console.log("mhref is:"+$(m).attr("href"));
                $(m).addClass("active")

            } else {
                $(m).removeClass("active")
            }
            // console.log($(m).attr("href"));
            // console.log(m);
        }, this)
        // var len = appMenuCollx.models.length
        // console.log("len");
        // console.log(len);
        // _.each(appMenuCollx.models, function(m, i) {
        //     if (i == len - 1) {
        //         var loud = true
        //     } else {
        //         var loud = false
        //     }
        //     var loud = false;
        //     console.log("processing # " + i + ", named " + m.get("name") + " and where loud is:");
        //     console.log(loud);
        //     if (m.get("name") == h) {
        //         m.set({
        //             active: true
        //         })
        //     } else {
        //         m.set({
        //             active: false
        //         })
        //     }
        // m.set({
        //     active: (m.get("name") == true)
        // }, {
        //     silent: loud
        // })
        // 
        // if(m.get("name") == h && i<len){
        //   console.log("setting the "+i+"th silently");
        //   m.set({active:true},{silent:true})
        // } else {
        //   m.set({active:false},{silent:true})
        // }
        // if(m.get("name") == h && i==len-1){
        //   console.log("setting the "+i+"th loudly");
        //   m.set({active:true})
        // } else {
        //   m.set({active:false})
        // }
        // }); // each -- SWAP THIS OUT WITH FINDWHERE WHEN U GET HOME
        // if(typeof MIsV == 'undefined'){
        // window.MIsV = new MenuItemsView({
        //   collection: appMenuCollx
        // });
        // }
        // since we knew we would just be re-rendering anyway, we wait to call render on menuview here
        // MenuItemsView.render()
        return this
    }, // end default
    about: function() {
        // console.log("running about route");
        // if(type of appRoute == 'undefined'){
        // }
    }, // end about
    home: function() {
        // console.log("running home route");
        var $el = $("#paneContainer > #home");
        var elString = "home";
        // wakeTheKids(elString);
    } // end home
});
var appRoute = new Route();
Backbone.history.start();