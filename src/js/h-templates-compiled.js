(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['activityViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<span class=\"\">\n  ";
  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</span>";
},"useData":true});
templates['baseLayerMnuItem'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"mnuThumbnail "
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "\">\n      <img src=\""
    + escapeExpression(((helper = (helper = helpers.thumb || (depth0 != null ? depth0.thumb : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumb","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"55px\" height=\"55px\" />\n    </div>";
},"useData":true});
templates['bitsView'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"\">\n\n<div class=\"\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.desc : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of associated episodes\"></span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.elucidation : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.desc : depth0), depth0))
    + "\n";
},"4":function(depth0,helpers,partials,data) {
  return "(no description provided)\n";
  },"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"cbbanno\">("
    + escapeExpression(lambda((depth0 != null ? depth0.elucidation : depth0), depth0))
    + ")</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- <h1 class=\"stroke\" style=\"margin-bottom:43px;\">Unmappable Bits<span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> </h1> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n<!-- <div class=\"cbbanno\">(Bits in the Tracker but without Locations)</div> -->\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['cartoPlainView-Mobile'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\n<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"\">\n\n<div class=\"\">\n<span class=\"carto-geom-type\">"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "</span>\n"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + " <span class=\"glyphicon glyphicon-share-alt bt-cartoobj bt-cartoobj-zoomto\" title=\"zoom to this\"></span>\n<span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of associated episodes\"></span>\n\n<!-- <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-asterisk bt-getid\" title=\"echo model id (dev only)\"></span> -->\n";
  stack1 = ((helpers.indev || (depth0 && depth0.indev) || helperMissing).call(depth0, (depth0 != null ? depth0.cartodb_id : depth0), (depth0 != null ? depth0.geom_type : depth0), {"name":"indev","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n\n\n</div>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<p class=\"cbbanno\">("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h1 class=\"stroke\" style=\"\">bits - mapped - MOBILE VIEW<span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span>\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n</h1>\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['cartoPlainView'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\n<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"\">\n\n<div class=\"\">\n<span class=\"carto-plain-geomtype icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\"></span>\n<span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"carto-plain-title\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span> <span class=\"glyphicon glyphicon-share-alt bt-cartoobj bt-cartoobj-zoomto\" title=\"zoom to this\"></span>\n<span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of associated episodes\"></span>\n\n<!-- <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-asterisk bt-getid\" title=\"echo model id (dev only)\"></span> -->\n";
  stack1 = ((helpers.indev || (depth0 && depth0.indev) || helperMissing).call(depth0, (depth0 != null ? depth0.cartodb_id : depth0), (depth0 != null ? depth0.geom_type : depth0), {"name":"indev","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n\n\n</div>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<p class=\"cbbanno\">("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- <h1 class=\"stroke\" style=\"\">bits - mapped <span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> </h1> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['consoleViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"text-muted\">\n  ";
  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});
templates['episodeViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a href=\"http://www.earwolf.com/episode/"
    + escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\" title=\"link to the episode at Earwolf\">";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.title : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n(#"
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + ")\n<!-- <a href=\"http://earwolf.com/episode/"
    + escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)))
    + "\">\n	<img src=\"images/bt-earwolf.png\" alt=\"\" width=\"15\" height=\"15\" border=\"0\" />\n</a> -->\n<!-- , -->\n<a href=\"http://soundcloud.com/comedybangbang/"
    + escapeExpression(((helper = (helper = helpers.url_soundcloud || (depth0 != null ? depth0.url_soundcloud : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url_soundcloud","hash":{},"data":data}) : helper)))
    + "#t="
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + "\" title=\"link to "
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + " at SoundCloud\">\n	<img src=\"images/bt-soundcloud.png\" alt=\"\" width=\"30\" height=\"20\" border=\"0\" />\n</a>\n\n<!-- ), at ~"
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + " -->\n<!-- \nhttps://soundcloud.com/stack-exchange/stack-exchange-podcast-51#t=9:36\nhttps://soundcloud.com/comedybangbang/341-stars-claudia-odoherty-neil-campbell -->";
},"useData":true});
templates['fullstory'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h4>What's Really Going On?</h4>\n\n<div class=\"pull-right\">\n      <a href=\"images/btracker_preview.png\"><img class=\"featurette-image img-responsive pull-right\" alt=\"bittracker peek\" src=\"images/btracker_preview.png\" style=\"margin:11px;\" height=\"200\" width=\"500\"></a>\n      <div class=\"caption\">\n        <p>Screencap of a text export of some sample BitTracker records.</p>\n      </div>\n  </div>\n\n\n    <p>This is a map of every spatial reference from every <em>Comedy Bang! Bang!</em> episode ever recorded. It's actually part of a much larger project in which every individual trope and recurring bit (\"Please call me Garry,\" \"My Wife!\" \"Titular,\" etc. - see BitTracker, below) will be searchable and supercuttable but that's taking longer and will require a much different web app to deliver. This thing is limited to only those references that were (somewhat) mappable. e.g...</p><p>\n    <!-- And for real the reason to do it is that the universe of CBB's characters - when canon - is so rich and sprawling that I wanted it all in one place, where I could wade into it from multiple angles, aspects, and facets. e.g. I wanted be able to visualize... \n    So for now it's just a map of places that comprise the world of the CBB canon (and perhaps its diaspora). -->\n    </p><ul>\n        <li>the probable location of the <span class=\"loc-trigger\" data-string=\"cartodb_id:17\"><span class=\"loc-string\">Nordstrom that sold Danny Mahoney his heavy suicide coat</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span></li>\n        \n        <li>the very-difficult-to-actually-map location of <span class=\"loc-trigger\" data-string=\"cartodb_id:410\"><span class=\"loc-string\">The Calvins Bee Honey Horse Fight Fields</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span></li>\n\n        <li>JW Stillwater's route <span class=\"loc-trigger\" data-string=\"cartodb_id:52947\"><span class=\"loc-string\">from Cumberbatch County to L.A. via the Panama Canal</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span></li>\n        \n        <li>basically <span class=\"loc-trigger\" data-string=\"huell\"><span class=\"loc-string\">anything Huell Howser has ever said</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span></li>\n    </ul>\n    <!-- <p><sup>*</sup> – Meaning that if Don DiMello shows up on <em><a href=\"http://www.earwolf.com/show/spontaneanation-with-paul-f-tompkins/\">Spontaneation</a></em> or <em><a href=\"http://www.gosuperego.com\">Superego</a></em> and says something mappable, it can show up here. I haven't been through any of those combing for locations yet, however.</p> -->\n</div>\n<div class=\"block\"><h4>BitTracker?!</h4>\n\n  \n    <p>\nYeah, get this: this map app is actually the pilot application of a much larger project -- a bittracker. <strong>Yeah, a <em>BitTracker</em></strong>. A tracker of bits. How many times (and when) <em>My wife!</em>; how many times (and when) <em>Hee-hee. Shamone. Where's Lisa Marie? Dah! Where 'dem elephant bones? Where's Macaulay? Dah! Shamone. Hoo. Where my glove? Hoo.</em>; how many times (and when) a classic <em>Would You Rather</em> blunder? That sort of thing. But it's taking a while.</p></div>\n<div class=\"block\"><h4>A Note on Scope</h4>\n<p>Included here are ~all locations that were <em>generated</em> during the show. Meaning only locations that were somehow parts of a bit or part of something intentionally funny <em>and</em> part of a contribution to the show are included. Meaning that if Todd Barry plugs his gig at the Chuckle Hut or Jimmy Pardo ran into Nick Kroll at a grilled cheese sandwich place irl, it doesn't need to be here. But <span class=\"loc-trigger\" data-string=\"cartodb_id:46\"><span class=\"loc-string\">Huell Howser's birth bed</span><i class=\"glyphicon glyphicon-map-marker\"></i></span>? Yes. And <span class=\"loc-trigger\" data-string=\"cartodb_id:404\"><span class=\"loc-string\">that place that almost housed a Victor Diamond show</span><i class=\"glyphicon glyphicon-map-marker\"></i></span>? Yes. And <span class=\"loc-trigger\" data-string=\"cartodb_id:13\"><span class=\"loc-string\">The Grove</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> and <span class=\"loc-trigger\" data-string=\"cartodb_id:1329867\"><span class=\"loc-string\">the ArcLight</span><i class=\"glyphicon glyphicon-map-marker\"></i></span> (including <span class=\"loc-trigger\" data-string=\"cartodb_id:31968\"><span class=\"loc-string\">Cactus Tony's bus route <em>to</em> it</span><i class=\"glyphicon glyphicon-map-marker\"></i></span>) and <span class=\"loc-trigger\" data-string=\"cartodb_id:96\"><span class=\"loc-string\">the Pantages</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> and <span class=\"loc-trigger\" data-string=\"cartodb_id:789921\"><span class=\"loc-string\">Bob Ducca's beloved Castaic</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> and <span class=\"loc-trigger\" data-string=\"cartodb_id:7\"><span class=\"loc-string\">Six Flags Magic Mountain</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> are all here.</p></div>\n<!-- <div class=\"block\"><h4>Is <em>Everything</em> Geocoded?</h4>\n<p>But no, not everything is in here. Yet. Once I realized I wanted to do this, I started re-listening from episode 1, logging locations instead of bits (which I'll pick back up later). I'm only through #143, so there will be plenty more added here in due time. I <em>may</em> add the ability for users to submit/edit locations, but that requires the addition of a whole other layer of app logic. The crowd-sourcing model will better suit the BitTracker anyway.</p></div> -->\n\n\n<div class=\"block\"><h4>What's Next?</h4>\n    <p>\n        <ul>\n            <li>As episodes are released, locations will be added.</li>\n            <li>As old episodes are revisited, missed locations will be added.</li>\n            <li>The web app might get an inline audio player.</li>\n            <li>Some poor asshole needs to build the full BitTracker still (and integrate it with this).</li>\n            <li>A crowd-sourcer component could be very helpful. i.e. move the backend to a wiki platform and harvest from there. The very useful <a href=\"http://comedybangbang.wikia.com\">CBB wikia instance</a> could become a mutual asset, for instance.</li>\n        </ul>\n    </p>\n    </div>\n\n    <div class=\"block\"><h4>Ideas? Complaints?</h4>\n    <p>\n        At least until it gets abusive, feel free to submit ideas, corrections, diet pill ads, etc. in the <a href=\"#feedback\">Feedback tab</a>.\n    </p>\n    </div>";
  },"useData":true});
templates['hiderViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div data-toggle=\"tooltip\" title=\""
    + escapeExpression(((helper = (helper = helpers.instructions || (depth0 != null ? depth0.instructions : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"instructions","hash":{},"data":data}) : helper)))
    + "\" class=\"triangle-trigger-"
    + escapeExpression(((helper = (helper = helpers.collapsed || (depth0 != null ? depth0.collapsed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"collapsed","hash":{},"data":data}) : helper)))
    + "\">\n<span class=\"glyphicon glyphicon-"
    + escapeExpression(((helper = (helper = helpers.operation || (depth0 != null ? depth0.operation : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"operation","hash":{},"data":data}) : helper)))
    + " hider-copy\"></span>\n</div>";
},"useData":true});
templates['hitMarkerViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<p class=\"text-muted\">"
    + escapeExpression(((helper = (helper = helpers.anno || (depth0 != null ? depth0.anno : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"anno","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\" pu-copy pu-copy-marker col-sm-12\">\n    <h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div> <!-- marker -->\n\n<div class=\" content-wrap col-sm-12 hidden pu-copy pu-copy-episodes\">\n        <p class=\"text-muted\">HEYOOOOOO eps</p>\n</div> <!-- episodes -->\n\n<div class=\"hidden pu-copy pu-copy-feedback content-wrap col-sm-12\">\n            <p class=\"text-muted\">\n            Until we have a full-on crowd-source component to this, it will have to suffice to anonymously create an issue at <a href=\"https://github.com/cecois/bitmap/issues\">this project's GitHub repo</a>. Go ahead! Try to be specific, but anything that comes in I'll check out.\n            </p>\n            <p class=\"text-muted\">\n            If you really gotta know what becomes of your submission, enter some handle of yours in the handle field (use Twitter, email, GitHub username, InstaGram handle I suppose -- don't get too crazy). I'll let you know what becomes of it. Seriously! I have 0% interest in doing anything else w/ this datum, but be aware it will be part of the public GitHub issue.\n            </p>\n        <div class=\"pu-copy pu-copy-feedback pu-copy-feedback-form\">\n                <label for=\"\">Feature in Question (this)</label>\n            <input data-class=\"pu-issue-title\" class=\"form-control input-sm\" type=\"text\" placeholder=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " ("
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + ":"
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + ")\" disabled>\n            <label for=\"\">Issue Body</label>\n            <textarea data-class=\"pu-issue-body\" placeholder=\"What's wrong with this one? (All suggestions will be investigated.)\" class=\"form-control\" rows=\"3\"></textarea>\n            <label for=\"\">Contact Handle (totally optional)</label>\n            <input data-class=\"pu-issue-contact\" class=\"form-control input-sm\" type=\"text\" placeholder=\"e.g. @toddglass or just github.com/huellhowser or something\">\n        </div> <!-- form -->\n\n            <div style=\"margin-top:5px;\"><button class=\"btn btn-default btn-xs btn-block\" type=\"submit\">Submit</button></div>\n</div> <!-- feedback -->\n\n\n<div class=\"btn-group btn-group-xs pull-right\" style=\"margin-bottom:8px;\" role=\"group\">\n\n<button data-toggle=\"tooltip\" data-target=\"marker\" type=\"button\" title=\"marker info\" class=\"btn btn-default btn-pu-nav active\"><span class=\"bt-cartoobj bt-cartoobj-feedback carto-plain-geomtype icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\"></span></button>\n\n  <button data-toggle=\"tooltip\" data-target=\"episodes\" data-id=\"episodes\" type=\"button\" class=\"btn btn-default btn-pu-nav\"><span data-id=\""
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of referencing episodes\"></span></button>\n\n  <button data-toggle=\"tooltip\" data-target=\"feedback\" data-id=\"feedback\" type=\"button\" class=\"btn btn-default btn-pu-nav\"><span data-id=\""
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + "\" class=\"glyphicon glyphicon-flag bt-cartoobj bt-cartoobj-feedback\" title=\"something wrong? anonymously flag this one\"></span></button>\n\n</div>";
},"useData":true});
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h1>What's this, now?</h1>\nCome on guys -- it's a map of all of the locations on earth ever referenced in any <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> podcast episode ever recorded. Obviously.</div>\n\n<div class=\"block\"><h1>Why?</h1>\n<p>Because...i dunno, why are <em>you</em> here? That's why. Or maybe <em>fuck you</em> and that's why. Could be! But actually it's just cuz <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> is the best thing ever recorded. Or maybe the best thing ever to even happen at all.<p>\n<p>If you really are confused, read more about it in the <a href=\"#fullstory\">Full Story tab</a>.\n <!-- or geek dafuk out in the <a href=\"#minutiae\">Minutiae tab</a> -->\n </p>\n </div>\n\n <div class=\"block\"><h1>Is this official?</h1>\n<p>It isn't.</p>\n </div>\n";
  },"useData":true});
templates['minutiae'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h4>How was it Built?</h4>\n    <p>I doubt you care, but you're sweet to ask. Imma list pretty much the entire workflow just cuzzi like it when people get specific about this kind of thing:</p>\n    <p>\n    <ul class=\"ul-expando\">\n        <li>listened to CBB episodes in the default podcast app in iOS 6-7-8, in the Earwolf SoundCloud embedded player, in the SoundCloud player itself, and in VLC.app\n            <div class='anno'>this is actually significant because the timestamps can differ a little between various sources</div>\n        </li>\n        <li>started logging bits/locations directly into a <a href=\"http://mongolab.com\">MongoLab</a> account, but eventually went offline into Notes.app on iOS <em>then</em> into a Markdown+DropBox solution -- but always eventually into MongoHub\n            <div class=\"anno\">Hey, you're right - that does sound like a ridiculous amount of pointless labor. And yet here we are.</div>\n        </li>\n        <li>for each master location, I manually researched it and placed a marker in a <a href=\"http://cartodb.com\">CartoDB</a> account\n            <div class=\"anno\">...\"Master\" location because I'm not going to store a <em>seperate</em> geometry for every mention of The <span class=\"loc-trigger\" data-string=\"cartodb_id:96\"><span class=\"loc-string\">Pantages Theatre</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> or Huell Howser's favorite Taco Bell<span class=\"loc-trigger\" data-string=\"cartodb_id:45\"><span class=\"loc-string\" > (the one on Rosemead) </span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span>. <span class=\"loc-trigger\" data-string=\"cartodb_id:13\"><span class=\"loc-string\">The Grove</span><i class=\"glyphicon glyphicon-map-marker\"></i></span> gets one marker and the BitTracker will log any individual references to it. Standard database stuff. This is especially important in the case of, say, <span class=\"loc-trigger\" data-string=\"cartodb_id:26\"><span class=\"loc-string\">The Arclight cinema</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span>, which is frequented by an almost surprising number of Hollywood's least palatable characters.</div>\n        </li>\n        <li>\n            Built up this web app, whose chief components are BackboneJS (+jQuery, +UnderscoreJS, +HandlebarsJS), Bootstrap, LessJS, etc. The usual. And for the mapping framework, the great Leaflet. Technically there's an API behind it (built w/ Kohana) but it's largely unused because...\n        </li>\n        <li>I started by pulling content directly out of CartoDB and (associated episodes/bits) from MongoLab. Possible because every bit in Mongo with a spatial reference stored a foreign key to the CartoDB record. The problem with that is CartoDB is only queryable with SQL, which I'm not willing to A) foist upon users and/or B) abstract at the client level. The solution was to stand up a Solr instance and index both the CartoDB content <em>and</em> the Mongo content with it. Right now, when you <a href=\"#query\">query</a> here, you're querying against the CartoDB records <em>only</em>. So you won't get full BitTracker results. Meaning you can't query for \"titular\" and expect to get back all of Scott's \"titular\" uses (like you'll get in the BitTracker). You can only search against the text that has been written into either the \"name\" or \"anno\" fields of the CartoDB records (lemme note here that if you don't specify a field and just type in keywords you're actually querying the name AND anno fields).\n        </li>\n        <li>\n            Sidebar? Pulling stuff into Solr from CartoDB (and MongoLab, for that matter) is pretty simple, really. Here are the three lines (that you could prolly pipe together if you were so inclined):\n\n\n            <pre>\n            # pull (select) cartodb fields down as json\n            curl \"https://<YOUR CARTODB USERNAME>.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||%27,%27||ST_X%28the_geom%29%29%20as%20loc%20from%20cbb_point\" -o /tmp/pcdbraw.json;\n            \n\n            # query out just the rows array for a clean send to Solr\n            # prolly there are things you can do at the Solr schema end to preclude this step, but it's easy enough\n            jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json\n\n            # send up to yr solr instance - don't forget the commit=true param\n            curl 'http://localhost/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'\n            </pre>\n        </li>\n        <li>\n            Once the data are indexed in Solr, the rest is just all this dumb app logic/navigation/styling. Which isn't trivial -- it represents the bulk of the work -- but it's even more boring to write about than piping CartoDB into Solr.\n        </li>\n    </ul>\n    </p>\n</div>";
  },"useData":true});
templates['querySubNavViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return " <div class=\"querysubnavh\">\n<!--for Query:</span> "
    + escapeExpression(((helper = (helper = helpers.displaystring || (depth0 != null ? depth0.displaystring : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"displaystring","hash":{},"data":data}) : helper)))
    + "\n\n<span class=\"query-console-arrow\" style=\"font-size:.8em;margin-left:30px;margin-right:30px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span> -->\n	<span data-id=\"bits\" class=\"query-subnav-btn\">Bits <span class=\"query-subnav-count query-subnav-count-bits\"></span></span>\n	<span data-id=\"locations\" class=\"query-subnav-btn active\">Locations <span class=\"query-subnav-count query-subnav-count-locations\"></span></span>\n	</div>";
},"useData":true});
templates['queryViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" id=\"query-form-input\" value=\""
    + escapeExpression(((helper = (helper = helpers.displaystring || (depth0 != null ? depth0.displaystring : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"displaystring","hash":{},"data":data}) : helper)))
    + "\">\n      <span class=\"input-group-btn\">\n        <button id=\"query-form-bt\" class=\"btn btn-default\" type=\"button\" placeholder=\"search the source for new results\">Search</button>\n      </span>\n    </div><!-- /input-group -->\n\n";
},"useData":true});
templates['recentItemViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"created_at","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<a href=\"#\" class=\"mnuThumbnail "
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a> (created:     ";
  stack1 = ((helper = (helper = helpers.timeize || (depth0 != null ? depth0.timeize : depth0)) != null ? helper : helperMissing),(options={"name":"timeize","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.timeize) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n, updated: ";
  stack1 = ((helper = (helper = helpers.timeize || (depth0 != null ? depth0.timeize : depth0)) != null ? helper : helperMissing),(options={"name":"timeize","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.timeize) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  return buffer + ")";
},"useData":true});
templates['recentsViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <dt>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</dt>\n  <dd>"
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = " <tr><td>\n <span class=\"loc-trigger\" data-string=\"cartodb_id:"
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\"><span class=\"loc-string\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span><i class=\"glyphicon glyphicon-map-marker\"></i></span></td><td>";
  stack1 = ((helper = (helper = helpers.timeize || (depth0 != null ? depth0.timeize : depth0)) != null ? helper : helperMissing),(options={"name":"timeize","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.timeize) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td><td>";
  stack1 = ((helper = (helper = helpers.timeize || (depth0 != null ? depth0.timeize : depth0)) != null ? helper : helperMissing),(options={"name":"timeize","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.timeize) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td></tr>\n <!--   <dt>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</dt>\n   <dd>"
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + ": ";
  stack1 = ((helper = (helper = helpers.scope_and_use || (depth0 != null ? depth0.scope_and_use : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scope_and_use","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dd> -->\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"created_at","hash":{},"data":data}) : helper)));
  },"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.updated_at || (depth0 != null ? depth0.updated_at : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"updated_at","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!-- <dl class=\"col-md-12 col-md-offset-1\">\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</dl>\n -->\n\n <div class=\"container col-md-6\"><table class=\"table\">\n <thead>\n           <tr>\n             <th>Location Name</th>\n             <th>Date Created</th>\n             <th>Date Updated</th>\n           </tr>\n         </thead>\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " <!-- </dl> -->\n </table></div>\n";
},"useData":true});
templates['solrfieldsView'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <dt>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</dt>\n  <dd>"
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + ": ";
  stack1 = ((helper = (helper = helpers.scope_and_use || (depth0 != null ? depth0.scope_and_use : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scope_and_use","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dd>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h4 class=\"col-md-3\">"
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + " Available Fields:</h4>\n\n<dl class=\"col-md-12 col-md-offset-1\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.fields : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</dl>\n";
},"useData":true});
})();