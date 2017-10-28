/* script for UW Center for Cooperatives, David J. Waro */

//initialize function called when the script loads
function initialize(){
    createMap();
};

// global map variable
var map;

/* function initializes the map object and assigns its setting (i.e. center, bounds, zoom, restrictions) and adds
a basemap tileset */
function createMap(){

  // map object
	map = L.map('mapdiv', {
		preferCanvas: true,
    spinjs: true,
    fullscreenControl: true,
		removeOutsideVisibleBounds: true,
		center: [39, -99],
		zoom: 4
	});

  // tileset, can easily be swapped out
	var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	   maxZoom: 18,
	   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map)

	// add navigation bar to the map
	L.control.navbar().addTo(map);

	getData(map);
};

// Function starts asynchronously loading data in the background, grabbing data from the geojson file
function getData(map) {
  
  // start spinner feedback while data is loading
  map.spin(true);
	
  //load the data
	$.ajax("data/coop_data_2017.geojson", {
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
	    if (attribute.indexOf("Name") != "adsfsa"){
	      attributes.push(attribute);
	    };

	  };

	  // return the array of attributes
	  return attributes;
};

// add markers for point features to the map
function createSymbols(data, map, attributes){
  // marker cluster group
	var marker_cluster = L.markerClusterGroup();

  // create a Leaflet GeoJSON layer and add it to the map
  var symbols = L.geoJson(data, {
    pointToLayer: function(feature, latlng, map){
      return pointToLayer(feature, latlng, attributes);
    }
  }).addTo(marker_cluster);

  // stop the spinner once the data is loaded
  setTimeout(function () {
    map.addLayer(marker_cluster);
    map.spin(false);
  }, 3000);

  // only load markers within the visible bounds
  marker_cluster._getExpandedVisibleBounds = function () {
    	return marker_cluster._map.getBounds();
	};

}; // close ot createSymbols

// function to create markers layer
function pointToLayer(feature, latlng, attributes, layer, map) {

  // marker styling
  var icon;
  if (feature.properties.Sector_Code >= 10 && feature.properties.Sector_Code < 20) {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'blue',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector_Code >= 20 && feature.properties.Sector_Code < 30) {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'red',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector_Code >= 30 && feature.properties.Sector_Code < 40) {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'orange',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector_Code >= 40 && feature.properties.Sector_Code < 50) {
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
  var layer = L.marker(latlng);
  layer.setIcon(icon);

  // creates a new popup object
  var popup = new Popup(feature.properties, layer, 5);

  // add popup to marker
  popup.bindToLayer();

  //event listeners to open popup on click
  layer.on({
    mouseover: function(){
      //this.openPopup();
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
  this.content = "<h5><b>" + this.properties.Name + "</h5></b>" +
    "<p>" + this.properties.Street_Address + "</p>" +
    "<p>" + this.properties.City + ", " + this.properties.State + " " + this.properties.Zip_Code + "</p>";

  // binds the popup to the marker and positions it on top center
  this.bindToLayer = function(){
    this.layer.bindPopup(this.content, {
      offset: new L.Point(0,-radius),
      closeButton: true
    });
  }; // close to bindToLayer
}; // close to Popup function

//call the initialize function when the document has loaded
$(document).ready(initialize);
