mapboxgl.accessToken =
"pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg";
let map = new mapboxgl.Map({
container: "map", //Container ID
style: "mapbox://styles/olopez92084/cky6s06631d4p15o1kb7ut2qq", //style URL
center: [-77.03, 38.90], // starting position
zoom: 14, // starting zoom
});

var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Marker',
        coordinates: [-77.0312, 38.9111]
      },
      properties: {
        title: 'Mapbox',
        description: 'Toilet'
      }
    },
{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-77.0444, 38.937]
  },
  properties: {
    title: 'Mapbox',
    description: "Washroom"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-77.0454, 38.941]
  },
  properties: {
    title: 'Mapbox',
    description: "Starbucks B/R"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-77.04, 38.931]
  },
  properties: {
    title: 'Mapbox',
    description: "Port-A-John"
  }
}
]
};

//add markers to map
geojson.features.forEach(function(marker) {
  //create a html element for each feature
  var el = document.createElement('div');
  el.className = 'marker';
//make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
});

map.addControl(new mapboxgl.NavigationControl());

// Initialize the GeolocateControl.
const geolocate = new mapboxgl.GeolocateControl({
positionOptions: {
  enableHighAccuracy: true,
},
trackUserLocation: true,
});
//  Add the control to the map.
map.addControl(geolocate);

// Set marker options.
// const marker = new mapboxgl.Marker({
// color: "red",
// draggable: false,
// })
// .setLngLat([-77.05, 38.90])
// .addTo(map);

var marker = new mapboxgl.Marker();

function add_marker (event) {
  var coordinates = event.lngLat;
  console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
  marker.setLngLat(coordinates).addTo(map);
}

map.on('click', add_marker);
   
  // Add the geocoder to the map
  // map.addControl(geocoder);

// //initiates the series of processes which run once the search is run on the webpage. If a text is entered in the input field, a search is performed
// var formSubmitHandler = function (event) {
// // prevent page from refreshing
// event.preventDefault();

// // get value from input element
// var cityName = cityInputEl.value.trim();
// if (/[0-9]/.test(cityName)) {
//   $("#modal-error").modal("open");
//   return;
// }

// if (cityName) {
//   getCityData(cityName);
//   localStoring(cityName);

//   cityInputEl.value = "";
// } else {
//   //$(document).ready(function () {
//   $("#modal").modal("open");
// }
// };

// var buttonClickHandler = function (event) {
// // get the city attribute from the clicked element
// var city = event.target.getAttribute("data-city");

// if (city) {
//   getCity(city);
// }
// };

// var getCityData = function (city) {
// var city = cityInputEl.value.trim();

// if (city) {
//   getCity(city);
// }
// };

//sets map to Point of Interest and plants a marker

// const geojson = [
//   {
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [-77.031952, 38.913184]
//     }
//   },
//   {
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [-122.413682, 37.775408]
//     }
//   }
// ];

const mapGeo = L.mapbox.map('map_geo')
  .setView([37.8, -96], 4)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));

const myLayer = L.mapbox.featureLayer().setGeoJSON(geojson).addTo(mapGeo);
mapGeo.scrollWheelZoom.disable();

map.jumpTo({
    center: [data.point.lon, data.point.lat],
    zoom: 17,
  });
  marker.setLngLat([data.point.lon, data.point.lat]);

