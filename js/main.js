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

var ag_farmSupply = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'comIcon', bgpos: [0,0]});
  }
});
var grocery = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'comIcon', bgpos: [0,0]});
  }
});
var other_sales = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'comIcon', bgpos: [0,0]});
  }
});
var transport = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'comIcon', bgpos: [0,0]});
  }
});
var credit_union = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'finIcon', bgpos: [0,0]});
  }
});
var farm_credit = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'finIcon', bgpos: [0,0]});
  }
});
var mutual_insurance = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'finIcon', bgpos: [0,0]});
  }
});
var other_financial = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'finIcon', bgpos: [0,0]});
  }
});
var cooperative_finance = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'finIcon', bgpos: [0,0]});
  }
});
var healthcare = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'socIcon', bgpos: [0,0]});
  }
});
var childcare = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'socIcon', bgpos: [0,0]});
  }
});
var education = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'socIcon', bgpos: [0,0]});
  }
});
var other_social = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'socIcon', bgpos: [0,0]});
  }
});
var rural_electric = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'utilIcon', bgpos: [0,0]});
  }
});
var telecom = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'utilIcon', bgpos: [0,0]});
  }
});
var water = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'utilIcon', bgpos: [0,0]});
  }
});
var other_utilities = L.markerClusterGroup({
  showCoverageOnHover: false,
  removeOutsideVisibleBounds: true,
  chunkedLoading: true,
  iconCreateFunction: function(cluster) {
    return L.divIcon({html: cluster.getChildCount(), className: 'utilIcon', bgpos: [0,0]});
  }
});



var csa_metro = new L.GeoJSON.AJAX("data/2016_csa_500k.geojson", {style: csaStyle});
var non_metro = new L.GeoJSON.AJAX("data/Non_metro_500k.geojson", {style: non_metroStyle});


/* function initializes the map object and assigns its setting (i.e. center, bounds, zoom, restrictions) and adds
a basemap tileset */
function createMap(){

  // map object
  map = L.map('mapdiv', {
    renderer: L.canvas(),
    spinjs: true,
    fullscreenControl: false,
    removeOutsideVisibleBounds: true,
    center: [50, -115],
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

  var satellite = L.gridLayer.googleMutant({
    type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
  });

  var baseMaps = {
    "Google Roads": roads,
    "Google Satellite": satellite
  };

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
      "Non-metro": non_metro
    }
  };

  // custom layers control handling basemap radio buttons
  $('input[name=basemap]:radio').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'satellite') {
      satellite.addTo(map);
      map.removeLayer(roads);
    } else {
      roads.addTo(map);
      map.removeLayer(satellite);
    };
  });

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
  var data = "data/1_30_data.geojson";
	
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
  }).addTo(marker_cluster);

  var option = {
    keys: ['properties.Search_Add'],
    shouldSort: true,
    threshold: 0.02,
    tokenize: true,
    matchAllTokens: true,
    minMatchCharLength: 7
  };

  var fuse = new Fuse(data.features, option);

  var searchControl = L.control.search({
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
  //   }// close to moveToLocation
  // });

  // map.addControl(searchControl);  //inizialize search control

  //add zoom control with your options
  // L.control.fullscreen({
  //    position:'topleft'
  // }).addTo(map);

}; // close to createSymbols

// function to create markers layer
function pointToLayer(feature, latlng, attributes, layer, map) {

  // marker styling
  var icon;
  if (feature.properties.Sector == 'Agriculture & Farm Supply' || 
    feature.properties.Sector == 'Grocery' || feature.properties.Sector == 'Other Sales, Services & Production' 
    || feature.properties.Sector == 'Transport') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'blue',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector == 'Credit Union' || feature.properties.Sector == 'Farm Credit' 
    || feature.properties.Sector == 'Mutual Insurance' || feature.properties.Sector == 'Other Financial Services' 
    || feature.properties.Sector == 'Cooperative Finance') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'red',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector == 'Healthcare' || feature.properties.Sector == 'Childcare' 
    || feature.properties.Sector == 'Education' || feature.properties.Sector == 'Other Social Services') {
    icon = L.AwesomeMarkers.icon({
        icon: 'ok-sign',
        iconColor: 'white',
        markerColor: 'orange',
        prefix: 'glyphicon',
        extraClasses: 'fa-rotate-0'
    });
  } else if (feature.properties.Sector == 'Rural Electric' || feature.properties.Sector == 'Telecom' 
    || feature.properties.Sector == 'Water' || feature.properties.Sector == 'Other Utilities') {
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

  if (feature.properties.Sector == 'Agriculture & Farm Supply' || 
    feature.properties.Sector == 'Grocery' || feature.properties.Sector == 'Other Sales, Services & Production' 
    || feature.properties.Sector == 'Transport') {
    marker_cluster1.addLayer(layer);
    if (feature.properties.Sector =='Agriculture & Farm Supply') {
      ag_farmSupply.addLayer(layer);
    };
    if (feature.properties.Sector =='Grocery') {
      grocery.addLayer(layer);
    };
    if (feature.properties.Sector =='Other Sales, Services & Production') {
      other_sales.addLayer(layer);
    };
    if (feature.properties.Sector =='Transport') {
      transport.addLayer(layer);
    };
  } else if (feature.properties.Sector == 'Credit Union' || feature.properties.Sector == 'Farm Credit' 
    || feature.properties.Sector == 'Mutual Insurance' || feature.properties.Sector == 'Other Financial Services' 
    || feature.properties.Sector == 'Cooperative Finance') {
    marker_cluster2.addLayer(layer);
    if (feature.properties.Sector =='Credit Union') {
      credit_union.addLayer(layer);
    };
    if (feature.properties.Sector =='Farm Credit') {
      farm_credit.addLayer(layer);
    };
    if (feature.properties.Sector =='Mutual Insurance') {
      mutual_insurance.addLayer(layer);
    };
    if (feature.properties.Sector =='Other Financial Services') {
      other_financial.addLayer(layer);
    };
    if (feature.properties.Sector =='Cooperative Finance') {
      cooperative_finance.addLayer(layer);
    };
  } else if (feature.properties.Sector == 'Healthcare' || feature.properties.Sector == 'Childcare' 
    || feature.properties.Sector == 'Education' || feature.properties.Sector == 'Other Social Services') {
    marker_cluster3.addLayer(layer);
    if (feature.properties.Sector =='Healthcare') {
      healthcare.addLayer(layer);
    };
    if (feature.properties.Sector =='Childcare') {
      childcare.addLayer(layer);
    };
    if (feature.properties.Sector =='Education') {
      education.addLayer(layer);
    };
    if (feature.properties.Sector =='Other Social Services') {
      other_social.addLayer(layer);
    };
  } else if (feature.properties.Sector == 'Rural Electric' || feature.properties.Sector == 'Telecom' 
    || feature.properties.Sector == 'Water' || feature.properties.Sector == 'Other Utilities') {
    marker_cluster4.addLayer(layer);
    if (feature.properties.Sector =='Rural Electric') {
      rural_electric.addLayer(layer);
    };
    if (feature.properties.Sector =='Telecom') {
      telecom.addLayer(layer);
    };
    if (feature.properties.Sector =='Water') {
      water.addLayer(layer);
    };
    if (feature.properties.Sector =='Other Utilities') {
      other_utilities.addLayer(layer);
    };
  } else {
    marker_cluster5.addLayer(layer);
  }; 
 
  // creates a new popup object
  var popup = new Popup(feature.properties, layer, 5);

  // add popup to marker
  popup.bindToLayer();

  $("#info1").on({
    mouseover: function(){
      $("#info1_text").css("display", "inline-block");
    },
    mouseout: function(){
      $("#info1_text").css("display", "none");
    }
  });

  $("#info2").on({
    mouseover: function(){
      $("#info2_text").css("display", "inline-block");
    },
    mouseout: function(){
      $("#info2_text").css("display", "none");
    }
  });

  // custom layers control handling basemap radio buttons
  // $('input[name=basemap]:radio').on('click change', function(e) {
  //   var a;
  //   a = $(this).val();
  //   if (a == 'mapbox_satellite') {
  //     mapbox_satellite.addTo(map);
  //     map.removeLayer(roads);
  //   } else {
  //     roads.addTo(map);
  //     map.removeLayer(mapbox_satellite);
  //   };
  // });

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
    this.content += "<b>Sales Volume:</b> " + this.properties.Sales_Vol + "<br>";
  } else {
    this.content += "<b>Sales Volume:</b> $" + this.properties.Sales_Vol + "<br>";
  };

  this.content += "<b>Sector:</b> " + this.properties.Sector + "</p>";

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

var a = 0;
var aopen = "holder";
var b = 0;
var fin_form_margin = 0;
var bopen = "holder";
var c = 0;
var soc_form_margin = 0;
var copen = "holder";
var d = 0;
var util_form_margin = 0;
var dopen = "holder";
var height;
var open = 0;
var info1_top = 247;
var info2_top = 272;
var info1_text = 260;
var info2_text = 285;

var comm_form;
var fin_form;
var soc_form;
var util_form;

var scrollTop = $(window).scrollTop(),
        elementOffset = $('#commercial_filter').offset().top,
        distance1 = (elementOffset - scrollTop);
$('#plus1').css("top", distance1-1.5);
var scrollTop2 = $(window).scrollTop(),
        elementOffset2 = $('#financial_filter').offset().top,
        distance2 = (elementOffset2 - scrollTop2);
$('#plus2').css("top", distance2-1.5);
var scrollTop3 = $(window).scrollTop(),
        elementOffset3 = $('#social_filter').offset().top,
        distance3 = (elementOffset3 - scrollTop3);
$('#plus3').css("top", distance3-1.5);
var scrollTop4 = $(window).scrollTop(),
        elementOffset4 = $('#utilities_filter').offset().top,
        distance4 = (elementOffset4 - scrollTop4);
$('#plus4').css("top", distance4-1.5);

  $('#plus1').on({
    click: function() {
      a++;
      if (a%2 != 0) {
        height = calc_height() + 115;
        fin_form_margin += 115;
        soc_form_margin += 115;
        util_form_margin += 115;
        info1_top += 117;
        info2_top += 117;
        info1_text += 117;
        info2_text += 117;
        aopen = true;
        $("#controls").height(height);
        $("#financial_filter").css("margin-top", "10em");
        plus2_top = calc2_top();
        plus3_top = calc3_top();
        plus4_top = calc4_top();
        $("#plus2").css("top", plus2_top);
        $("#plus3").css("top", plus3_top);
        $("#plus4").css("top", plus4_top);
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#plus1").attr('src', 'images/minus.png');
        if (open == 0) {
          $("#controls").css("width", "200px");
          $("#bar").css("width", "200px");
          $("#plus1").css("right", "101px");
          $("#plus2").css("right", "118px");
          $("#plus3").css("right", "134px");
          $("#plus4").css("right", "126px");
          $(".info").css("margin", "2.5px 70px 0px 0px");
        };
        if (bopen == true) {
          b++;
          bopen = false;
          info1_top -= 120;
          info2_top -= 120;
          height = calc_height() - 120;
          open -=1;
          soc_form_margin -= 120;
          util_form_margin -= 120;
          info1_text -= 120;
          info2_text -= 120;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $(".fin_form").css("display", "none");
          $("#plus2").attr('src', 'images/plus.png');
          $("#social_filter").css("margin-top", "5px");
          plus3_top = calc3_top();
          plus4_top = calc4_top();
          $("#plus3").css("top", plus3_top);
          $("#plus4").css("top", plus4_top);
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".soc_form").css("margin-top", soc_form_margin);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (copen == true) {
          c++;
          copen = false;
          info1_top -= 91;
          info2_top -= 91;
          height = calc_height() - 90;
          open -=1;
          util_form_margin -= 95;
          info1_text -= 91;
          info2_text -= 91;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#utilities_filter").css("margin-top", "5px");
          plus4_top = calc4_top();
          $("#plus4").css("top", plus4_top);
          $(".soc_form").css("display", "none");
          $("#plus3").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (dopen == true) {
          d++;
          dopen = false;
          info1_top -= 92;
          info2_top -= 92;
          height = calc_height() - 90;
          open -=1;
          info1_text -= 92;
          info2_text -= 92;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#boundaries").css("margin-top", "1.5em");
          $(".util_form").css("display", "none");
          $("#plus4").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".util_form").css("margin-top", util_form_margin);
        };
        comm_form = calc1_top() + 8.5;
        $(".comm_form").css("display", "inline-block");
        $(".comm_form").css("top", comm_form);
        $(".fin_form").css("margin-top", fin_form_margin);
        $(".soc_form").css("margin-top", soc_form_margin);
        $(".util_form").css("margin-top", util_form_margin);
        open += 1;
        if (open > 0) {
          $("#info1_text").css("right", "220px");
          $("#info2_text").css("right", "220px");
        }
      } else {
        height = calc_height() - 115;
        fin_form_margin -= 115;
        soc_form_margin -= 115;
        util_form_margin -= 115;
        info1_top -= 117;
        info2_top -= 117;
        info1_text -= 117;
        info2_text -= 117;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#financial_filter").css("margin-top", "5px");
        plus2_top = calc2_top();
        plus3_top = calc3_top();
        plus4_top = calc4_top();
        $(".fin_form").css("margin-top", fin_form_margin);
        $(".soc_form").css("margin-top", soc_form_margin);
        $(".util_form").css("margin-top", util_form_margin);
        $("#plus2").css("top", plus2_top);
        $("#plus3").css("top", plus3_top);
        $("#plus4").css("top", plus4_top);
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        aopen = false;
        $("#plus1").attr('src', 'images/plus.png');
        if (open == 1) {
          $("#controls").css("width", "130px");
          $("#bar").css("width", "130px");
          $("#plus1").css("right", "31px");
          $("#plus2").css("right", "48px");
          $("#plus3").css("right", "64px");
          $("#plus4").css("right", "56px");
          $(".info").css("margin", "2.5px 10px 0px 0px");
        };
        $(".comm_form").css("display", "none");
        open -= 1;
        if (open == 0) {
          $("#info1_text").css("right", "150px");
          $("#info2_text").css("right", "150px");
        }
      };
    }
  });

  $('#plus2').on({
    click: function() {
      b++;
      if (b%2 != 0) {
        height = calc_height() + 120;
        soc_form_margin += 120;
        util_form_margin += 120;
        info1_top += 119;
        info2_top += 119;
        bopen = true;
        info1_text += 119;
        info2_text += 119;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#social_filter").css("margin-top", "10.5em");
        plus3_top = calc3_top();
        plus4_top = calc4_top();
        $(".soc_form").css("margin-top", soc_form_margin);
        $(".util_form").css("margin-top", util_form_margin);
        $("#plus3").css("top", plus3_top);
        $("#plus4").css("top", plus4_top);
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        $("#plus2").attr('src', 'images/minus.png');
        if (open == 0) {
          $("#controls").css("width", "200px");
          $("#bar").css("width", "200px");
          $("#plus1").css("right", "101px");
          $("#plus2").css("right", "118px");
          $("#plus3").css("right", "134px");
          $("#plus4").css("right", "126px");
          $(".info").css("margin", "2.5px 70px 0px 0px");
        };
        if (aopen == true) {
          a++;
          aopen = false;
          info1_top -= 117;
          info2_top -= 117;
          height = calc_height() - 115;
          open -=1;
          fin_form_margin -= 115;
          soc_form_margin -= 115;
          util_form_margin -= 115;
          info1_text -= 117;
          info2_text -= 117;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $(".comm_form").css("display", "none");
          $("#plus1").attr('src', 'images/plus.png');
          $("#financial_filter").css("margin-top", "5px");
          plus2_top = calc2_top();
          plus3_top = calc3_top();
          plus4_top = calc4_top();
          $("#plus2").css("top", plus2_top);
          $("#plus3").css("top", plus3_top);
          $("#plus4").css("top", plus4_top);
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".fin_form").css("margin-top", fin_form_margin);
          $(".soc_form").css("margin-top", soc_form_margin);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (copen == true) {
          c++;
          copen = false;
          info1_top -= 91;
          info2_top -= 91;
          height = calc_height() - 90;
          open -=1;
          util_form_margin -= 95;
          info1_text -= 91;
          info2_text -= 91;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#utilities_filter").css("margin-top", "5px");
          plus4_top = calc4_top();
          $("#plus4").css("top", plus4_top);
          $(".soc_form").css("display", "none");
          $("#plus3").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (dopen == true) {
          d++;
          dopen = false;
          info1_top -= 92;
          info2_top -= 92;
          height = calc_height() - 90;
          open -=1;
          info1_text -= 92;
          info2_text -= 92;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#boundaries").css("margin-top", "1.5em");
          $(".util_form").css("display", "none");
          $("#plus4").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".util_form").css("margin-top", util_form_margin);
        };
        fin_form = calc2_top() + 8.5;
        $(".fin_form").css("display", "inline-block");
        $(".fin_form").css("top", fin_form);
        open += 1;
        if (open > 0) {
          $("#info1_text").css("right", "220px");
          $("#info2_text").css("right", "220px");
        }
      } else {
        height =  calc_height() - 120;
        soc_form_margin -= 120;
        util_form_margin -= 120;
        info1_top -= 119;
        info2_top -= 119;
        bopen = false;
        info1_text -= 119;
        info2_text -= 119;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#social_filter").css("margin-top", "5px");
        plus3_top = calc3_top();
        plus4_top = calc4_top();
        $("#plus3").css("top", plus3_top);
        $("#plus4").css("top", plus4_top);
        $("#plus2").attr('src', 'images/plus.png');
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        if (open == 1) {
          $("#controls").css("width", "130px");
          $("#bar").css("width", "130px");
          $("#plus1").css("right", "31px");
          $("#plus2").css("right", "48px");
          $("#plus3").css("right", "64px");
          $("#plus4").css("right", "56px");
          $(".info").css("margin", "2.5px 10px 0px 0px");
        };
        $(".fin_form").css("display", "none");
        $(".soc_form").css("margin-top", soc_form_margin);
        $(".util_form").css("margin-top", util_form_margin);
        open -= 1;
        if (open == 0) {
          $("#info1_text").css("right", "150px");
          $("#info2_text").css("right", "150px");
        }
      };
    }
  });

  $('#plus3').on({
    click: function() {
      c++;
      if (c%2 != 0) {
        height = calc_height() + 90;
        util_form_margin += 95;
        info1_top += 92;
        info2_top += 92;
        copen = true;
        info1_text += 92;
        info2_text += 92;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#utilities_filter").css("margin-top", "100px");
        plus4_top = calc4_top();
        $(".util_form").css("margin-top", util_form_margin);
        $("#plus4").css("top", plus4_top);
        $("#plus3").attr('src', 'images/minus.png');
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        if (open == 0) {
          $("#controls").css("width", "200px");
          $("#bar").css("width", "200px");
          $("#plus1").css("right", "101px");
          $("#plus2").css("right", "118px");
          $("#plus3").css("right", "134px");
          $("#plus4").css("right", "126px");
          $(".info").css("margin", "2.5px 70px 0px 0px");
        };
        if (aopen == true) {
          a++;
          aopen = false;
          info1_top -= 117;
          info2_top -= 117;
          height = calc_height() - 115;
          open -=1;
          fin_form_margin -= 115;
          soc_form_margin -= 115;
          util_form_margin -= 115;
          info1_text -= 117;
          info2_text -= 117;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#financial_filter").css("margin-top", "5px");
          plus2_top = calc2_top();
          plus3_top = calc3_top();
          plus4_top = calc4_top();
          $("#plus2").css("top", plus2_top);
          $("#plus3").css("top", plus3_top);
          $("#plus4").css("top", plus4_top);
          $(".comm_form").css("display", "none");
          $("#plus1").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".fin_form").css("margin-top", fin_form_margin);
          $(".soc_form").css("margin-top", soc_form_margin);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (bopen == true) {
          b++;
          bopen = false;
          info1_top -= 120;
          info2_top -= 120;
          height = calc_height() - 120;
          open -=1;
          soc_form_margin -= 120;
          util_form_margin -= 120;
          info1_text -= 120;
          info2_text -= 120;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#social_filter").css("margin-top", "5px");
          plus3_top = calc3_top();
          plus4_top = calc4_top();
          $("#plus3").css("top", plus3_top);
          $("#plus4").css("top", plus4_top);
          $(".fin_form").css("display", "none");
          $("#plus2").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".soc_form").css("margin-top", soc_form_margin);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (dopen == true) {
          d++;
          dopen = false;
          info1_top -= 92;
          info2_top -= 92;
          height = calc_height() - 90;
          open -=1;
          info1_text -= 92;
          info2_text -= 92;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#boundaries").css("margin-top", "1.5em");
          $(".util_form").css("display", "none");
          $("#plus4").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".util_form").css("margin-top", util_form_margin);
        };
        soc_form = calc3_top() + 8.5;
        $(".soc_form").css("display", "inline-block");
        $(".soc_form").css("top", soc_form);
        open += 1;
        if (open > 0) {
          $("#info1_text").css("right", "220px");
          $("#info2_text").css("right", "220px");
        }
      } else {
        height =  calc_height() - 90;
        util_form_margin -= 95;
        info1_top -= 91;
        info2_top -= 91;
        copen = false;
        info1_text -= 92;
        info2_text -= 92;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#utilities_filter").css("margin-top", "5px");
        plus4_top = calc4_top();
        $("#plus4").css("top", plus4_top);
        $("#plus3").attr('src', 'images/plus.png');
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        if (open == 1) {
          $("#controls").css("width", "130px");
          $("#bar").css("width", "130px");
          $("#plus1").css("right", "31px");
          $("#plus2").css("right", "48px");
          $("#plus3").css("right", "64px");
          $("#plus4").css("right", "56px");
          $(".info").css("margin", "2.5px 10px 0px 0px");
        };
        $(".soc_form").css("display", "none");
        $(".util_form").css("margin-top", util_form_margin);
        open -= 1;
        if (open == 0) {
          $("#info1_text").css("right", "150px");
          $("#info2_text").css("right", "150px");
        }
      };
    }
  });

  $('#plus4').on({
    click: function() {
      d++;
      if (d%2 != 0) {
        height = calc_height() + 90;
        info1_top += 92;
        info2_top += 92;
        dopen = true;
        info1_text += 92;
        info2_text += 92;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#boundaries").css("margin-top", "9em");
        $("#plus4").attr('src', 'images/minus.png');
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        if (open == 0) {
          $("#controls").css("width", "200px");
          $("#bar").css("width", "200px");
          $("#plus1").css("right", "101px");
          $("#plus2").css("right", "118px");
          $("#plus3").css("right", "134px");
          $("#plus4").css("right", "126px");
          $(".info").css("margin", "2.5px 70px 0px 0px");
        };
        if (aopen == true) {
          a++;
          aopen = false;
          info1_top -= 117;
          info2_top -= 117;
          height = calc_height() - 115;
          open -=1;
          fin_form_margin -= 115;
          soc_form_margin -= 115;
          util_form_margin -= 115;
          info1_text -= 117;
          info2_text -= 117;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#financial_filter").css("margin-top", "5px");
          plus2_top = calc2_top();
          plus3_top = calc3_top();
          plus4_top = calc4_top();
          $("#plus2").css("top", plus2_top);
          $("#plus3").css("top", plus3_top);
          $("#plus4").css("top", plus4_top);
          $(".comm_form").css("display", "none");
          $("#plus1").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".fin_form").css("margin-top", fin_form_margin);
          $(".soc_form").css("margin-top", soc_form_margin);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (bopen == true) {
          b++;
          bopen = false;
          info1_top -= 120;
          info2_top -= 120;
          height = calc_height() - 120;
          open -=1;
          soc_form_margin -= 120;
          util_form_margin -= 120;
          info1_text -= 120;
          info2_text -= 120;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#social_filter").css("margin-top", "5px");
          plus3_top = calc3_top();
          plus4_top = calc4_top();
          $("#plus3").css("top", plus3_top);
          $("#plus4").css("top", plus4_top);
          $(".fin_form").css("display", "none");
          $("#plus2").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".soc_form").css("margin-top", soc_form_margin);
          $(".util_form").css("margin-top", util_form_margin);
        };
        if (copen == true) {
          c++;
          copen = false;
          info1_top -= 91;
          info2_top -= 91;
          height = calc_height() - 90;
          open -=1;
          util_form_margin -= 95;
          info1_text -= 91;
          info2_text -= 91;
          $("#info1_text").css("top", info1_text);
          $("#info2_text").css("top", info2_text);
          $("#utilities_filter").css("margin-top", "5px");
          plus4_top = calc4_top();
          $("#plus4").css("top", plus4_top);
          $(".soc_form").css("display", "none");
          $("#plus3").attr('src', 'images/plus.png');
          $("#info1").css("top", info1_top);
          $("#info2").css("top", info2_top);
          $("#controls").height(height);
          $(".util_form").css("margin-top", util_form_margin);
        };
        util_form = calc4_top() + 8.5;
        $(".util_form").css("display", "inline-block");
        $(".util_form").css("top", util_form);
        open += 1;
        if (open > 0) {
          $("#info1_text").css("right", "220px");
          $("#info2_text").css("right", "220px");
        }
      } else {
        console.log($("#plus4").attr('src'));
        height =  calc_height() - 90;
        info1_top -= 92;
        info2_top -= 92;
        dopen = false;
        info1_text -= 92;
        info2_text -= 92;
        $("#info1_text").css("top", info1_text);
        $("#info2_text").css("top", info2_text);
        $("#controls").height(height);
        $("#boundaries").css("margin-top", "1.5em");
        $("#plus4").attr('src', 'images/plus.png');
        $("#info1").css("top", info1_top);
        $("#info2").css("top", info2_top);
        if (open == 1) {
          $("#controls").css("width", "130px");
          $("#bar").css("width", "130px");
          $("#plus1").css("right", "31px");
          $("#plus2").css("right", "48px");
          $("#plus3").css("right", "64px");
          $("#plus4").css("right", "56px");
          $(".info").css("margin", "2.5px 10px 0px 0px");
        };
        $(".util_form").css("display", "none");
        open -= 1;
        if (open == 0) {
          $("#info1_text").css("right", "150px");
          $("#info2_text").css("right", "150px");
        }
      };
    }
  });

function calc_height() {
  var e = $("#controls").height();
  return e;
};

function calc1_top() {
  var scroll_top = $(window).scrollTop(),
        element_offset = $('#commercial_filter').offset().top,
        e = (element_offset - scroll_top);
        e = e - 1.5;
  return e;
};

function calc2_top() {
  var scroll_top = $(window).scrollTop(),
        element_offset = $('#financial_filter').offset().top,
        e = (element_offset - scroll_top);
        e = e - 1.5;
  return e;
};

function calc3_top() {
  var scroll_top = $(window).scrollTop(),
        element_offset = $('#social_filter').offset().top,
        e = (element_offset - scroll_top);
        e = e - 1.5;
  return e;
};

function calc4_top() {
  var scroll_top = $(window).scrollTop(),
        element_offset = $('#utilities_filter').offset().top,
        e = (element_offset - scroll_top);
        e = e - 1.5;
  return e;
};

// custom layers control handling top level sector buttons
$('input[name=top_sector]:checkbox').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'all_coops') {
      if ($('#all_coops').is(':checked')) {
        marker_cluster.addTo(map);
      } else { 
        map.removeLayer(marker_cluster);
      }
    };
    if (a == 'commercial') {
      if ($('#commercial_filter').is(':checked')) {
        marker_cluster1.addTo(map);
      } else {
        map.removeLayer(marker_cluster1);
      }
    };
    if (a == 'financial') {
      if ($('#financial_filter').is(':checked')) {
        marker_cluster2.addTo(map);
      } else {
        map.removeLayer(marker_cluster2);
      }
    };
    if (a == 'social') {
      if ($('#social_filter').is(':checked')) {
        marker_cluster3.addTo(map);
      } else {
        map.removeLayer(marker_cluster3);
      }
    };
    if (a == 'utilities') {
      if ($('#utilities_filter').is(':checked')) {
        marker_cluster4.addTo(map);
      } else {
        map.removeLayer(marker_cluster4);
      }
    };
});

// custom layers control handling metro boundaries
$('input[name=metros]:checkbox').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'csa_metro') {
      if ($('#metro_filter').is(':checked')) {
        csa_metro.addTo(map);
      } else { 
        map.removeLayer(csa_metro);
      }
    };
    if (a == 'non_metro') {
      if ($('#non_metro_filter').is(':checked')) {
        non_metro.addTo(map);
      } else {
        map.removeLayer(non_metro);
      }
    };
});

// custom layers control handling commercial sector
$('input[name=comm_sector]:checkbox').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'ag_farmSupply') {
      if ($('#ag_farm_filter').is(':checked')) {
        ag_farmSupply.addTo(map);
      } else { 
        map.removeLayer(ag_farmSupply);
      }
    };
    if (a == 'grocery') {
      if ($('#grocery_filter').is(':checked')) {
        grocery.addTo(map);
      } else {
        map.removeLayer(grocery);
      }
    };
    if (a == 'other_sales') {
      if ($('#other_sales_filter').is(':checked')) {
        other_sales.addTo(map);
      } else {
        map.removeLayer(other_sales);
      }
    };
    if (a == 'transport') {
      if ($('#transport_filter').is(':checked')) {
        transport.addTo(map);
      } else {
        map.removeLayer(transport);
      }
    };
});

// custom layers control handling financial sector
$('input[name=fin_sector]:checkbox').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'credit_unions') {
      if ($('#cu_filter').is(':checked')) {
        credit_union.addTo(map);
      } else { 
        map.removeLayer(credit_union);
      }
    };
    if (a == 'farm_credit') {
      if ($('#farm_credit_filter').is(':checked')) {
        farm_credit.addTo(map);
      } else {
        map.removeLayer(farm_credit);
      }
    };
    if (a == 'mutual_insurance') {
      if ($('#mutual_insurance_filter').is(':checked')) {
        mutual_insurance.addTo(map);
      } else {
        map.removeLayer(mutual_insurance);
      }
    };
    if (a == 'other_financial') {
      if ($('#other_financial_filter').is(':checked')) {
        other_financial.addTo(map);
      } else {
        map.removeLayer(other_financial);
      }
    };
    if (a == 'coop_finance') {
      if ($('#coop_finance_filter').is(':checked')) {
        cooperative_finance.addTo(map);
      } else {
        map.removeLayer(cooperative_finance);
      }
    };
});

// custom layers control handling social sector
$('input[name=soc_sector]:checkbox').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'healthcare') {
      if ($('#healthcare_filter').is(':checked')) {
        healthcare.addTo(map);
      } else { 
        map.removeLayer(healthcare);
      }
    };
    if (a == 'childcare') {
      if ($('#childcare_filter').is(':checked')) {
        childcare.addTo(map);
      } else {
        map.removeLayer(childcare);
      }
    };
    if (a == 'education') {
      if ($('#education_filter').is(':checked')) {
        education.addTo(map);
      } else {
        map.removeLayer(education);
      }
    };
    if (a == 'other_social') {
      if ($('#other_social_filter').is(':checked')) {
        other_social.addTo(map);
      } else {
        map.removeLayer(other_social);
      }
    };
});

// custom layers control handling utilities sector
$('input[name=util_sector]:checkbox').on('click change', function(e) {
    var a;
    a = $(this).val();
    if (a == 'rural_electric') {
      if ($('#rural_electric_filter').is(':checked')) {
        rural_electric.addTo(map);
      } else { 
        map.removeLayer(rural_electric);
      }
    };
    if (a == 'telecom') {
      if ($('#telecom_filter').is(':checked')) {
        telecom.addTo(map);
      } else {
        map.removeLayer(telecom);
      }
    };
    if (a == 'water') {
      if ($('#water_filter').is(':checked')) {
        water.addTo(map);
      } else {
        map.removeLayer(water);
      }
    };
    if (a == 'other_util') {
      if ($('#other_utilities_filter').is(':checked')) {
        other_utilities.addTo(map);
      } else {
        map.removeLayer(other_utilities);
      }
    };
});

var asource = "holder";
$("#plus1").on({
    mouseover: function(){
      if ($("#plus1").attr('src') == "images/plus.png") {
        asource = "images/plus_highlight.png";
      } else {
        asource = "images/minus_highlight.png";
      }
      $("#plus1").attr("src", asource);
    },
    mouseout: function(){
      if ($("#plus1").attr('src') == "images/plus_highlight.png" || $("#plus1").attr('src') == "images/plus.png") {
        asource = "images/plus.png";
      } else {
        asource = "images/minus.png";
      }
      $("#plus1").attr("src", asource);
    }
});

var bsource = "holder";
$("#plus2").on({
    mouseover: function(){
      if ($("#plus2").attr('src') == "images/plus.png") {
        bsource = "images/plus_highlight.png";
      } else {
        bsource = "images/minus_highlight.png";
      }
      $("#plus2").attr("src", bsource);
    },
    mouseout: function(){
      if ($("#plus2").attr('src') == "images/plus_highlight.png" || $("#plus2").attr('src') == "images/plus.png") {
        bsource = "images/plus.png";
      } else {
        bsource = "images/minus.png";
      }
      $("#plus2").attr("src", bsource);
    }
});

var csource = "holder";
$("#plus3").on({
    mouseover: function(){
      if ($("#plus3").attr('src') == "images/plus.png") {
        csource = "images/plus_highlight.png";
      } else {
        csource = "images/minus_highlight.png";
      }
      $("#plus3").attr("src", csource);
    },
    mouseout: function(){
      if ($("#plus3").attr('src') == "images/plus_highlight.png" || $("#plus3").attr('src') == "images/plus.png") {
        csource = "images/plus.png";
      } else {
        csource = "images/minus.png";
      }
      $("#plus3").attr("src", csource);
    }
});

var dsource = "holder";
$("#plus4").on({
    mouseover: function(){
      if ($("#plus4").attr('src') == "images/plus.png") {
        dsource = "images/plus_highlight.png";
      } else {
        dsource = "images/minus_highlight.png";
      }
      $("#plus4").attr("src", dsource);
    },
    mouseout: function(){
      if ($("#plus4").attr('src') == "images/plus_highlight.png" || $("#plus4").attr('src') == "images/plus.png") {
        dsource = "images/plus.png";
      } else {
        dsource = "images/minus.png";
      }
      $("#plus4").attr("src", dsource);
    }
});


//call the initialize function when the document has loaded
$(document).ready(initialize);
