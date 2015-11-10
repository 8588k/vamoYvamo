this["__templates"] = this["__templates"] || {};
this["__templates"]["vamo"] = this["__templates"]["vamo"] || {};
this["__templates"]["vamo"]["actions"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<label for=\"personNumber\">Personas:</label><input type=\"number\" value=\"2\" min=\"0\" max=\"99\" id=\"personNumber\" class=\"person-number\" pattern=\"[0-9]{10}\">\n<input type=\"button\" value=\"+\" class=\"add\">\n<input type=\"button\" value=\"-\" class=\"remove\">";
},"useData":true});
this["__templates"]["vamo"]["header"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "Vamo & Vamo\n\n<a class='dropdown-button material-icons right' href='#' data-activates='dropdown'>more_vert</a>\n\n<ul id='dropdown' class='dropdown-content'>\n	<li>\n		<a href=\"#\" data-js=\"share\">Compartir</a>\n	</li>\n	<li class=\"divider\"></li>\n	<li>\n		<a href=\"#\" data-js=\"reset\">Borrar</a>\n	</li>\n</ul>";
},"useData":true});
this["__templates"]["vamo"]["main"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<header data-js=\"header\">Header</header>\n<div data-js=\"actions\">Actions</div>\n<div data-js=\"rows\">Rows</div>\n<div class=\"total-price\" data-js=\"total\">Total</div>";
},"useData":true});
this["__templates"]["vamo"]["person"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "value=\""
    + this.escapeExpression(((helper = (helper = helpers.money || (depth0 != null ? depth0.money : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"money","hash":{},"data":data}) : helper)))
    + "\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<input type=\"text\" maxlength=\"20\" placeholder=\""
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" >\n<span class=\"person-price\">\n	$ <input type=\"number\" placeholder=\"0\" "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.money : depth0),0,{"name":"compare","hash":{"operator":"!="},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " min=\"0\" max=\"999999\" pattern=\"[0-9]{10}\">\n</span>\n<span class=\"status\"></span>\n<span class=\"icon-remove\"></span>";
},"useData":true});
this["__templates"]["vamo"]["total"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<p>Precio total: $ <span>0</span></p>";
},"useData":true});