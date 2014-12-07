var Detail = Backbone.Model.extend({

	defaults:{

		title:'',
		description:'',
		thumb:'',
		envelopeUrl:'',
		coverageUrl:'',
		envelonoff:false,
		covonoff:false,
		prevonoff:false,
		preview: 'makeLeafletWMS'
	},

	url: function(){

		return solrRoot+"_id:"+this.id;
	},
	initialize:function(){


	},
	parse: function(data) {

// 		 ----------
// we're passed a root-level solr object
// and we basically just winnow into the docs array
// and pass the only one (there's only one, right?!)
// ------------ 
		return data.response.docs[0]
	},
	makeLeafletWMS: function(series,handle) {

		var style = ""; //blank style for most things
		var layers=series; //for most GWC layers, just the series name is the id
		var handle=handle; //for most GWC layers, just the series name is the id
		if(series == "envelopes" && handle == "cib01_staging"){
// for staging and indexes, we'll need a series:handle syntax
			style = "index";layers=series+":"+handle}

if(series == "cdrg"){
layers=series+":"+handle
}
		var gwc = L.tileLayer.wms(geowebCacheRoot, {
			layers: layers,
			format: 'image/png',
			styles: style,
			transparent: true,
			reuseTiles: true
		});
		gwc.on('loading', function() {
			appActivityView.render()
		});
		gwc.on('load', function() {
			appActivityView.reset()
			appConsoleView.render()
		});
		return gwc;
	},
	makeLeafletGeoJSON:function(){

			var gjsStyle = {
		"color": "#83541e",
		"weight": 2,
		"opacity": .8
	};

			var url = geoServerHost+this.get("series") +'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + this.get("series") + ':' + this.get("handle") + '&maxFeatures=80&outputFormat=json';
			var gjs = retrieveHitJson(url);

			if (gjs.features[0].geometry != undefined) {

				var type = gjs.features[0].geometry.type;
				
				if (type == "MultiPolygon" || type == "Polygon" || type == "MultiLineString" || type == "LineString") {
				var gjsLayer = L.geoJson(gjs,{style:gjsStyle});
					} else {
						var gjsLayer = L.geoJson(gjs,{style:gjsStyle});
					}

					return gjsLayer;

			} else {

				appConsole.set({
					message: "Hmph. Failure."
				});
}
	}
});
