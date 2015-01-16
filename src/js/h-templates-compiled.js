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
templates['cartoPlainView'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<li data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"\">\n\n<div class=\"\">\n<span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-asterisk bt-getid\" title=\"echo model id (dev only)\"></span>\n"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.anno : depth0), depth0))
    + ")\n<span class=\"glyphicon glyphicon-share-alt bt-cartoobj bt-cartoobj-zoomto\" title=\"zoom to this\"></span>\n\n<span data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.cartodb_id : depth0), depth0))
    + "\" class=\"glyphicon glyphicon-headphones bt-cartoobj bt-cartoobj-episodes\" title=\"pull a list of associated episodes\"></span>\n\n\n\n\n</div>\n</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h1 class=\"stroke stroke-active\" style=\"margin-bottom:43px;\">Locations <span class=\"cbbanno\">("
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + ")</span></h1>\n\n";
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
  return buffer + "</a>, at ~"
    + escapeExpression(((helper = (helper = helpers.tstart || (depth0 != null ? depth0.tstart : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tstart","hash":{},"data":data}) : helper)))
    + " (#"
    + escapeExpression(((helper = (helper = helpers.episode || (depth0 != null ? depth0.episode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"episode","hash":{},"data":data}) : helper)))
    + ": <a href=\"http://earwolf.com/"
    + escapeExpression(((helper = (helper = helpers.slug_earwolf || (depth0 != null ? depth0.slug_earwolf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_earwolf","hash":{},"data":data}) : helper)))
    + "\">earwolf</a>, <a href=\"http://soundcloud.com/"
    + escapeExpression(((helper = (helper = helpers.slug_soundcloud || (depth0 != null ? depth0.slug_soundcloud : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"slug_soundcloud","hash":{},"data":data}) : helper)))
    + "\">soundcloud</a>)";
},"useData":true});
templates['hitMarkerViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div\"><h5>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5></div>\n<div><p class=\"text-muted\">"
    + escapeExpression(((helper = (helper = helpers.anno || (depth0 != null ? depth0.anno : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"anno","hash":{},"data":data}) : helper)))
    + "</p></div>\n\n<!-- <div class=\"bt marker\" id=\"marker-"
    + escapeExpression(((helper = (helper = helpers.cartodb_id || (depth0 != null ? depth0.cartodb_id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cartodb_id","hash":{},"data":data}) : helper)))
    + "><i class=\"glyphicon glyphicon-music\"></i> load episodes</div> -->";
},"useData":true});
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h1>What's this, now?</h1>\nIt's a map of all of the locations on earth referenced in all <em><a href=\"http://www.earwolf.com/show/comedy-bang-bang/\">Comedy Bang! Bang!</a></em> podcast episodes ever recorded. <em>Obviously</em>.</div>\n\n<div class=\"block\"><h1>Why?</h1>\n<p>Because...i dunno, why are <em>you</em> here? That's why. Or maybe fuck you, and <em>that's</em> why. Could be!</p>\n<p>Actually it's just cuz Comedy Bang! Bang! is the best thing ever recorded. Or maybe the best thing ever to even happen at all.<p>\n<p>If you really are confused, read more about it in the <a href=\"#method\">Full Story tab</a>.</p>\n </div>\n\n <div class=\"block\"><h1>Is this official?</h1>\n<p>It isn't.</p>\n </div>\n";
  },"useData":true});
templates['method'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"block\"><h4>What's Really Going On?</h4>\n    <p>Ok, so I literally sat and logged all the spatial references in (soon to be) all Comedy Bang! Bang! episodes, geocoded them, and wrote this web app around them. Professionaly I am a GIS Librarian, so it's not as lunatic as it sounds. Mostly my profession is to sit alone in a basement and type type type, make maps and whatnot. But listen listen listen also, and that's how I'm able to comb over each and every CBB episode (multiple times). This map is actually part of a much larger project in which I'm logging individual tropes and recurring bits (\"Please call me Garry,\" \"My Wife!\" \"Titular,\" etc. - see BitTracker, below) but that's taking longer and will require a much different web app to deliver. This thing I could kinda just knock off once everything was geocoded.<sup>*</sup></p><p>\n    <!-- And for real the reason to do it is that the universe of CBB's characters - when canon - is so rich and sprawling that I wanted it all in one place, where I could wade into it from multiple angles, aspects, and facets. e.g. I wanted be able to visualize... -->\n    So for now it's just a map of places that comprise the world of the CBB canon (and perhaps its diaspora). e.g...\n    </p><ul>\n        <li>the probable location of the <span class=\"loc-trigger\" data-string=\"cartodb_id:17\"><span class=\"loc-string\">Nordstrom that sold Danny Mahoney his heavy suicide coat</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span></li>\n        <li>how far away the <span class=\"loc-trigger\" data-string=\"cartodb_id:6\"><span class=\"loc-string\">Pasadena Fairytale Theatre</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> is from the <span class=\"loc-trigger\" data-string=\"cartodb_id:30\"><span class=\"loc-string\">Home Depot</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> where Bill Cosby bought sand and met Scott on the sidewalk</li>\n        <li>the <span class=\"loc-trigger\" data-string=\"cartodb_id:97\"><span class=\"loc-string\">Kentucky site</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> of Chupacabra and Cake Boss' joint vacation</li>\n        <li>basically <span class=\"loc-trigger\" data-string=\"huell\"><span class=\"loc-string\">anything related to Huell Howser</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span></li>\n    </ul>\n</div>\n<div class=\"block\"><h4>BitTracker?1</h4>\n    <p><a href=\"images/btracker_preview.png\"><img class=\"featurette-image img-responsive pull-right\" alt=\"bittracker peek\" src=\"images/btracker_preview.png\" style=\"margin:11px;\" height=\"200\" width=\"500\"></a>\nYeah, get this: this map app is actually the pilot application of a much larger project -- a bittracker. <strong>Yeah, a <em>BitTracker</em></strong>. A tracker of bits. How many times (and when!) <em>My wife!</em>; how many times (and when!) <em>Hee-hee. Shamone. Where's Lisa Marie? Dah! Where 'dem elephant bones? Where's Macaulay? Dah! Shamone. Hoo. Where my glove? Hoo.</em>; how many times (and when!) a classic <em>Would You Rather</em> blunder? That sort of thing. But it's taking a while.</p></div>\n<div class=\"block\"><h4>* So a Note on Scope</h4>\n<p>Included here are ~all locations that were <em>generated</em> during the show. Meaning I only wanted locations that were somehow parts of a bit or part of something intentionally funny <em>and</em> part of a contribution to the show. Meaning that if Toddy Barry plugs his gig at the Chuckle Hut or Kyle Kinane mentions that he lives in Los Feliz I'm not gonna bother. But I <em>do</em> wanna know where that coffee place was where Jason Mantzoukas witnessed a homeless person guzzle a discard, yes. And I would like to know all the lat/longs for where Tig Notaro ran into Taylor Dayne. None of these I could pin, btw. But I did bother to scrub episode 39 for all the places <span class=\"loc-trigger\" data-string=\"anno%3Ahuell+%2Banno%3Ahomes\"><span class=\"loc-string\">Huell Howser has homes</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span>. And I did bother to find as many of <span class=\"loc-trigger\" data-string=\"anno%3Ahuell+%2Banno%3Ahomes\"><span class=\"loc-string\">Shooter's L.A. references</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> as I could. And <span class=\"loc-trigger\" data-string=\"cartodb_id:13\"><span class=\"loc-string\">The Grove</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> and <span class=\"loc-trigger\" data-string=\"cartodb_id:96\"><span class=\"loc-string\">the Pantages</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> and <span class=\"loc-trigger\" data-string=\"cartodb_id:100\"><span class=\"loc-string\">Bob Ducca's beloved Castaic</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> and <span class=\"loc-trigger\" data-string=\"cartodb_id:7\"><span class=\"loc-string\">Six Flags Magic Mountain</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> (site of at least one Womptacular and the benefactor of a commercial spot by Sloppy Timmy Slotzman) are all here, of course.</p></div>\n<div class=\"block\"><h4>Is <em>Everything</em> Geocoded?</h4>\n<p>But no, not everything is in here. Yet. Once I realized I wanted to do this, I started re-listening from episode 1, logging locations instead of bits (which I'll pick back up later). I'm only through #143, so there will be plenty more added here in due time. I <em>may</em> add the ability for users to submit/edit locations, but that requires the addition of a whole other layer of app logic. The crowd-sourcing model will better suit the BitTracker anyway.</p></div>\n<div class=\"block\"><h4>How was it Built?</h4>\n    <p>I doubt you care, but you're sweet to ask. Imma list pretty much the entire workflow just cuzzi like it when people get specific about this kind of thing:</p>\n    <p>\n    <ul class=\"ul-expando\">\n        <li>listened to CBB episodes in the default podcast app in iOS 6-7-8\n            <div class='anno'>this is actually significant because the timestamps can differ between iOS playback and, say, SoundCloud copies</div>\n        </li>\n        <li>started logging bits/locations directly into a <a href=\"http://mongolab.com\">MongoLab</a> account, but eventually went offline into Notes.app on iOS <em>then</em> into MongoHub\n            <div class=\"anno\">Hey, you're right - that does sound like a ridiculous amount of pointless labor. And yet here we are.</div>\n        </li>\n        <li>for each master location, I manually researched it and placed a marker in a <a href=\"http://cartodb.com\">CartoDB</a> account\n            <div class=\"anno\">...\"Master\" location because I'm not going to store a <em>seperate</em> geometry for every mention of The <span class=\"loc-trigger\" data-string=\"cartodb_id:96\"><span class=\"loc-string\">Pantages Theatre</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span> or Huell Howser's favorite Taco Bell<span class=\"loc-trigger\" data-string=\"cartodb_id:45\"><span class=\"loc-string\" > (the one on Rosemead) </span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span>. The Grove gets one marker and the BitTracker will log any individual references to it. Standard database stuff. This is especially important in the case of, say, <span class=\"loc-trigger\" data-string=\"cartodb_id:26\"><span class=\"loc-string\">The Arclight cinema</span><i class=\"glyphicon glyphicon-map-marker cbb-marker-inline\"></i></span>, which is frequented by an almost surprising number of Hollywood's least palatable characters.</div>\n        </li>\n        <li>\n            Built up this web app, whose chief components are BackboneJS (+jQuery, +UnderscoreJS, +HandlebarsJS), Bootstrap, LessJS, etc. The usual. And for the mapping framework, the great Leaflet. Technically there's an API behind it (built w/ Kohana) but it's largely unused because...\n        </li>\n        <li>I started by pulling content directly out of CartoDB and (associated episodes/bits) from MongoLab. Possible because every bit in Mongo with a spatial reference stored a foreign key to the CartoDB record. The problem with that is CartoDB is only queryable with SQL, which I'm not willing to A) foist upon users and/or B) abstract at the client level. The solution was to stand up a Solr instance and index both the CartoDB content <em>and</em> the Mongo content with it. Right now, when you <a href=\"#query\">query</a> here, you're querying against the CartoDB records <em>only</em>. So you won't get full BitTracker results. Meaning you can't query for \"titular\" and expect to get back all of Scott's \"titular\" uses (like you'll get in the BitTracker). You can only search against the text that has been written into either the \"name\" or \"anno\" fields of the CartoDB records (lemme note here that if you don't specify a field and just type in keywords you're actually querying the name AND anno fields).\n        </li>\n        <li>\n            Sidebar? Pulling stuff into Solr from CartoDB (and MongoLab, for that matter) is pretty simple, really. Here are the three lines (that you could prolly pipe together if you were so inclined):\n\n\n            <code>\n            # pull (select) cartodb fields down as json\n            curl \"https://<YOUR CARTODB USERNAME>.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||%27,%27||ST_X%28the_geom%29%29%20as%20loc%20from%20cbb_point\" -o /tmp/pcdbraw.json;\n            # query out just the rows array for a clean send to Solr\n\n            # prolly there are things you can do at the Solr schema end to preclude this step, but it's easy enough\n\n\n            jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json\n            # send up to yr solr instance - don't forget the commit=true param\n\n            curl 'http://localhost/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'\n            </code>\n        </li>\n        <li>\n            Once the data are indexed in Solr, the rest is just all this dumb app logic/navigation/styling. Which isn't trivial - it represents the bulk of the work, but it's even more boring to write about than piping CartoDB into Solr.\n        </li>\n    </ul>\n    </p>\n</div>";
  },"useData":true});
templates['queryViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" id=\"query-form-input\" value=\""
    + escapeExpression(((helper = (helper = helpers.solrstring || (depth0 != null ? depth0.solrstring : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"solrstring","hash":{},"data":data}) : helper)))
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