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
templates['consoleViewTpl'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"text-muted\">\n  ";
  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
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