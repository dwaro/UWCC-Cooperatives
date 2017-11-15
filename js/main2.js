/* script for UW Center for Cooperatives, David J. Waro */

//initialize function called when the script loads
function initialize(){
    createMap();
};

// global map variable
var map;
var options;

/* function initializes the map object and assigns its setting (i.e. center, bounds, zoom, restrictions) and adds
a basemap tileset */
function createMap(){

    // map object
    map = L.map('mapdiv', {
    renderer: L.canvas(),
    //spinjs: true,
    //zoomControl: false,
    boxZoom: true,
    fullscreenControl: true,
    removeOutsideVisibleBounds: true,
    center: [39, -99],
    zoom: 4
    });

  // tileset, can easily be swapped out
  var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 18,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  //var zoom_bar = new L.Control.ZoomBar({position: 'topleft'}).addTo(map);

  /// add navigation bar to the map
  L.control.navbar().addTo(map);
  
  // dragging will be enabled and you can 
  // // start selecting with Ctrl key pressed
  // map.zoom_bar.setCtrlKey(true); 

  // // box-zoom will be disabled and you can 
  // // start selecting with Shift key pressed
  // map.zoom_bar.setCtrlKey(true); 

  getData();
};

// Function starts asynchronously loading data in the background, grabbing data from the geojson file
function getData() {
  
  //load the data
  $.ajax("data/coop_data_2017.geojson", {
     dataType: "json",
     success: function(response){

        // attributes of the file, synonymous to column headers in python
        var attributes = processData(response);

        // call function to create markers
        createSymbols(response, attributes);

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
function createSymbols(data, attributes){

  // marker cluster group
  var marker_cluster = L.markerClusterGroup();

  // create a Leaflet GeoJSON layer and add it to the map
    var symbols = L.geoJson(data, {
      pointToLayer: function(feature, latlng){
          return pointToLayer(feature, latlng, attributes);
      }

    }).addTo(map);

    map.on('zoomend', function() {
      var currentZoom = map.getZoom();
      var weight = currentZoom*(1/5);

      var radius;

      if (currentZoom < 3) {
        radius = 0.03;
      } else if (currentZoom == 3) {
        radius = 0.1;
      } else if (currentZoom == 4) {
        radius = 0.5;
      } else if (currentZoom == 5) {
        radius = 1;
      } else if (currentZoom == 6) {
        radius = 2;
      } else if (currentZoom == 7) {
        radius = 3;
      } else if (currentZoom == 8) {
        radius = 4;
      } else if (currentZoom == 9) {
        radius = 5;
      } else {
        radius = 10;
      
      }

      symbols.setStyle({radius: radius, fillOpacity: 0.3, weight: weight});

    });

  // only load markers within the visible bounds
  marker_cluster._getExpandedVisibleBounds = function () {
      return marker_cluster._map.getBounds();
  };

}; // close to createSymbols



// function to create markers layer
function pointToLayer(feature, latlng, attributes, layer) {
  
  var color;
  if (feature.properties.Sector_Code >= 10 && feature.properties.Sector_Code < 20) {
    color = 'blue';
  } else if (feature.properties.Sector_Code >= 20 && feature.properties.Sector_Code < 30) {
    color = 'red';
  } else if (feature.properties.Sector_Code >= 30 && feature.properties.Sector_Code < 40) {
    color = 'gold';
  } else if (feature.properties.Sector_Code >= 40 && feature.properties.Sector_Code < 50) {
    color = 'green';
  } else {
    color = 'black';
  }

  // create marker options
  options = {
    fillColor: color,
    color: color,
    weight: 1,
    opacity: 1,
    radius: calcRadius(),
    fillOpacity: 0.7
  };

  // assign each marker to the layer
  var layer = L.circleMarker(latlng, options);
  //layer.setIcon(icon);

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

function calcRadius() {
  var currentZoom = map.getZoom();
  if (currentZoom < 4) {
    return 0.05;
  } else if (currentZoom == 4) {
    return 0.2;
  } else if (currentZoom == 5) {
    return 1.5;
  } else if (currentZoom == 6) {
    return 2;
  } else if (currentZoom == 7) {
    return 2.5;
  } else {
    return 5;
  }
};

// OOM Popup constructor function
function Popup(properties, layer, radius){

  // creating the Popup object
  this.properties = properties;
  this.layer = layer;
  // content in popup with html
  this.content = "<h5><b>" + this.properties.Name + "</h5></b>";

  if (this.properties.Street_Address != null) {
    this.content += "<p>" + this.properties.Street_Address + "</p>";
  }

  this.content += "<p>" + this.properties.City + ", " + this.properties.State + " " + this.properties.Zip_Code + "</p>";

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
