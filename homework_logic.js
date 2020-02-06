// We create the tile layer that will be the background of our map.
console.log("working");

var apiKey = API_KEY;

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 15,
  id: "mapbox.streets",
  accessToken: apiKey
});

// Create Map Options
var map = L.map("id_map", {
  center: [
    38.9.7, -107.5
  ],
  zoom: 2
});


// Get Geojson file for earthquake 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  // Create Function
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      color: "#1111111",
      fillColor: getColor(feature.properties.mag),
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.8
    };
  }

  // Create function for stlying color based off magnitude 
  function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#d4ee00";
    case magnitude > 4:
      return "##eecc00";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "ea822c";
    case magnitude > 1:
      return "#ea2c2c";
    default:
      return "#98ee00";
    }
  }

  // Create function to change radius based off magnitude
  function getRadius(magnitude) {
    if (magnitude == 0) {
      return 1;
    }

    return magnitude * 2;
  }
  
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<br>Location: " + feature.properties.place +"Magnitude: " + feature.properties.mag );
    }
  }).addTo(map);

  // Here we create a legend control object.
  var legend = L.control({
    position: "topleft"
  });

  // Create details for legend 
  legend.onAdd = function() {
    var div = L.dom.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

  };

  // Lengend to map 
  legend.addTo(map);
});
