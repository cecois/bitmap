var Hit = Backbone.Model.extend({
	defaults: {
		title: '',
		description: '',
		thumb: '',
		envelopeUrl: '',
		coverageUrl: '',
		envelonoff: false,
		covonoff: false,
		prevonoff: false,
		preview: 'makeLeafletWMS'
	},
	url: function() {
		return solrRoot + "_id:" + this.id;
	},
	initialize: function() {


		var series = this.get("series");
		var format = this.get("format");
		var handle = this.get("handle");
		var tags = this.get("tags");
		switch (format) {
		case "raster":
			if(series=="cdrg"){
				// cdrg is messy bc it's a big "series" comprised of a bunch of actually specific, thematic series
						this.set({
							"envelopeUrl": "../api/v1/rasterenvelopes/" + handle + "/all/geojson/aggregate"
						});} else {
						
									this.set({
										"envelopeUrl": "../api/v1/rasterenvelopes/" + handle + "/all/geojson/aggregate"
									});}

			this.set({
				"coverageUrl": "../api/v1/rasterenvelopes/" + series + "/all/geojson/individual"
			});
			this.set({
				"thumb": "images/thumbs/" + series + "-" + handle + ".jpg"
			});
			break
		case "vector":
			this.set({
				"envelopeUrl": "../api/v1/vectorenvelopes/" + series + "/" + handle + "/geojson"
			});
			var ppl = _.intersection(["points", "polygons", "polylines"], tags);
			this.set({
				"thumb": "images/thumbs/" + ppl + ".jpg"
			});
			break;
		}




		return this
	},
	
	makeLeafletWMS: function(series,handle,bbox) {

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
			appActivityView.stfu()
			appConsoleView.render()
		});
		return gwc;
	},

	makeLeafletGeoJSON: function(bbox) {
		// var gjsStyle = {
		// 	"color": "#83541e",
		// 	"weight": 2,
		// 	"opacity": .8
		// };
		var gjsStyle = randomStyle();
		if(typeof bbox != 'undefined'){

				var url = geoServerHost + this.get("series") + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + this.get("series") + ':' + this.get("handle") + '&bbox='+bbox+'&maxFeatures='+vectorLimit+'&outputFormat=json';
		} else {
				var url = geoServerHost + this.get("series") + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + this.get("series") + ':' + this.get("handle") + '&maxFeatures='+vectorLimit+'&outputFormat=json';}

		var gjs = retrieveHitJson(url);
		if (gjs.features[0].geometry != undefined) {
			var type = gjs.features[0].geometry.type;
			if (type == "MultiPolygon" || type == "Polygon" || type == "MultiLineString" || type == "LineString") {
				var gjsLayer = L.geoJson(gjs, {
					style: gjsStyle,
					onEachFeature: function (feature, layer) {

							var puptable = generatePopup(feature);
						layer.bindPopup(puptable);}
				});
			} else {
				var gjsLayer = L.geoJson(gjs, {
					style: gjsStyle,
					onEachFeature: function (feature, layer) {
							var puptable = generatePopup(feature);
						layer.bindPopup(puptable);}
				});
			}
			return gjsLayer;
		} else {
			appConsole.set({
				message: "Hmph. Failure."
			});
		}
	}
});