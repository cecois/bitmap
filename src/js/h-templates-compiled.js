(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['activityViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<span class=\"text-muted\">\n  ";
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
templates['cartoPlainView'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "       <li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\""
    + escapeExpression(lambda((depth0 != null ? depth0.active : depth0), depth0))
    + "\">\n       <div class=\"\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")\n       <span class=\"glyphicon glyphicon-share-alt bt-cartoobj bt-cartoobj-zoomto text-muted\" title=\"zoom to this\"></span>\n\n       <span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes text-muted\" title=\"pull a list of associated episodes\"></span>\n       </div>\n       </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "       <h5>Locations</h5>\n";
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
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.title : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " (#"
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + ")</a>";
},"useData":true});
templates['hitMarkerViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div\"><h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5></div>\n<div><p class=\"text-muted\">"
    + escapeExpression(((helper = (helper = helpers.anno || (depth0 != null ? depth0.anno : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"anno","hash":{},"data":data}) : helper)))
    + "</p></div>\n\n<div class=\"bt marker\" id=\"marker-"
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "><i class=\"glyphicon glyphicon-music\"></i> load episodes</div>";
},"useData":true});
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Huh?</h2>\n\n<div class=\"block\"><h4>What's this, now?</h4>\n<p>It's a map of all of the locations on earth referenced in all <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> podcast episodes ever recorded. Duh.</p></div>\n\n<div class=\"block\"><h4>But...why?</h4>\n<p>Because...i dunno, why are <em>you</em> here? That's why. Or wait -- fuck you. Maybe that's why.</p>\n<p>No no, ok. I apologize. It's actually because Comedy Bang! Bang! is the best thing ever recorded. Or maybe the best thing ever to even happen at all. And more specifically still, the universe of its characters -- when canon -- is so rich and sprawling that I wanted it all in one place, where I could wade into it from multiple angles, aspects, and facets. e.g. I wanted be able to visualize... \n</p><ul>\n<li>the probable location of the Nordstrom that sold Danny Mahoney his suicide coat</li>\n<li>how far away the Pasadena Fairytale Theatre is from the Home Depot where Bill Cosby bought sand and met Scott on the sidewalk</li>\n<li>the Kentucky site of Chupacabra and Cake Boss' joint vacation</li>\n<li>basically anything related to Huell Howser</li>\n</ul><p></p>\n </div>\n\n<div class=\"block\"><h4>Ok, but...</h4>\n<p><img class=\"featurette-image img-responsive pull-right\" alt=\"bittracker peek\" src=\"images/btracker_preview.png\" style=\"margin:11px;\" height=\"200\" width=\"500\">\nWell, get this. This is actually the pilot application of a much larger project. Not only am I geocoding named locations<sup>*</sup>, my longer-term project is to create a bittracker. Yeah, a <em>BitTracker</em>. A tracker of bits. How many times (and when!) <em>My wife!</em> How many times (and when!) <em>Hee-hee. Shamone. Where's Lisa Marie? Dah! Where 'dem elephant bones? Where's Macaulay? Dah! Shamone. Hoo. Where my glove? Hoo.</em>. How many times (and when!) has a defenestration occurred or been referenced? Much of these data exist already but the whole web app has to be forthcoming.</p></div>\n\n<div class=\"block\"><h4>* A Note About Scope</h4>\n<p>Included here are all (?) locations that were \"generated\" during the show. Meaning I only wanted locations that were somehow parts of a bit or part of something intentionally funny <em>and</em> part of a contribution to the show. Meaning that if Toddy Barry plugs his gig at the Chuckle Hut or Kyle Kinane mentions that he lives in Los Feliz I'm not gonna bother. But I <em>do</em> wanna know where that coffee place was where Mantzoukas witnessed a homeless person guzzle a discard, yes. And I would like to know where Tig ran into Taylor Dayne. And I did bother to scrub episode 39 for all the places Huell Howser has homes. And I did bother to map as many of Shooter's L.A. references as I could. And The Grove and the Pantages and Marina Del Rey and Six Flags Magic Mountain (site of at least one Womptacular and the benefactor of a commercial spot by Sloppy Timmy Slotzman) are all here, of course.</p></div>";
  },"useData":true});
templates['method'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h4>What's Really Going On?</h4>\n<p>No, for real. I literally sat and logged all the spatial references in (soon to be) all Comedy Bang! Bang! episodes, geocoded them, and wrote this web app around them. Professionaly I am a GIS Librarian, which is a job that, in my case anyway, has become almost explicitly a spatial web developer position. There are other systems involved but mostly my profession is to sit alone in a basement and type type type. But listen listen listen also, and that's how I'm able to comb over each and every CBB episode (multiple times). You already know that this map is part of a much much larger \"BitTracker\" project, in which I'm logging individual tropes and recurring bits (\"Please call me Garry,\" \"My Wife!\" \"Titular,\" etc.) But that's taking longer and will require a much different web app to deliver. This thing I could kinda just knock off once everything was geocoded.</p></div>\n<div class=\"block\"><h4>*Is* Everything Geocoded?</h4>\n<p>No, actually. Once I realized I wanted to do this, I started re-listening from episode 1, logging locations instead of bits (which I'll pick back up later). I'm only through #143, so there will be plenty more added here in due time. I <em>may</em> add the ability for users to submit locations, but that requires the addition of a whole other layer of app logic. The crowd-sourcing model will better-suit the BitTracker anyway.</p></div>\n<div class=\"block\"><h4>How was it Built?</h4>\n    <p>I doubt you care, but you're sweet to ask. Imma list pretty much the entire workflow just cuzzi like it when people get kinda specific about this kind of thing:</p>\n    <p>\n    <ul class=\"\">\n        <li>listened to CBB eps in the default podcast app in iOS 6-7-8\n            <div class='anno'>this is actually significant because the timestamps can differ between iOS playback and, say, SoundCloud copies</div>\n        </li>\n        <li>started logging bits/locations directly into a MongoHub account, but eventually went offline into Notes.app on iOS <em>then</em> into MongoHub\n            <div class=\"anno\">Hey, you're right - that does sound like a ridiculous amount of pointless labor. And yet? Here we are.</div>\n        </li>\n        <li>for each master location, I manually placed a marker in a <a href=\"http://cartodb.com\">CartoDB</a> account\n        <div class=\"anno\">...Where \"master\" location means I'm not going to store a <em>seperate</em> geometry for every mention of <span class=\"trigger-loc\" cartodb_id=\"\">The Pantages <i class=\"glyphicon glyphicon-map-marker\"></i></span> or <span class=\"trigger-loc\" cartodb_id=\"45\">Huell Howser's favorite Taco Bell (the one on Rosemead) <i class=\"glyphicon glyphicon-map-marker\"></i></span>. The Grove gets one marker and the BitTracker will log any individual references to it. Standard database stuff. This is especially important in the case of, say, The Arclight cinema, which is frequented by an almost surprising number of Andy Daly characters.</div>\n    </li>\n\n    </ul>\n    </p>\n</div>";
  },"useData":true});
templates['queryViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" id=\"query-form-input\" value=\""
    + escapeExpression(((helper = (helper = helpers.solrstring || (depth0 != null ? depth0.solrstring : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"solrstring","hash":{},"data":data}) : helper)))
    + "\">\n      <span class=\"input-group-btn\">\n        <button id=\"query-form-bt\" class=\"btn btn-default\" type=\"button\" placeholder=\"search the source for new results\">Search</button>\n      </span>\n    </div><!-- /input-group -->";
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