(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['HowlEpisodeViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a target=\"blank\" href=\""
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + "\" title=\"we can't yet link to Howl episode timestamps - this will go to the episode page\">\n<img class=\"\" src=\"images/ico.howl.png\" height=\"30\" width=\"20\"> "
    + escapeExpression(((helper = (helper = helpers.episode_title || (depth0 != null ? depth0.episode_title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode_title","hash":{},"data":data}) : helper)))
    + " is at Howl.fm\n</a>";
},"useData":true});
templates['activityViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "  <span class=\"activity-message pull-left\">";
  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n  <span class=\"activity-cancel glyphicon glyphicon-remove-sign\" style=\"margin-left:10px;\"></span>";
},"useData":true});
templates['baseLayerMnuItem'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"mnuThumbnail "
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" id=\""
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "\">\n      <img src=\""
    + escapeExpression(((helper = (helper = helpers.thumb || (depth0 != null ? depth0.thumb : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumb","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"55px\" height=\"55px\" />\n    </div>";
},"useData":true});
templates['bitsView-Mobile'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"pick\">\n\n<div class=\"\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.instance : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
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
  return "<span class=\"instance\">"
    + escapeExpression(lambda((depth0 != null ? depth0.instance : depth0), depth0))
    + "</span>\n";
},"4":function(depth0,helpers,partials,data) {
  return "(no description provided)\n";
  },"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "	<div class=\"cbbanno\"><span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\""
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + "\"'><span class=\"loc-string\">bit: "
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + "</span></span> ("
    + escapeExpression(lambda((depth0 != null ? depth0.elucidation : depth0), depth0))
    + ")</div>\n<!-- <div class=\"cbbanno\">"
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.elucidation : depth0), depth0))
    + ")</div> -->\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- <h1 class=\"stroke\" style=\"margin-bottom:43px;\">Unmappable Bits<span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> </h1> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n<!-- <div class=\"cbbanno\">(Bits in the Tracker but without Locations)</div> -->\n\n<!-- <h1 class=\"stroke\" style=\"\">(mobile view) -->\n<!-- <span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n<!-- </h1> -->\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['bitsView'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"pick\">\n\n<div class=\"\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.instance : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
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
  return "<span class=\"instance\">"
    + escapeExpression(lambda((depth0 != null ? depth0.instance : depth0), depth0))
    + "</span>\n";
},"4":function(depth0,helpers,partials,data) {
  return "(no description provided)\n";
  },"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "	<div class=\"cbbanno\"><span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\""
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + "\"'><span class=\"loc-string\">bit: "
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + "</span></span> ("
    + escapeExpression(lambda((depth0 != null ? depth0.elucidation : depth0), depth0))
    + ")</div>\n<!-- <div class=\"cbbanno\">"
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.elucidation : depth0), depth0))
    + ")</div> -->\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- <h1 class=\"stroke\" style=\"margin-bottom:43px;\">Unmappable Bits<span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> </h1> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n<!-- <div class=\"cbbanno\">(Bits in the Tracker but without Locations)</div> -->\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['cartoListView-Mobile'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"pick\">\n    <div class=\"\">\n\n        <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"carto-plain-title "
    + escapeExpression(lambda((depth0 != null ? depth0.active : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + "</span>\n        <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"carto-plain-geomtype icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + " bt-cartoobj\"></span>\n        <!-- <span class=\"glyphicon glyphicon-share-alt bt-cartoobj bt-cartoobj-zoomto\" title=\"zoom to this\"></span> -->\n        <!-- <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of associated episodes\"></span> -->\n        <!-- <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-asterisk bt-getid\" title=\"echo model id (dev only)\"></span> -->\n        <!-- ";
  stack1 = ((helpers.indev || (depth0 && depth0.indev) || helperMissing).call(depth0, (depth0 != null ? depth0.cartodb_id : depth0), (depth0 != null ? depth0.geom_type : depth0), {"name":"indev","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " -->\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <p class=\"cbbanno\">("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- <h1 class=\"stroke\" style=\"\">(mobile view) -->\n<!-- <span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n<!-- </h1> -->\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['cartoListView'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"pick\">\n    <div class=\"\">\n\n        <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"carto-plain-title "
    + escapeExpression(lambda((depth0 != null ? depth0.active : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n        <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"carto-plain-geomtype icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + " bt-cartoobj\"></span>\n        <!-- <span class=\"glyphicon glyphicon-share-alt bt-cartoobj bt-cartoobj-zoomto\" title=\"zoom to this\"></span> -->\n        <!-- <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" data-type=\""
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of associated episodes\"></span> -->\n        <!-- <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-asterisk bt-getid\" title=\"echo model id (dev only)\"></span> -->\n        <!-- ";
  stack1 = ((helpers.indev || (depth0 && depth0.indev) || helperMissing).call(depth0, (depth0 != null ? depth0.cartodb_id : depth0), (depth0 != null ? depth0.geom_type : depth0), {"name":"indev","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " -->\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
  return "";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <p class=\"cbbanno\">("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- <h1 class=\"stroke\" style=\"\">bits - mapped <span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span> </h1> -->\n<!-- <span class=\"episodes hidden\" style=\"margin-left:12px;\">\\-\\-\\-\\-\\-\\-\\-\\-></span>  -->\n";
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
  return escapeExpression(((helper = (helper = helpers.episode_title || (depth0 != null ? depth0.episode_title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode_title","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a target=\"blank\" href=\"http://www.earwolf.com/episode/"
    + escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\" title=\"link (new tab) to the episode page at Earwolf\">";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.episode_title : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n(#"
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + ":"
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + ")\n<!-- <a href=\"http://earwolf.com/episode/"
    + escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)))
    + "\">\n	<img src=\"images/bt-earwolf.png\" alt=\"\" width=\"15\" height=\"15\" border=\"0\" />\n</a> -->\n<!-- , -->\n<a target=\"blank\" href=\""
    + escapeExpression(((helper = (helper = helpers.slug_soundcloud || (depth0 != null ? depth0.slug_soundcloud : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_soundcloud","hash":{},"data":data}) : helper)))
    + "\" title=\"link (new tab) to "
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + " at SoundCloud\">\n	<img src=\"images/bt-soundcloud.png\" alt=\"\" width=\"30\" height=\"20\" border=\"0\" />\n</a>\n\n<!-- ), at ~"
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + " -->";
},"useData":true});
templates['facetView'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li class=\"pull-left\"><span class=\"bt-facet "
    + escapeExpression(lambda((depth0 != null ? depth0.active : depth0), depth0))
    + "\" data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0['0'] : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0['0'] : depth0), depth0))
    + "</span> <span class=\"bitsanno\">("
    + escapeExpression(lambda((depth0 != null ? depth0['1'] : depth0), depth0))
    + ")</span></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<h4>Facets: "
    + escapeExpression(lambda((depth0 != null ? depth0.group : depth0), depth0))
    + "</h4>\n<ul class=\"col-md-12 facets\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.facets : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});
templates['fullstory'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"slide\"><div class=\"block slide1\"><h1>What's Really Going On?\n    <span class=\"icom-bang\" style=\"font-size:1.5em;\"></span></h1>\n    <!-- <div class=\"gnpanel-r gnpanel-b pull-left col-lg-7\"><div class=\"block\"><h1>What's Really Going On?</h1> -->\n    <p>This is primarily a map of every spatial reference from every <a href=\"http://www.earwolf.com/show/comedy-bang-bang/\"><em>Comedy Bang! Bang!</em></a> episode ever recorded. Such as:\n    <ul style=\"padding-left:10%;\">\n        <li>the probable location of the <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:17 AND location_type:point\"><span class=\"loc-string\">Nordstrom that sold Danny Mahoney his heavy suicide coat</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span></li>\n        <li>the very-difficult-to-actually-map location of <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:410 AND location_type:point\"><span class=\"loc-string\">The Calvins Bee Honey Horse Fight Fields</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span></li>\n        <li>JW Stillwater's route <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:53 AND location_type:line\"><span class=\"loc-string\">from Cumberbatch County to L.A. via the Panama Canal</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span></li>\n        <li>basically <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"huell\"><span class=\"loc-string\">anything Huell Howser has ever said</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span></li>\n    </ul>\n    </p>\n    <p>...that sort of thing.</p>\n    <p>But, ok -- technically, <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='*:*'><span class=\"loc-string\">all of the bits we've logged so far</span></span> are indexed here (not just the mappable ones), so you <em>could</em> consider this a master database of every individual trope and recurring CBB bit (e.g. <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\"Open Door Policy\"'><span class=\"loc-string\"><em>the CBB Open Door Policy</em></span></span>, <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\"Titular\"'><span class=\"loc-string\"><em>titular</em></span></span>, <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\"Cake Boss!\"'><span class=\"loc-string\"><em>\"Cake Boss!\"</em></span></span>, etc.). But this thing, as-is, focuses on the places and locations more than the entire universe of bits. See below for more about a potential larger scope.</p>\n    \n    <!--So while this thing technically does deliver\n    , its primary purpose is to render . Such as:</p>\n    <p>\n        And for real the reason to do it is that the universe of CBB's characters - when canon - is so rich and sprawling that I wanted it all in one place, where I could wade into it from multiple angles, aspects, and facets. e.g. I wanted be able to visualize...\n        So for now it's just a map of places that comprise the world of the CBB canon (and perhaps its diaspora).\n    </p>-->\n    <!-- <p><sup>*</sup> – Meaning that if Don DiMello shows up on <em><a href=\"http://www.earwolf.com/show/spontaneanation-with-paul-f-tompkins/\">Spontaneation</a></em> or <em><a href=\"http://www.gosuperego.com\">Superego</a></em> and says something mappable, it can show up here. I haven't been through any of those combing for locations yet, however.</p> -->\n</div>\n</div> <!-- ./gnpanel -->\n<!-- <div class=\"gnpanel pull-left col-lg-5\"><div class=\"block\"><h1>A Note on Location Scope</h1> -->\n<div class=\"slide\"><div class=\"block slide2\"><h1>A Note on Location Scope<span class=\"icom-bang\" style=\"font-size:1.5em;\"></span></h1>\n    <p>Included here are ~all locations that were <em>generated</em> during the show. Meaning only locations that were somehow parts of a bit or part of something intentionally funny <em>and</em> part of a contribution to the show are included. Meaning that if Todd Barry plugs his gig at the Chuckle Hut or we hear that Jimmy Pardo ran into Nick Kroll at a grilled cheese sandwich place irl, it doesn't need to be here. \n\n    But <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:46 AND location_type:point\"><span class=\"loc-string\">Huell Howser's birth bed</span><i class=\"glyphicon glyphicon-map-marker\"></i></span>? Yes. \n\n    And <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:404 AND location_type:point\"><span class=\"loc-string\">that place that almost housed a Victor Diamond show</span><i class=\"glyphicon glyphicon-map-marker\"></i></span>? Yes. \n\n    And <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:13 AND location_type:point\"><span class=\"loc-string\">The Grove</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span> \n\n    and <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:133 AND location_type:poly\"><span class=\"loc-string\">the ArcLight</span><i class=\"glyphicon glyphicon-map-marker\"></i></span> \n\n    (including <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:32 AND location_type:line\"><span class=\"loc-string\">Cactus Tony's bus route <em>to</em> it</span><i class=\"glyphicon glyphicon-map-marker\"></i></span>) \n\n    and <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:96 AND location_type:point\"><span class=\"loc-string\">the Pantages</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span> \n\n    and <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:79 AND location_type:poly\"><span class=\"loc-string\">Bob Ducca's Castaic</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span> \n\n    and <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:7 AND location_type:point\"><span class=\"loc-string\">Six Flags Magic Mountain</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span> are all here.</p>\n</div></div>\n<!-- <div class=\"gnpanel-0 pull-left col-lg-8\"> -->\n<div class=\"slide\">\n    <div class=\"block slide3\"><h1>BitTracker?!<span class=\"icom-bang\" style=\"font-size:1.5em;\"></span></h1>\n        <p>\n        <div class=\"pull-right\">\n            <a href=\"images/btracker_preview.png\" target=\"_self\"><img class=\"featurette-image img-responsive pull-right\" alt=\"bittracker peek\" src=\"images/btracker_preview.png\" style=\"margin:11px;\" height=\"100\" width=\"250\"></a>\n            <div class=\"caption\">\n                <p>Screencap of a text export of some sample BitTracker records.</p>\n            </div>\n        </div>\n        <p>\n    But you wanna talk more about this? Well, the ultimate idea is to build a bittracker, for lack of a better name. <strong>Yeah, a <em>BitTracker</em></strong>. A tracker of bits. How many times (and when) <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\"My Wife!\"'><span class=\"loc-string\"><em>My Wife!</em></span></span>; how many times (and when) a <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:Classic WYR Blunder*'><span class=\"loc-string\"><em>classic WYR blunder</em></span></span>. That sort of thing. But in a way that doesn't just list them out (or map them, when possible) but instead wraps some other methods of access around them -- a supercutter, for example (e.g. \"click - supercut all the <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:Please Call Me \\\"Garry\\\"*'><span class=\"loc-string\"><em>please call me Garrys</em></span></span> together\" or \"click - supercut all of <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:Ducca List'><span class=\"loc-string\"><em>Bob Ducca's lists</em></span></span> together\"). Or the original dream - something built on the SoundCloud copies of the episodes that lets everybody add/edit/annotate all this bullshit. So think something like the <a href=\"http://comedybangbang.wikia.com\">CBB wikia</a>, but with a finer granularity and a more data-focused approach.</p></div></div>\n    <!-- <div class=\"block\"><h1>Is <em>Everything</em> Geocoded?</h1>\n    <p>But no, not everything is in here. Yet. Once I realized I wanted to do this, I started re-listening from episode 1, logging locations instead of bits (which I'll pick back up later). I'm only through #143, so there will be plenty more added here in due time. I <em>may</em> add the ability for users to submit/edit locations, but that requires the addition of a whole other layer of app logic. The crowd-sourcing model will better suit the BitTracker anyway.</p></div> -->\n    <!-- <div class=\"gnpanel gnpanel-l gnpanel-t pull-left col-lg-4\"><div class=\"block\"><h1>What's Next?</h1> -->\n    <div class=\"slide\"><div class=\"block slide4\"><h1>What's Next?\n        <span class=\"icom-bang\" style=\"font-size:1.5em;\"></span></h1>\n        <p>\n        <ul>\n            <li>As episodes are released, locations and bits will be added.</li>\n            <li>As old episodes are revisited, missed locations and bits will be added.</li>\n            <li>The web app might get an inline audio player (with or without annotation/edit capabilities).</li>\n            <li>Some poor asshole needs to build the full BitTracker still (and fold this into it).</li>\n            <li>The crowd-sourcer component needs to be carefully designed, certainly based on the experience of just this mapping app -- e.g. it might behoove us to move the backend to a wiki platform and harvest all data <em>from</em> there (rather than continue to store bit- and location-level data in MongoDB and CartoDB instances, respectively, and handle the crowdsourcing pieces from custom-built code. The very useful <a href=\"http://comedybangbang.wikia.com\">CBB wikia instance</a> could become a mutual asset, for instance.</li>\n        </ul>\n        </p>\n    </div></div>\n    <!-- <div class=\"block\"><h1>Ideas? Complaints?</h1>\n                <p>\n                    At least until it gets abusive, feel free to submit ideas, corrections, diet pill ads, etc. in the <a href=\"#feedback\">Feedback tab</a>.\n                </p>\n    </div> -->";
  },"useData":true});
templates['help-mobile'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"mobile-slide-nav row\">\n<!-- <ul class=\"\">\n<li class=\" active\">Talky Help</li>\n<li class=\"\">Disqus Forum Help</li>\n  </ul> -->\n  </div> <!-- mobile-slide-nav -->\n\n<div class=\"gnpanel gnpanel-r pull-left col-lg-8 mobile-wrapper mobile-wrapper-1\">\n<div class=\"block\"><h1>Help<span class=\"icom-bang\" style=\"font-size:1.5em;\"></span></h1>\nYou need help? With this dumb, free thing? Fine, here:\n\n\n\n<p><ul>\n<li>First of all, if you wanna chat about this thing, do it at <a class=\"\" id=\"\" href=\"http://twitter.com/ZapStraightToIt\" target=\"_blank\" title=\"this thing's Twitter account\"><span style=\"font-size:2em;\" class=\"icom-social-twitter\"></span></a> or <a href=\"https://disqus.com/home/forums/cbbmap/\"><span style=\"font-size:3em;vertical-align:bottom;\" title=\"this thing's Disqus thread\" class=\"icom-social-disqus\"></span></a></li>\n<li>\nAs of this writing there are 1884 bits records and 880 location records in our db. Doing a query for everything (e.g. <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='*:*'><span class=\"loc-string\">\"*\"</span></span>) will lag a little, almost entirely because it takes a while to actually render the locations on the map (e.g. the search is fast, the blue dots and lines and stuff takes a while).\n</li>\n\n<li>Oh, that reminds me: you can search by word, phrase, etc., but to just show everything you can hit the Search button with nothing in the form or type \"*\" or type \"*:*\".\n	</li>\n\n<li>\n	If ur fancy, use <a href=\"https://cwiki.apache.org/confluence/display/solr/The+Standard+Query+Parser\">Lucene query syntax</a> (this thing runs at least in part on <a href=\"http://lucene.apache.org/solr/\">Apache Solr</a>). If ur a tl;dr type, just know you can do Googley stuff, like <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='dimello +wompler'><span class=\"loc-string\">\"dimello +wompler\"</span></span> or <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='ducca -list'><span class=\"loc-string\">\"ducca -list\"</span></span> or whatev.\n</li>\n\n<li>Every query is run against the bits index first and <em>from that result set</em> we extract the locations (and also <em>from that result set</em> the facets are extracted). The implication is that if you wanted to search for, say, \"Boston\" to see if any references exist in or around that fine city, you'll only get results if the name or description of the bit has the word \"Boston\" in it. We didn't expect anybody would want to initiate spatial processing just to find out if we have bits mapped to Oklahoma or Chilé or wherever (you can just run an empty query and check the map, after all). If you do want spatial query, though, tell Disqus about it <span class=\"glyphicon glyphicon-arrow-right\"></span></li>\n\n<li>\n	Oh, right: if you have a legit question or comment, there is a Disqus instance for this project. Over there <span class=\"glyphicon glyphicon-arrow-right\"></span>\n</li>\n\n<li>\n	Finally, a little about the organization of these data may or may not help make sense of all of this garbage. If you are into this sort of thing:\n	<p>\n		We technically have two databases, bits and locations. The bits are stored in MongoDB and look something like this:\n		<pre>\n			{\n  \"_id\": ObjectId(\"55930ad5ab4a6112ecad33bb\"),\n  \"show\": \"cbb\",\n  \"episode\": 304,\n  \"episode_title\": \"Marissa Wompler's Six Flags Birthday Womptacular\",\n  \"guests\": \"Jessica St. Clair,Lennon Parham,Lauren Lapkus,Jason Mantzoukas,Brian Huskey,Melissa Rauch,Andy Daly\",\n  \"slug_earwolf\": \"marissa-womplers-six-flags-birthday-womptacular\",\n  \"id_wikia\": 4811,\n  \"url_soundcloud\": \"304-jessica-st-clairlennon-parhamlauren-lapkusjason-mantzoukasbrian-huskeyandy-dalymelissa-r\",\n  \"created_at\": \"2015-04-03T10:51:29Z\",\n  \"updated_at\": \"2015-06-03T10:51:29Z\",\n  \"soclo_link\": \"http://soundcloud.com/comedybangbang/304-jessica-st-clairlennon-parhamlauren-lapkusjason-mantzoukasbrian-huskeyandy-dalymelissa-r/#t=45:37\",\n  \"bit\": \"where are you from?\",\n  \"instance\": \"Nobody can place Dabney's accent\",\n  \"elucidation\": \"a character detail is challenged or prompted\",\n  \"tags\": \"Marissa Wompler,Miss Listler, Eric Gutterman, Danielle Bartiromo, Dr. Seth Wompler, Dabney Coleperson, Traci Reardon, Katie Wong\",\n  \"tstart\": \"45:37\",\n  \"tend\": \"46:07\",\n  \"holding\": \"false\",\n  \"scope\": \"\",\n  \"location_type\": \"\",\n  \"location_id\": \"\"\n}\n		</pre>\n    But some of them look like this:\n    <pre>\n{\n  \"_id\": ObjectId(\"55930ad5ab4a6112ecad38cc\"),\n  \"show\": \"cbb\",\n  \"episode\": 12,\n  \"slug_earwolf\": \"the-babys-sunglasses\",\n  \"id_wikia\": 2426,\n  \"url_soundcloud\": \"the-babys-sunglasses\",\n  \"created_at\": \"2015-04-03T10:51:29Z\",\n  \"updated_at\": \"2015-06-03T10:51:29Z\",\n  \"soclo_link\": \"http://soundcloud.com/comedybangbang/the-babys-sunglasses/#t=19:30\",\n  \"bit\": \"Location\",\n  \"instance\": \"Scott met Bobby at the Ed Hardy store on Melrose, which is where Bobby buys t-shirts of dragons raping lions on skateboards.\",\n  \"elucidation\": \"Identifiable earth location.\",\n  \"tags\": \"Bobby Bottleservice\",\n  \"tstart\": \"19:30\",\n  \"tend\": \"19:46\",\n  \"holding\": \"false\",\n  \"scope\": \"\",\n  \"location_type\": \"point\",\n  \"location_id\": 429\n}\n    </pre>\n    These are the things you're searching against when you query and these are the things to which all the facets apply. But did you see the difference between those two examples? The one with <code>\"bit\":\"Location\"</code> has a (populated) field (<code>location_id</code>) that links out to the other database we are keeping -- it's a <a href=\"http://cartodb.com\">CartoDB</a> instance in which we are storing all of the spatial objects referred <em>to</em> by those Location bits (in this case <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:429 AND location_type:point\" data-original-title=\"\" title=\"\"><span class=\"loc-string\">the Ed Hardy store on Melrose</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span>). So when you query, we first look into all of the bits we have and then if there are any with <code>\"bit\":\"Location\"</code> we grab those <code>location_id</code> values and shop those against a separate index of our <a href=\"http://cartodb.com\">CartoDB</a> content. It's faster than it sounds but not instantaneous.\n	</p>\n\n	<p>But another thing about that raw data you see up there: notice that each bit has, among other fields that might be more self-explanatory, a <code>name</code>, a <code>desc</code>, and an <code>elucidation</code>. That's confusing, why do it? Well, the name is the consistent, recurring, unique thing we call that bit. \"My Wife!\" for example. Identifiable - an id or tag, basically, for all of the different situations and scenarios in which Scott (or anybody, really), does that Borat thing. So the <em>name</em> of the bit is \"My Wife!\" Done. Likewise, the elucidation never changes, either -- it's the master description of that bit. A better example is the bit we're calling \"where are you from?\" That one is less self-explanatory, so the elucidation is there in every instance to help explain and contextualize that bit. Now, the <code>desc</code> field is specific to the individual instance of that bit. So \"My Wife!\" or \"Cake Boss!\" or \"Ho ho!\" occur countless times, but every time they happen there's some \"description\" for the occurence. That goes into the <code>desc</code> field. Just fyi.</p>\n\n</li>\n\n	</ul></p>\n\n </div>\n </div>\n\n";
  },"useData":true});
templates['help'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"gnpanel gnpanel-0 pull-left col-lg-12\"><div class=\"block\"><h1>Help<span class=\"icom-bang\" style=\"font-size:1.5em;\"></span></h1>\nYou need help? With this dumb, free thing? Fine, here:\n\n\n<p><ul>\n<li>First of all, if you wanna chat about this thing, do it at <a class=\"\" id=\"\" href=\"http://twitter.com/ZapStraightToIt\" target=\"_blank\" title=\"this thing's Twitter account\"><span style=\"font-size:2em;\" class=\"icom-social-twitter\"></span></a> or <a href=\"https://disqus.com/home/forums/cbbmap/\"><span style=\"font-size:3em;vertical-align:bottom;\" title=\"this thing's Disqus thread\" class=\"icom-social-disqus\"></span></a></li>\n<li>\nAs of this writing there are 1884 bits records and 880 location records in our db. Doing a query for everything (e.g. <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='*:*'><span class=\"loc-string\">\"*\"</span></span>) will lag a little, almost entirely because it takes a while to actually render the locations on the map (e.g. the search is fast, the blue dots and lines and stuff takes a while).\n</li>\n\n<li>Oh, that reminds me: you can search by word, phrase, etc., but to just show everything you can hit the Search button with nothing in the form or type \"*\" or type \"*:*\".\n	</li>\n\n<li>\n	If ur fancy, use <a href=\"https://cwiki.apache.org/confluence/display/solr/The+Standard+Query+Parser\">Lucene query syntax</a> (this thing runs at least in part on <a href=\"http://lucene.apache.org/solr/\">Apache Solr</a>). If ur a tl;dr type, just know you can do Googley stuff, like <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='dimello +wompler'><span class=\"loc-string\">\"dimello +wompler\"</span></span> or <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='ducca -list'><span class=\"loc-string\">\"ducca -list\"</span></span> or whatev.\n</li>\n\n<li>Every query is run against the bits index first and <em>from that result set</em> we extract the locations (and also <em>from that result set</em> the facets are extracted). The implication is that if you wanted to search for, say, \"Boston\" to see if any references exist in or around that fine city, you'll only get results if the name or description of the bit has the word \"Boston\" in it. We didn't expect anybody would want to initiate spatial processing just to find out if we have bits mapped to Oklahoma or Chilé or wherever (you can just run an empty query and check the map, after all). If you do want spatial query, though, tell Disqus about it <span class=\"glyphicon glyphicon-arrow-right\"></span></li>\n\n<li>\n	Oh, right: if you have a legit question or comment, there is a Disqus instance for this project. Over there <span class=\"glyphicon glyphicon-arrow-right\"></span>\n</li>\n\n<li>\n	Finally, a little about the organization of these data may or may not help make sense of all of this garbage. If you are into this sort of thing:\n	<p>\n		We technically have two databases, bits and locations. The bits are stored in MongoDB and look something like this:\n		<pre>\n			{\n  \"_id\": ObjectId(\"55930ad5ab4a6112ecad33bb\"),\n  \"show\": \"cbb\",\n  \"episode\": 304,\n  \"episode_title\": \"Marissa Wompler's Six Flags Birthday Womptacular\",\n  \"guests\": \"Jessica St. Clair,Lennon Parham,Lauren Lapkus,Jason Mantzoukas,Brian Huskey,Melissa Rauch,Andy Daly\",\n  \"slug_earwolf\": \"marissa-womplers-six-flags-birthday-womptacular\",\n  \"id_wikia\": 4811,\n  \"slug_soundcloud\": \"304-jessica-st-clairlennon-parhamlauren-lapkusjason-mantzoukasbrian-huskeyandy-dalymelissa-r\",\n  \"created_at\": \"2015-04-03T10:51:29Z\",\n  \"updated_at\": \"2015-06-03T10:51:29Z\",\n  \"soclo_link\": \"http://soundcloud.com/comedybangbang/304-jessica-st-clairlennon-parhamlauren-lapkusjason-mantzoukasbrian-huskeyandy-dalymelissa-r/#t=45:37\",\n  \"bit\": \"where are you from?\",\n  \"instance\": \"Nobody can place Dabney's accent\",\n  \"elucidation\": \"a character detail is challenged or prompted\",\n  \"tags\": \"Marissa Wompler,Miss Listler, Eric Gutterman, Danielle Bartiromo, Dr. Seth Wompler, Dabney Coleperson, Traci Reardon, Katie Wong\",\n  \"tstart\": \"45:37\",\n  \"tend\": \"46:07\",\n  \"holding\": \"false\",\n  \"scope\": \"\",\n  \"location_type\": \"\",\n  \"location_id\": \"\"\n}\n		</pre>\n    But some of them look like this:\n    <pre>\n{\n  \"_id\": ObjectId(\"55930ad5ab4a6112ecad38cc\"),\n  \"show\": \"cbb\",\n  \"episode\": 12,\n  \"slug_earwolf\": \"the-babys-sunglasses\",\n  \"id_wikia\": 2426,\n  \"slug_soundcloud\": \"the-babys-sunglasses\",\n  \"created_at\": \"2015-04-03T10:51:29Z\",\n  \"updated_at\": \"2015-06-03T10:51:29Z\",\n  \"soclo_link\": \"http://soundcloud.com/comedybangbang/the-babys-sunglasses/#t=19:30\",\n  \"bit\": \"Location\",\n  \"instance\": \"Scott met Bobby at the Ed Hardy store on Melrose, which is where Bobby buys t-shirts of dragons raping lions on skateboards.\",\n  \"elucidation\": \"Identifiable earth location.\",\n  \"tags\": \"Bobby Bottleservice\",\n  \"tstart\": \"19:30\",\n  \"tend\": \"19:46\",\n  \"holding\": \"false\",\n  \"scope\": \"\",\n  \"location_type\": \"point\",\n  \"location_id\": 429\n}\n    </pre>\n    These are the things you're searching against when you query and these are the things to which all the facets apply. But did you see the difference between those two examples? The one with <code>\"bit\":\"Location\"</code> has a (populated) field (<code>location_id</code>) that links out to the other database we are keeping -- it's a <a href=\"http://cartodb.com\">CartoDB</a> instance in which we are storing all of the spatial objects referred <em>to</em> by those Location bits (in this case <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string=\"location_id:429 AND location_type:point\" data-original-title=\"\" title=\"\"><span class=\"loc-string\">the Ed Hardy store on Melrose</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span>). So when you query, we first look into all of the bits we have and then if there are any with <code>\"bit\":\"Location\"</code> we grab those <code>location_id</code> values and shop those against a separate index of our <a href=\"http://cartodb.com\">CartoDB</a> content. It's faster than it sounds but not instantaneous.\n	</p>\n\n	<p>But another thing about that raw data you see up there: notice that each bit has, among other fields that might be more self-explanatory, a <code>name</code>, a <code>desc</code>, and an <code>elucidation</code>. That's confusing, why do it? Well, the name is the consistent, recurring, unique thing we call that bit. \"My Wife!\" for example. Identifiable - an id or tag, basically, for all of the different situations and scenarios in which Scott (or anybody, really), does that Borat thing. So the <em>name</em> of the bit is \"My Wife!\" Done. Likewise, the elucidation never changes, either -- it's the master description of that bit. A better example is the bit we're calling \"where are you from?\" That one is less self-explanatory, so the elucidation is there in every instance to help explain and contextualize that bit. Now, the <code>desc</code> field is specific to the individual instance of that bit. So \"My Wife!\" or \"Cake Boss!\" or \"Ho ho!\" occur countless times, but every time they happen there's some \"description\" for the occurence. That goes into the <code>desc</code> field. Just fyi.</p>\n\n</li>\n\n	</ul></p>\n\n </div>\n </div>\n\n";
  },"useData":true});
templates['hitMarkerViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n";
},"3":function(depth0,helpers,partials,data) {
  return "    <h5>(no name string)</h5>\n";
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<p class=\"text-muted\">"
    + escapeExpression(((helper = (helper = helpers.anno || (depth0 != null ? depth0.anno : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"anno","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\" pu-copy pu-copy-marker col-sm-12\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.anno : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div> <!-- marker -->\n\n<div class=\" content-wrap col-sm-12 hidden pu-copy pu-copy-episodes\">\n        <p class=\"text-muted\">HEYOOOOOO eps</p>\n</div> <!-- episodes -->\n\n<div class=\"hidden pu-copy pu-copy-feedback content-wrap col-sm-12\">\n            <p class=\"text-muted\">\n            Until we have a full-on crowd-source component to this, it will have to suffice to anonymously create an issue at <a href=\"https://github.com/cecois/bitmap/issues\">this project's GitHub repo</a>. Go ahead! Try to be specific, but anything that comes in I'll check out.\n            </p>\n            <p class=\"text-muted\">\n            If you really gotta know what becomes of your submission, enter some handle of yours in the handle field (use Twitter, email, GitHub username, InstaGram handle I suppose -- don't get too crazy). I'll let you know what becomes of it. Seriously! I have 0% interest in doing anything else w/ this datum, but be aware it will be part of the public GitHub issue.\n            </p>\n        <div class=\"pu-copy pu-copy-feedback pu-copy-feedback-form\">\n                <label for=\"\">Feature in Question (this)</label>\n            <input data-class=\"pu-issue-title\" class=\"form-control input-sm\" type=\"text\" placeholder=\""
    + escapeExpression(((helper = (helper = helpers.bit || (depth0 != null ? depth0.bit : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bit","hash":{},"data":data}) : helper)))
    + " ("
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + ":"
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + ")\" disabled>\n            <label for=\"\">Issue Body</label>\n            <textarea data-class=\"pu-issue-body\" placeholder=\"What's wrong with this one? (All suggestions will be investigated.)\" class=\"form-control\" rows=\"3\"></textarea>\n            <label for=\"\">Contact Handle (totally optional)</label>\n            <input data-class=\"pu-issue-contact\" class=\"form-control input-sm\" type=\"text\" placeholder=\"e.g. @toddglass or just github.com/huellhowser or something\">\n        </div> <!-- form -->\n\n            <div style=\"margin-top:5px;\"><button class=\"btn btn-default btn-xs btn-block\" type=\"submit\">Submit</button></div>\n</div> <!-- feedback -->\n\n\n<div class=\"btn-group btn-group-xs pull-right\" style=\"margin-bottom:8px;\" role=\"group\">\n\n<button data-toggle=\"tooltip\" data-target=\"marker\" type=\"button\" title=\"marker info\" class=\"btn btn-default btn-pu-nav active\"><span class=\"bt-cartoobj bt-cartoobj-feedback carto-plain-geomtype icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.geom_type : depth0), depth0))
    + "\"></span></button>\n\n <!--  <button data-toggle=\"tooltip\" data-target=\"episodes\" data-id=\"episodes\" type=\"button\" class=\"btn btn-default btn-pu-nav\"><span data-id=\""
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of referencing episodes\"></span></button> -->\n\n  <button data-toggle=\"tooltip\" data-target=\"feedback\" data-id=\"feedback\" type=\"button\" class=\"btn btn-default btn-pu-nav\"><span data-id=\""
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + escapeExpression(((helper = (helper = helpers.geom_type || (depth0 != null ? depth0.geom_type : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"geom_type","hash":{},"data":data}) : helper)))
    + "\" class=\"glyphicon glyphicon-flag bt-cartoobj bt-cartoobj-feedback\" title=\"something wrong? anonymously flag this one\"></span></button>\n\n</div>";
},"useData":true});
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<!-- <ul class=\"navigation\">\n    <li data-slide=\"1\" class=\"active\"></li>\n    <li data-slide=\"2\" class=\"\"></li>\n    <li data-slide=\"3\" class=\"\"></li>\n    <li data-slide=\"4\" class=\"\"></li>\n    <li data-slide=\"5\" class=\"\"></li>\n    <li data-slide=\"6\" class=\"\"></li>\n</ul> -->\n\n<div class=\"slide\"><div id=\"\" class=\"slide1 gnpanel col-lg-12\">\n    <div class=\"block\" style=\"\">\n        <h1 style=\"text-align:center;\">What's this, now?!\n        <span class=\"icom-bang\" style=\"font-size:2em;\"></span>\n        </h1>\n        <div class=\"pull-left col-sm-12\"><p style=\"padding-bottom:40px;\">Come on, guys -- it's a searchable index of all the recurring bits from every <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> podcast episode ever recorded. Well over a thousand of them reference actual identifiably geographic locations - those will appear on the map below. Use your <code>control</code> key or that button at left to toggle the map's visibility.</div>\n    </div>\n</div></div>\n\n\n<div class=\"slide\"><div id=\"\" class=\"slide2 gnpanel-0 col-lg-12\"><div class=\"block\"><h1 style=\"text-align:center;\"><span class=\"icom-bang\" style=\"font-size:2em;\"></span>\nWhy?\n</h1>\n    <p>Because <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> is the best thing ever recorded. Or maybe the best thing to ever even happen at all.</p>\n    <p>&nbsp;</p>\n    <p>If you really are confused, read more about it in the <a href=\"#fullstory\">Full Story tab</a>.\n    <!-- or geek dafuk out in the <a href=\"#minutiae\">Minutiae tab</a> -->\n</p></div></div></div>\n\n\n<div class=\"slide\"><div id=\"\" class=\"gnpanel col-lg-12 slide3\">\n    <div class=\"block\"><h1 style=\"text-align:center;\">Is this official?\n    <span class=\"icom-bang\" style=\"font-size:2em;\"></span></h1>\n        <p style=\"text-align:center;\">It isn't.</p>\n    </div>\n</div></div>";
  },"useData":true});
templates['minutiae'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h4>How was it Built?</h4>\n    <p>I doubt you care, but you're sweet to ask. Imma list pretty much the entire workflow just cuzzi like it when people get specific about this kind of thing:</p>\n    <p>\n    <ul class=\"ul-expando\">\n        <li>listened to CBB episodes in the default podcast app in iOS 6-7-8, in the Earwolf SoundCloud embedded player, in the SoundCloud player itself, and in VLC.app\n            <div class='anno'>this is actually significant because the timestamps can differ a little between various sources</div>\n        </li>\n        <li>started logging bits/locations directly into a <a href=\"http://mongolab.com\">MongoLab</a> account, but eventually went offline into Notes.app on iOS <em>then</em> into a Markdown+DropBox solution -- but always eventually into MongoHub\n            <div class=\"anno\">Hey, you're right - that does sound like a ridiculous amount of pointless labor. And yet here we are.</div>\n        </li>\n        <li>for each master location, I manually researched it and placed a marker in a <a href=\"http://cartodb.com\">CartoDB</a> account\n            <div class=\"anno\">...\"Master\" location because I'm not going to store a <em>seperate</em> geometry for every mention of The <span class=\"copy-trigger\" data-string=\"cartodb_id:96\"><span class=\"loc-string\">Pantages Theatre</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span> or Huell Howser's favorite Taco Bell<span class=\"copy-trigger\" data-string=\"cartodb_id:45\"><span class=\"loc-string\" > (the one on Rosemead) </span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span>. <span class=\"copy-trigger\" data-string=\"cartodb_id:13\"><span class=\"loc-string\">The Grove</span><i class=\"glyphicon glyphicon-map-marker\"></i></span> gets one marker and the BitTracker will log any individual references to it. Standard database stuff. This is especially important in the case of, say, <span class=\"copy-trigger\" data-string=\"cartodb_id:26\"><span class=\"loc-string\">The Arclight cinema</span><i class=\"glyphicon glyphicon-map-marker cbb-trigger-inline\"></i></span>, which is frequented by an almost surprising number of Hollywood's least palatable characters.</div>\n        </li>\n        <li>\n            Built up this web app, whose chief components are BackboneJS (+jQuery, +UnderscoreJS, +HandlebarsJS), Bootstrap, LessJS, etc. The usual. And for the mapping framework, the great Leaflet. Technically there's an API behind it (built w/ Kohana) but it's largely unused because...\n        </li>\n        <li>I started by pulling content directly out of CartoDB and (associated episodes/bits) from MongoLab. Possible because every bit in Mongo with a spatial reference stored a foreign key to the CartoDB record. The problem with that is CartoDB is only queryable with SQL, which I'm not willing to A) foist upon users and/or B) abstract at the client level. The solution was to stand up a Solr instance and index both the CartoDB content <em>and</em> the Mongo content with it. Right now, when you <a href=\"#query\">query</a> here, you're querying against the CartoDB records <em>only</em>. So you won't get full BitTracker results. Meaning you can't query for \"titular\" and expect to get back all of Scott's \"titular\" uses (like you'll get in the BitTracker). You can only search against the text that has been written into either the \"name\" or \"anno\" fields of the CartoDB records (lemme note here that if you don't specify a field and just type in keywords you're actually querying the name AND anno fields).\n        </li>\n        <li>\n            Sidebar? Pulling stuff into Solr from CartoDB (and MongoLab, for that matter) is pretty simple, really. Here are the three lines (that you could prolly pipe together if you were so inclined):\n\n\n            <pre>\n            # pull (select) cartodb fields down as json\n            curl \"https://<YOUR CARTODB USERNAME>.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||%27,%27||ST_X%28the_geom%29%29%20as%20loc%20from%20cbb_point\" -o /tmp/pcdbraw.json;\n            \n\n            # query out just the rows array for a clean send to Solr\n            # prolly there are things you can do at the Solr schema end to preclude this step, but it's easy enough\n            jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json\n\n            # send up to yr solr instance - don't forget the commit=true param\n            curl 'http://localhost/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'\n            </pre>\n        </li>\n        <li>\n            Once the data are indexed in Solr, the rest is just all this dumb app logic/navigation/styling. Which isn't trivial -- it represents the bulk of the work -- but it's even more boring to write about than piping CartoDB into Solr.\n        </li>\n    </ul>\n    </p>\n</div>";
  },"useData":true});
templates['querySubNavViewTpl-mobile'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"mobile-slide-nav row\">\n    <ul style=\"\"><li class=\" active\" data-target=\"querylist-bits\">\n        <span class=\"col-sm-8\">Unmappable Bits</span>\n    <span class=\"col-sm-4 query-subnav-count query-subnav-count-bits\" style=\"text-align:left;\"></span>\n    <!-- </div> -->\n    </li>\n    <li class=\"\" data-target=\"querylist-locations\">\n        <span class=\"col-sm-8\">Mappable Locations</span>\n        <span class=\"col-sm-4 query-subnav-count query-subnav-count-locations col-sm-9\" style=\"text-align:left;\"></span>\n        <!-- <div class=\"query-subnav-count query-subnav-count-locations col-sm-9\"></div> -->\n    <!-- </div> -->\n    </li>\n        \n<li class=\"\" data-target=\"episodes\"><span class=\"col-sm-8\" >Episodes</span></li>\n<li class=\"\" data-target=\"querylist-facets\"><span class=\"col-sm-8\">Facets</span></li>\n</ul>\n</div> <!-- mobile-slide-nav -->";
  },"useData":true});
templates['querySubNavViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return " <div class=\"querysubnavh col-sm-12 pull-left\">\n	<div data-id=\"bits\" class=\"query-subnav-btn col-sm-4 pull-left active\">\n		<span class=\"col-sm-9 pull-right\">Unmappable Bits</span>\n		<div class=\"query-subnav-count query-subnav-count-bits col-sm-1 pull-right\" style=\"text-align:center;\"></div>\n<!-- <span class=\"query-subnav-arro col-sm-4 pull-right\" style=\"left:8px;\"><i class=\"glyphicon glyphicon-chevron-right\"></i></span> -->\n	</div>\n\n\n	<div data-id=\"locations\" class=\"query-subnav-btn col-sm-8 pull-right active\"><span class=\"col-sm-3 pull-left\">Locations </span><div class=\"query-subnav-count query-subnav-count-locations pull-left col-sm-9\"></div>\n<!-- <span style=\"right:30px;\" class=\"query-subnav-arro col-sm-1 pull-right active\"><i class=\"glyphicon glyphicon-chevron-right\"></i></span> -->\n	</div>\n\n	<div data-id=\"episodes\" class=\"hidden query-subnav-btn\"><span class=\"col-sm-4\">Episodes</span>\n	<span class=\"glyphicon glyphicon-remove bt-episodes-hide\" title=\"hide the episodes list\"></span>\n	</div>\n\n		<!-- <div data-id=\"facets\" class=\"query-subnav-btn col-sm-2 col-sm-offset-2\"><span class=\"col-sm-8\">Facets: </span> -->\n<!-- <span style=\"right:30px;\" class=\"query-subnav-arro col-sm-1 pull-right active\"><i class=\"glyphicon glyphicon-chevron-right\"></i></span> -->\n	<!-- </div> -->\n	</div>";
  },"useData":true});
templates['queryViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" placeholder=\"e.g. 'huell' or 'mike +janitor' or '*' for everything\" id=\"query-form-input\" value=\""
    + escapeExpression(((helper = (helper = helpers.rawstring || (depth0 != null ? depth0.rawstring : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rawstring","hash":{},"data":data}) : helper)))
    + "\">\n      <span class=\"input-group-btn\">\n        <button id=\"query-form-bt\" class=\"btn btn-default\" type=\"button\" placeholder=\"search the source for new results\">Search</button>\n        <button id=\"query-form-heynongmantzoukas\" class=\"btn btn-default\" type=\"button\"><span class=\"glyphicon glyphicon-refresh\"></span></button>\n        <button id=\"query-form-randomizer\" class=\"btn btn-default\" type=\"button\"><span class=\"glyphicon glyphicon-random\"></span></button>\n      </span>\n    </div><!-- /input-group -->\n";
},"useData":true});
templates['recentItemViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"created_at","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "<a href=\"#\" class=\"mnuThumbnail "
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.bit || (depth0 != null ? depth0.bit : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bit","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.bit || (depth0 != null ? depth0.bit : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bit","hash":{},"data":data}) : helper)))
    + "\">\n"
    + escapeExpression(((helper = (helper = helpers.bit || (depth0 != null ? depth0.bit : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bit","hash":{},"data":data}) : helper)))
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
templates['recentsViewTpl-OG'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <dt>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</dt>\n  <dd>"
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, options, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = " <tr><td>\n <span class=\"copy-trigger\" data-string=\"cartodb_id:"
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
templates['recentsViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                <!-- <li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"col-sm-2 pull-left gnpanel-r\"> -->\n                <li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.instance : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </li>\n                ";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, options, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing, buffer = "                    <span class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='_id:\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\"'><span class=\"loc-string\">"
    + escapeExpression(lambda((depth0 != null ? depth0.instance : depth0), depth0))
    + "</span></span>\n                    <!-- <span class=\"cbbanno\">(";
  stack1 = ((helper = (helper = helpers.timeize || (depth0 != null ? depth0.timeize : depth0)) != null ? helper : helperMissing),(options={"name":"timeize","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.timeize) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += ")</span> -->\n                    <small>(";
  stack1 = ((helper = (helper = helpers.timeize || (depth0 != null ? depth0.timeize : depth0)) != null ? helper : helperMissing),(options={"name":"timeize","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}),(typeof helper === functionType ? helper.call(depth0, options) : helper));
  if (!helpers.timeize) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if (stack1 != null) { buffer += stack1; }
  buffer += ")</small>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.bit : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.updated_at : depth0), depth0));
  },"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            &nbsp;<span style=\"font-size:.8em;\" class=\"copy-trigger\" data-toggle=\"tooltip\" data-string='bit:\""
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + "\"'><span class=\"loc-string\">("
    + escapeExpression(lambda((depth0 != null ? depth0.bit : depth0), depth0))
    + ")</span></span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"slide\"><div id=\"\" class=\"slide4 gnpanel col-lg-12\">\n    <div class=\"block\" style=\"\">\n        <h1 style=\"text-align:center;\">Most Recent 6:\n        <span class=\"icom-bang\" style=\"font-size:2em;\"></span>\n        </h1><ul style=\"text-align:center;\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.recents : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n    </div>\n</div></div>";
},"useData":true});
templates['sharesViewTpl'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"query","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  return "(no query)\n";
  },"5":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <!-- <li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" class=\"col-sm-2 pull-left gnpanel-r\"> -->\n    <li >\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.id : depth0), {"name":"if","hash":{},"fn":this.program(6, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </li>\n";
},"6":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a class=\"social-share-element\" id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.href : depth0), depth0))
    + "?text="
    + escapeExpression(lambda((depths[2] != null ? depths[2].copy : depths[2]), depth0))
    + "&url="
    + escapeExpression(lambda((depths[2] != null ? depths[2].purl : depths[2]), depth0))
    + "&via=ZapStraightToIt&hashtags="
    + escapeExpression(lambda((depths[2] != null ? depths[2].tags : depths[2]), depth0))
    + "\" target=\"_blank\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.tip : depth0), depth0))
    + "\">\n        <span class=\"icom-"
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\"></span>\n        </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<!-- <div id=\"social-share\">\n        <a class=\"social-share-element\" id=\"social-twitter\" href=\"https://twitter.com/intent/tweet?text="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.page : depth0)) != null ? stack1.title : stack1), depth0))
    + "&url="
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "&via=OviliaZhang&hashtags="
    + escapeExpression(((helper = (helper = helpers.tagStr || (depth0 != null ? depth0.tagStr : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tagStr","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" title=\"Share this post on Twitter\"></a>\n        <a class=\"social-share-element\" id=\"social-facebook\" href=\"https://www.facebook.com/sharer/sharer.php?t="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.page : depth0)) != null ? stack1.title : stack1), depth0))
    + "&u="
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" title=\"Share this post on Facebook\"></a>\n        <a class=\"social-share-element\" id=\"social-google\" href=\"https://plus.google.com/share?url="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.site : depth0)) != null ? stack1.url : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.page : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" target=\"_blank\" title=\"Share this post on Google Plus\"></a>\n        <a class=\"social-share-element\" id=\"social-linkedin\" href=\"http://www.linkedin.com/shareArticle?mini=true&title="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.page : depth0)) != null ? stack1.title : stack1), depth0))
    + "&url="
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "&source=http%3a%2f%2fzhangwenli.com\" target=\"_blank\" title=\"Share this post on LinkedIn\"></a>\n        <a class=\"social-share-element\" id=\"social-weibo\" href=\"http://v.t.sina.com.cn/share/share.php?title=来看看+%40Ovilia允执厥中+的博文吧："
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.page : depth0)) != null ? stack1.title : stack1), depth0))
    + "&url="
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" title=\"Share this post on Sina Weibo\"></a>\n</div> \n<div>\nYour current query is: <div class=\"social-share-value\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.query : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.program(3, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n    </div>\n-->\n    \n\n<div>The shortened url is:\n<div class=\"social-share-value\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.purl || (depth0 != null ? depth0.purl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"purl","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.purl || (depth0 != null ? depth0.purl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"purl","hash":{},"data":data}) : helper)))
    + "</a>\n    </div>\n    </div>\n\n<div>\nIf you don't change it (on the next screen), the text of your tweet will be: <div class=\"social-share-value\">\n"
    + escapeExpression(((helper = (helper = helpers.copy || (depth0 != null ? depth0.copy : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"copy","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.purl || (depth0 != null ? depth0.purl : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"purl","hash":{},"data":data}) : helper)))
    + "\n</div>\n    </div>\n\n<div>...with these hashtag(s): <div class=\"social-share-value\">"
    + escapeExpression(((helper = (helper = helpers.tags || (depth0 != null ? depth0.tags : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tags","hash":{},"data":data}) : helper)))
    + "</div></div>\n\n<ul class=\"list-inline\" style=\"margin-top:25px;\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.shares : depth0), {"name":"each","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n<div class=\"row\">\n    <div class=\"pull-right\" style=\"color:black; padding-right:22px;\">\n        this project on Twitter: <a target=\"blank\" style=\"color:black;\" class=\"\" id=\"\" href=\"http://twitter.com/ZapStraightToIt\" target=\"_blank\" title=\"this thing's Twitter account\"><span style=\"font-size:2em;\" class=\"icom-social-twitter\"></span></a>\n    </div></div>";
},"useData":true,"useDepths":true});
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
templates['statesViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
templates['updatesViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Feb.02</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n<a href=\"#query/episode:%22http%3A%2F%2Fhowl.fm%2Faudio%2F26142%2Flive-from-chicago-2014%22\">13 new (11 mapped)</a> from a <a href=\"http://howl.fm\">Howl </a>Premium <a href=\"http://howl.fm/audio/26142/live-from-chicago-2014\">episode from Chicago</a> in 2014\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Feb.01</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n<ul><li><a href=\"#query/episode:398\">6 new (2 mapped)</a> from #ComedyBangBang Ep.398</li>\n<li><a href=\"#query/episode%3A%22http%3A%2F%2Fhowl.fm%2Faudio%2F26149%2Flive-from-los-angeles-2013%22\">34 new</a> (2 mapped) from #ComedyBangBang live in Los Angeles 2013 (<a href=\"http://howl.fm/audio/26149/live-from-los-angeles-2013\">Howl premium</a>)</li>\n<li><a href=\"#query/episode%3A%22http%3A%2F%2Fhowl.fm%2Faudio%2F26146%2Flive-from-festival-supreme-2014%22\">11 new</a> from #ComedyBangBang live from Festival Supreme 2014 (<a href=\"http://howl.fm/audio/26146/live-from-festival-supreme-2014\">Howl premium</a>)</li></ul>\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.30</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n        <ul>\n            <li><a href=\"#query/episode:%22http%3A%2F%2Fhowl.fm%2Faudio%2F26150%2Flive-from-boston-2013-part-1%22\">9</a> from <a href=\"http://howl.fm/audio/26150/live-from-boston-2013-part-1\">Boston 2013, Part 1</a></li>\n            <li><a href=\"#query/episode:%22http%3A%2F%2Fhowl.fm%2Faudio%2F26151%2Flive-from-boston-2013-part-2%22\">14</a> from <a href=\"http://howl.fm/audio/26151/live-from-boston-2013-part-2\">Boston 2013, Part 2</a></li>\n        </ul>\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.28</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n        <ul><li>3 stragglers from <a href=\"#query/episode:220\">#220</a> feat. <a href=\"https://twitter.com/lennonparham\">Lennon Parham</a> and <a href=\"https://twitter.com/Jessica_StClair\">Jessica St. Clair</a></li>\n         \n        <li><a href='#query/episode%3A%22http%3A%2F%2Fhowl.fm%2Faudio%2F26152%2Flive-from-chicago-2013%22'>13 (2 mappable)</a> from a 2013 <a href=\"http://howl.fm\">Howl</a> Premium <a href=\"http://howl.fm/audio/26152/live-from-chicago-2013\">episode from Chicago</a></li></ul>\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.27</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n        <ul><li><a href=\"#query/episode%3A%22http%3A%2F%2Fhowl.fm%2Faudio%2F26154%2Flive-from-milwaukee-2013%22\">17 new</a> (2 mappable) from <a href=\"http://howl.fm/audio/26154/live-from-milwaukee-2013\">Milwaukee 2013</a> (<a href=\"http://howl.fm\">Howl premium</a> episode).</li>\n<li><a href=\"#query/episode%3A%22http%3A%2F%2Fhowl.fm%2Faudio%2F26153%2Flive-from-detroit-2013%22\">32 new</a> (2 mappable) from <a href=\"http://howl.fm/audio/26153/live-from-detroit-2013\">Detroit 2013</a> (<a href=\"http://howl.fm\">Howl premium</a> episode).</li></ul>\n\nLotsa <a href=\"#query/bit:%22Topping%20Hat%22\">Topping Hat</a>, lotsa <a href=\"#query/bit:Scottrick\">Scottrick</a>, lotsa <a href=\"#query/Please+Call+Me+Garry\">Please Call Me Garry.</a>\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.23</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n        <a href='#query/episode:%22http%3A%2F%2Fhowl.fm%2Faudio%2F26157%2Flive-from-philadelphia-2013%22'>25 new</a> from <a href=\"http://howl.fm/audio/26157/live-from-philadelphia-2013\">Philadelphia in 2013</a>.\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.22</h3>\n        <p style=\"padding-bottom:40px;\">\n        \n        <a href='#query/created_at:\"2016-01-22T11:51:29Z\"'>30 new</a> from live shows in <a href=\"http://howl.fm/audio/26159/live-from-seattle-2013\">Seattle</a> and <a href=\"http://howl.fm/audio/26158/live-from-portland-2013 \">Portland</a>, 2013.\n\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.21</h3>\n        <p style=\"padding-bottom:40px;\">\n        <a href=\"#query/episode:396\">17 new</a> from # 396, <a href=\"#query/episode:\\\"http://howl.fm/audio/26160/live-from-toronto-2013\\\"\">8</a> from <a href=\"http://howl.fm/audio/26160/live-from-toronto-2013\">Toronto 2013 (Howl)</a>\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.20</h3>\n        <p style=\"padding-bottom:40px;\">\n        <a href='#query/created_at:\"2016-01-20T11:51:29Z\"'>68 new </a> across two 2013 Washington D.C. episodes (<a href=\"http://howl.fm/audio/26161/live-in-washington-dc-2013-part-1\">pt.1</a> & <a href=\"http://howl.fm/audio/26162/live-from-washington-dc-2013-part-2\">pt.2</a>)\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.19 (b)</h3>\n        <p style=\"padding-bottom:40px;\">\n        <a href='#query/created_at:[2016-01-15T10:51:29Z TO 2016-01-19T10:51:29Z] NOT episode:395'>54 new </a> across these five <a href=\"http://howl.fm\">Howl</a> premium episodes:\n<ul>\n\n<li><a href=\"http://howl.fm/audio/26169/live-from-boston-2012\">Live from Boston 2012</a></li>\n<li><a href=\"http://howl.fm/audio/26164/live-from-san-francisco-2013\">Live from San Francisco 2013</a></li>\n<li><a href=\"http://howl.fm/audio/26165/live-from-montreal-2013-part-1\">Live from Montreal 2013, Pt. 1</a></li>\n<li><a href=\"http://howl.fm/audio/26165/live-from-montreal-2013-part-2\">Live from Montreal 2013, Pt. 2</a></li>\n<li><a href=\"http://howl.fm/audio/26163/live-from-vancouver-2013\">Live from Vancouver 2013</a></li>\n\n</ul>\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.19 (a)</h3>\n        <p style=\"padding-bottom:40px;\">\n        <a href='#query/episode:395'>11 new </a> from #395, <a href=\"http://www.earwolf.com/episode/yupparently/\">Yupparently</a>, featuring the inaugural appearance of new <a href='#query/bit:\"I Want that Pill\"'>bit:\"I Want that Pill\"</a> - some poor slob will have to reach back to the 2015 Best-Ofs for the rest at some point.\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.14</h3>\n        <p style=\"padding-bottom:40px;\">\n        <a href='#query/created_at:[2016-01-08T08:01:01Z TO 2016-01-14T23:51:29Z] NOT episode:394 NOT philadelphia'>39 new </a> across these six <a href=\"http://howl.fm\">Howl</a> premium episodes:\n<ul>\n<li><a href=\"http://howl.fm/audio/34627/live-from-nyc-2012-part-1\">Live from New York 2012, Pt. 1</a></li>\n<li><a href=\"http://howl.fm/audio/34628/live-from-nyc-2012-part-2\">Live from New York 2012, Pt. 2</a></li>\n<li><a href=\"http://howl.fm/audio/34626/live-from-minneapolis-2012\">Live from Minneapolis 2012</a></li>\n<li><a href=\"http://howl.fm/audio/34630/live-from-los-angeles-2012\">Live from Los Angeles 2012</a></li>\n<li><a href=\"http://howl.fm/audio/26170/live-from-chicago-2012-pt-1\">Live from Chicago 2012, Pt. 1</a></li>\n<li><a href=\"http://howl.fm/audio/26170/live-from-chicago-2012-pt-2\">Live from Chicago 2012, Pt. 2</a></li>\n</ul>\n        </p>\n\n        </div> <!-- /update -->\n\n        <!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2016.Jan.10</h3>\n        <p style=\"padding-bottom:40px;\">\n        <a href=\"#query/created_at:[2016-01-05T10:51:29Z TO 2016-01-09T10:51:29Z]\">110 new bits</a> across these six <a href=\"http://howl.fm\">Howl</a> premium episodes:\n<ul><li><a href=\"http://howl.fm/audio/34629/live-from-philadelphia-2012\">Live from Philadelphia 2012</a></li>\n<li><a href=\"http://howl.fm/audio/34631/live-from-portland-2012\">Live from Portland 2012</a></li>\n<li><a href=\"http://howl.fm/audio/34632/live-from-san-diego-2012\">Live from San Diego 2012</a></li>\n<li><a href=\"http://howl.fm/audio/34633/live-from-san-francisco-2012\">Live from San Francisco 2012</a></li>\n<li><a href=\"http://howl.fm/audio/34634/live-from-seattle-2012\">Live from Seattle 2012</a></li>\n<li><a href=\"http://howl.fm/audio/34635/live-from-vancouver-2012\">Live from Vancouver 2012</a></li></ul>\n        </p>\n        <p>Also, just fyi for you web nerds, the episode facet panel now uses episode numbers/IDs rather than their url slugs: Howl adds a serialized integer to the url structure, making them unecessarily ugly and slightly difficult - best to just punt and use episode #s and full Howl urls.</p>\n        </div> <!-- /update -->\n\n<!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2015.Dec.30</h3>\n        <p style=\"padding-bottom:40px;\">Today I'm pushing up 100 bits from 5 of the many, <a href=\"http://howl.fm/audio/playlists/4195/comedy-bang-bang-special-edition\">many CBB Special Edition episodes available to Howl subscribers</a>. Which of course are recommended, if not mandatory. Already there are stretches of the <a href=\"#query/%22cake boss%22\">Cake Boss</a>, <a href=\"#query/%22hot dog%22\">Hot Dog</a>, and <a href=\"#query/%22andrew lloyd webber%22\">DSALW</a> canon.</p>\n        </div> <!-- /update -->\n\n\n<!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2015.Dec.23</h3>\n        <p style=\"padding-bottom:40px;\">Like the gift that was baby Jesus, I've added a randomizer button to the search box. Press it for any one of the 1000+ locations we have as of this writing.</p>\n        </div> <!-- /update -->\n\n<!-- UPDATE! -->\n                <div class=\"pull-left col-sm-12\"><h3>2015.Dec.09</h3>\n        <p style=\"padding-bottom:40px;\">Some geniuses I know have advised me to make it more obvious that there's a very good way to reveal the map that underlies all the blue and yellow stuff. Or rather <em>toggle</em> it. The best way to do this is actually to toggle the Control (CTRL) key. Press it once to collapse all the text stuff, press it again to reveal again. But there's also a big button for this and as of today it's EVEN BIGGER, YO!</p>\n        </div> <!-- /update -->\n\n\n<!-- UPDATE! -->\n        <div class=\"pull-left col-sm-12\"><h3>2015.Nov.21</h3>\n        <p style=\"padding-bottom:40px;\">Yeah, somebody <em>updates</em> this thing. Despite the font of useful shit over at the <a href=\"http://comedybangbang.wikia.com\">ComedyBangBang Wikia instance</a>, I'm finding that they lag a little too far behind the episodes and I can't reliably assume I can pull episode titles from there for display here. Same thing for the future plan to integrate their guest data (so we can search for \"Andy Daly\" or \"Joe Wengert\" or whatever). So starting on 2015-11-21, I've decided to hard-code episode titles and guest/actor arrays into our own data store so we don't have to wait for the Wikia to update.*</p>\n          <p>*I know, I know - why don't <em>I</em> handle the Wikia stuff? Cuz I have <em>tons</em> of shit to do already. You would laugh (at me) if you knew how many man-hours went into this dumb thing.</p>\n          <p><img style=\"border:1px solid white; margin:15px;\" class=\"pull-right\" src=\"https://s3.amazonaws.com/f.cl.ly/items/2m0H3O3p1I040Z3l1827/BitMap__CBB.png\" alt=\"\" width=\"400px\" height=\"215px\" border=\"2\" />Anyway, starting on 2015-11-22 your query terms are also being thrown against episode titles and actor names. If you are advanced you can query against those fields specifically with, say, <code><a href=\"#query/episode_title:procreation\">episode_title:procreation</a></code> or <code><a href='#query/guests:\"Andy Daly\" AND guests:\"Paul F. Tompkins\"'>guests:\"Andy Daly\" AND guests:\"Paul F. Tompkins\"</a></code>. But there's nerdy nuance in there you probably don't wanna fuxk with, so just know that you can also just search for \"tompkins\" and be reasonably sure you're getting PFT's episodes (unless Huell F. Tompkins is referenced in a non-PFT episode, I guess).</p>\n          <p>The bigger implication, maybe, is that there shouldn't be any missing titles from recent episodes, á la when poking around <a href=\"http://goo.gl/34dn05\">Big Sue's Carpet Village</a>.</p>\n        </div> <!-- /update -->";
  },"useData":true});
})();