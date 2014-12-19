(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['baseLayerMnuItem'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\"#\" class=\"mnuThumbnail "
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.nom || (depth0 != null ? depth0.nom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nom","hash":{},"data":data}) : helper)))
    + "\">\n      <img src=\""
    + escapeExpression(((helper = (helper = helpers.thumb || (depth0 != null ? depth0.thumb : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumb","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"55px\" height=\"55px\" />\n    </a>";
},"useData":true});
templates['cartoPlainView'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "       <li>\n       <div class=\"text-muted\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")\n\n       <span class=\"glyphicon glyphicon-arrow-right bt-cartoobj bt-cartoobj-zoomto text-muted\" title=\"zoom to this\"></span>\n       <span class=\"glyphicon glyphicon-screenshot bt-cartoobj bt-cartoobj-episodes text-muted\" title=\"pull a list of associated episodes\"></span>\n       </div>\n       </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.rows : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "     ";
},"useData":true});
templates['consoleViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"text-muted\">\n  ";
  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});
templates['hitMarkerViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div><h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5></div>\n<div><p class=\"text-muted\">"
    + escapeExpression(((helper = (helper = helpers.anno || (depth0 != null ? depth0.anno : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"anno","hash":{},"data":data}) : helper)))
    + "</p></div>\n\n<div><i class=\"glyphicon glyphicon-music\"></i> load episodes</div>";
},"useData":true});
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Huh?</h2>\n\n<div class=\"block\"><h4>What's the meaning of this?</h4>\n<p>It's a map of all of the locations on earth referenced in all <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> podcast episodes ever recorded as geocoded by me, Chris. Duh.</p></div>\n\n<div class=\"block\"><h4>But...why?</h4>\n<p>Because...i dunno, why are <em>you</em> here? That's why. Or wait -- fuck you. <em>That's</em> why.</p>\n<p>No no, ok. I apologize. It's actually because Comedy Bang! Bang! is the best thing ever recorded. Or maybe the best thing ever to even happen at all. And more specifically still, the universe of its characters -- when canon -- is so rich and sprawling that I wanted it all in one place, where I could wade into it from multiple angles, aspects, and facets. e.g. I wanted be able to see these kinds of things: \n<ul>\n<li>the probable location of the Nordstrom that sold Danny Mahoney his suicide coat</li>\n<li>how far away the Pasadena Fairytale Theatre is from the Home Depot where Bill Cosby bought sand and met Scott on the sidewalk</li>\n<li>the Kentucky site of Chupacabra and Cake Boss' joint vacation</li>\n<li>basically anything related to Huell Howser</li>\n</ul></p>\n <p>Even shit I don't care about I wanted in one place. Such as...\n <ul>\n <li>Louden Wainright III's former address</li>\n<li>Todd Wickey's roller blade repair guy</li>\n </ul></p></div>\n\n<div class=\"block\"><h4>Ok, but...</h4>\n<p><img class=\"featurette-image img-responsive pull-right\" alt=\"bittracker peek\" src=\"images/btracker_preview.png\" width=500 height=200 style=\"margin:11px;\" />\nWell, get this. This is actually the pilot application of a much larger project. Not only am I geocoding named locations<sup>*</sup>, my longer-term project is to create a bittracker. Yeah, a <em>BitTracker</em>. A tracker of bits. How many times (and when!) My wife! How many times (and when!) has a Michael Jackson quote appeared in <em>Who Said It?</em>. How many times (and when!) has a defenestration occurred or been referenced? Much of these data exist, folks. But it looks like this right now and has to be worked on. Gimme time, jeez. I have a job, for fuck's sake.\n</p></div>\n\n<div class=\"block\"><h4>* A Note About Scope</h4>\n<p>Included here are all (?) locations that were \"generated\" during the show. Meaning I only wanted locations that were somehow parts of a bit or part of something intentionally funny <em>and</em> part of a contribution to the show. Meaning that if Toddy Barry plugs his gig at the Chuckle Hut or Kyle Kinane mentions that he lives in Los Feliz I'm not gonna bother. But I <em>do</em> wanna know where that coffee place was where Mantzoukas witnessed a homeless person guzzle a discard, yes. And I would like to know where Tig ran into Taylor Dayne. And I did bother to scrub episode 39 for all the places Huell Howser has homes. And I did bother to map as many of Shooter's L.A. references as I could. And The Grove and the Pantages and Marina Del Rey and Six Flags Magic Mountain (site of at least one Womptacular and the benefactor of a commercial spot by Sloppy Timmy Slotzman) are all here, of course.</p></div>";
  },"useData":true});
templates['recentItemViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\"#\" class=\"mnuThumbnail "
    + escapeExpression(((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"active","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "    </a>";
},"useData":true});
})();