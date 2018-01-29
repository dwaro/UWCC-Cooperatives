/* script for UW Center for Cooperatives, David J. Waro */

//initialize function called when the script loads
function initialize(){
    createMap();
};

// global map variable
var map;

// all-cooperatives marker cluster group
var marker_cluster = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true
});

// marker-cluster groups for each sector
var marker_cluster1 = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'comIcon', bgpos: [0,0]});
  }
});
var marker_cluster2 = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: cluster.getChildCount(), className: 'finIcon', bgpos: [0,0]});
  }
});
var marker_cluster3 = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: cluster.getChildCount(), className: 'socIcon', bgpos: [0,0]});
  }
});
var marker_cluster4 = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: cluster.getChildCount(), className: 'utilIcon', bgpos: [0,0]});
  }
});
var marker_cluster5 = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true
});

/* function initializes the map object and assigns its setting (i.e. center, bounds, zoom, restrictions) and adds
a basemap tileset */
function createMap(){

  // map object
  map = L.map('mapdiv', {
    renderer: L.canvas(),
    spinjs: true,
    fullscreenControl: false,
    removeOutsideVisibleBounds: true,
    center: [50, -120],
    zoom: 3,
    maxZoom: 18,
    zoomControl: false
  });

  var roads = L.gridLayer.googleMutant({
    type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
  }).addTo(map);

  // tileset, can easily be swapped out
	var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	   maxZoom: 18,
	   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});//.addTo(map);

  var mapbox_satellite = L.tileLayer('https://api.mapbox.com/styles/v1/djwaro/cjbzbsfd2g1vx2sruqno7xwkb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGp3YXJvIiwiYSI6ImNpdXJwYnRidTAwOWgyeXJ2ZnJ6ZnVtb3AifQ.1ajSBLNXDrHg6M7PE_Py_A', {
    attribution: 'Mapbox Satellite Streets'
  });

  var baseMaps = {
    "Google Roads": roads,
    "Mapbox Satellite": mapbox_satellite
  };

	var csa_metro = new L.GeoJSON.AJAX("data/2016_csa_500k.geojson", {style: csaStyle});
  var non_metro = new L.GeoJSON.AJAX("data/Non_metro_500k.geojson", {style: non_metroStyle});

  // var exclusive = {
  //   "Metro Boundaries": {
  //     "CSA Metro": csa_metro,
  //     "Non Metro": non_metro
  //   }
  // };

  var overlayMaps = {
    "Cooperatives": {
      "All Cooperatives": marker_cluster,
      "Commercial": marker_cluster1,
      "Financial": marker_cluster2,
      "Social": marker_cluster3,
      "Utilities": marker_cluster4
    },
    "Metro Boundaries": {
      "CSA Metro": csa_metro,
      "Non Metro": non_metro
    }
  };

  // layers control
  L.control.groupedLayers(baseMaps, overlayMaps, {
    collapsed:false
  }).addTo(map);

  //add zoom control with your options
  L.control.zoom({
     position:'topleft'
  }).addTo(map);

  // add navigation bar to the map
  L.control.navbar().addTo(map);

	getData(map);
};

// Function starts asynchronously loading data in the background, grabbing data from the geojson file
function getData(map) {
  
  // start spinner feedback while data is loading
  map.spin(true);

  // data file
  var data = "data/2015_1_2_18.geojson";
	
  //load the data
	$.ajax(data, {
	   dataType: "json",
	   success: function(response){

	      // attributes of the file, synonymous to column headers in python
	      var attributes = processData(response);

	      // call function to create markers
	      createSymbols(response, map, attributes);
        
	    } // close to success
	  }); // close to ajax
};

// function reads json data and assigns respective attributes and properties for the features
function processData(data){

	  // empty array to hold attributes
	  var attributes = [];

	  // properties of the first feature in the dataset
	  var properties = data.features[0].properties;

	  // push each attribute name into attributes array
	  for (var attribute in properties){

	    // condition to make sure attributes are pushed
	    if (attribute.indexOf("Company") != "adsfsa"){
	      attributes.push(attribute);
	    };

	  };

	  // return the array of attributes
	  return attributes;
};

// add markers for point features to the map
function createSymbols(data, map, attributes){

  // create a Leaflet GeoJSON layer and add it to the map
  var symbols = L.geoJson(data, {
    pointToLayer: function(feature, latlng, map){
      return pointToLayer(feature, latlng, attributes);
    }
    // onEachFeature: function (feature, layer) {
    //     feature.layer = layer;
    // }
  }).addTo(marker_cluster);

  var option = {
    keys: ['properties.Search_Add'],
    shouldSort: true,
    threshold: 0.05,
    tokenize: true,
    matchAllTokens: true
  };

  var fuse = new Fuse(data.features, option);

  L.control.search({
    layer: marker_cluster,
    propertyName: 'Search_Add',
    circleLocation: false,
    marker: false,
    moveToLocation: function (latlng, title, map) {
      // set the view once searched to the circle marker's latlng and zoom
      map.setView(latlng, 17);
    }, // close to moveToLocation
    filterData: function(text, records) {
      var jsons = fuse.search(text),
        ret = {}, key;
      
      for(var i in jsons) {
        key = jsons[i].properties.Search_Add;
        ret[ key ]= records[key];
      }

      //console.log(jsons,ret);
      return ret;
    }
  }).on('search:locationfound', function(e) {
    //e.layer.openPopup();
  }).addTo(map);

  // stop the spinner once the data is loaded
  setTimeout(function () {
    map.addLayer(marker_cluster);
    map.spin(false);
  }, 3000);

  // only load markers within the visible bounds
  marker_cluster._getExpandedVisibleBounds = function () {
      return marker_cluster._map.getBounds();
  };

  // var searchControl = new L.Control.Search({
  //   layer: marker_cluster, 
  //   propertyName: 'Search_Add',
  //   circleLocation: false,
  //   marker: false,
  //   moveToLocation: function (latlng, title, map) {
  //     // set the view once searched to the circle marker's latlng and zoom
  //     map.setView(latlng, 17);
  //   } // close to moveToLocation
  // });

  // map.addControl(searchControl);  //inizialize search control

  //add zoom control with your options
  L.control.fullscreen({
     position:'topleft'
  }).addTo(map);

}; // close to createSymbols

// function to create markers layer
function pointToLayer(feature, latlng, attributes, layer, map) {

  // marker styling
  var icon;
  if (feature.properties.Sector == 'Commercial Sales & Marketing') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'blue',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector == 'Financial') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'red',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector == 'Social and Public Services') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'orange',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector == 'Utilities') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'green',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'black',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  };

  // assign each marker to the layer
  var layer = L.marker(latlng, {title: name});
  layer.setIcon(icon);

  if (feature.properties.Sector == 'Commercial Sales & Marketing') {
    marker_cluster1.addLayer(layer);
  } else if (feature.properties.Sector == 'Financial') {
    marker_cluster2.addLayer(layer);
  } else if (feature.properties.Sector == 'Social and Public Services') {
    marker_cluster3.addLayer(layer);
  } else if (feature.properties.Sector == 'Utilities') {
    marker_cluster4.addLayer(layer);
  } else {
    marker_cluster5.addLayer(layer);
  }; 
 
  // creates a new popup object
  var popup = new Popup(feature.properties, layer, 5);

  // add popup to marker
  popup.bindToLayer();

  //event listeners to open popup on click
  layer.on({
    mouseover: function(){
      //this.openPopup();
      console.log(feature.layer);
    },
    mouseout: function(){
      //this.closePopup();
    },
    click: function(){
      this.openPopup();
    }
  });

  // return the circle marker to the L.geoJson pointToLayer option
  return layer;

}; // close to pointToLayer function

// OOM Popup constructor function
function Popup(properties, layer, radius){

  // creating the Popup object
  this.properties = properties;
  this.layer = layer;
  // content in popup with html
  this.content = "<h5 class='text-center'><b>" + this.properties.Company + "</h5></b>";
  var address = this.properties.Search_Add.split(",")[1];
      address += ", " + this.properties.Search_Add.split(",")[2];
      address += ", " + this.properties.Search_Add.split(",")[3];
  this.content += "<p><b>Address:</b> " + address + "<br>";
  this.content += "<b>Employee Size:</b> " + this.properties.Emp_Size + "</br>";

  if (this.properties.Sales_Vol == 'Unknown') {
    this.content += "<b>Sales Volume:</b> " + this.properties.Sales_Vol + "</p>";
  } else {
    this.content += "<b>Sales Volume:</b> $" + this.properties.Sales_Vol + "</p>";
  };

  // binds the popup to the marker and positions it on top center
  this.bindToLayer = function(){
    this.layer.bindPopup(this.content, {
      offset: new L.Point(0,-radius),
      closeButton: true
    });
  }; // close to bindToLayer
}; // close to Popup function

// styling for csa metro region
function csaStyle() {
	return {
		fillColor: 'gray',
		weight: 0.5,
		opacity: 0.9,
		color: 'black',
		fillOpacity: 0.45
	};
};

// styling for non-metro counties
function non_metroStyle() {
  return {
    fillColor: 'blue',
    weight: 0.5,
    opacity: 0.9,
    color: 'black',
    fillOpacity: 0.45
  };
};

//call the initialize function when the document has loaded
$(document).ready(initialize);