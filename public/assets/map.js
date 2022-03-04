mapboxgl.accessToken =
"pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg";
const map = new mapboxgl.Map({
container: "map", //Container ID
style: "mapbox://styles/olopez92084/cky6s06631d4p15o1kb7ut2qq", //style URL
center: [-77.03653127987717, 38.89876926362938], // starting position
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
        title: 'Port-A-John',
        location: 'Q st NW'
      }
    },
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.0444, 38.937]
  },
  properties: {
    title: 'Port-A-John',
    location: "Pinay Branch Park"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.0454, 38.941]
  },
  properties: {
    title: 'Public Restroom',
    location: "Upshur St NW"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.03653127987717, 38.89876926362938]
  },
  properties: {
    title: 'Public Restroom',
    location: "White House B/R"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.03853127987717, 38.89976926362938]
  },
  properties: {
    title: 'Public Restroom',
    location: "Blair House Office"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.03823127987717, 38.89676926362938]
  },
  properties: {
    title: 'Public Restroom',
    location: "Eisenhower Office Complex"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.040167, 38.896114]
  },
  properties: {
    title: 'Portable',
    location: "NY Ave NW"
  }
},
{
  type: 'Feature',
  geometry: {
    type: 'Marker',
    coordinates: [-77.04, 38.931]
  },
  properties: {
    title: 'Public Restroom',
    location: "Kilbourne Pl NW"
  }
}
]
};




//add markers to map
geojson.features.forEach(function(marker) {
  console.log(marker.geometry.coordinates)
  //create a html element for each feature
  var el = document.createElement('div');
  el.className = 'marker';
//make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 })
.setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.location + '</p>'))
.addTo(map);
});

map.addControl(new mapboxgl.NavigationControl());

//on map load // add bathroom id to each marker
// get request to the markers which includes bathroom (attr: id)
// may not need a marker model, just add lat and lon to bathroom 
// in this case get all bathrooms and render markers with lat and lon from bathrooms

//layer needs to match layer name
map.on('click', 'layer', (e)=> {
// make get request to bathroom
// pass in bathroom id 
//display on the right: bathroom and reviews
  // will also include input and post 

})
// markers array
// render the markers by iteratting through the array when we opne the map
map.on('contextmenu', (e)=> {
  console.log(e.lngLat)
  const {lng, lat} = e.lngLat
  const coords = [lng, lat]
  // fetch post to map markers
  //req.body would be lnglat object
  var el = document.createElement('div');
  el.className = 'marker';
//make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(coords)
.setPopup(new mapboxgl.Popup({ offset: 25 }))
.setHTML('<p>test bathroom</p>')
.addTo(map);
})
map.on('mousemove', (e) => {
  //document.getElementById('info').innerHTML =
  // `e.point` is the x, y coordinates of the `mousemove` event
  // relative to the top-left corner of the map.
  JSON.stringify(e.point) +
  '<br />' +
  // `e.lngLat` is the longitude, latitude geographical position of the event.
  JSON.stringify(e.lngLat.wrap());
  });

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

// var marker = new mapboxgl.Marker();

// function add_marker (event) {
//   var coordinates = event.lngLat;
//   console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
//   marker.setLngLat(coordinates).addTo(map);
// }

// map.on('click', add_marker);
   
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

// const mapGeo = L.mapbox.map('map_geo')
//   .setView([37.8, -96], 4)
//   .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));

// const myLayer = L.mapbox.featureLayer().setGeoJSON(geojson).addTo(mapGeo);
// mapGeo.scrollWheelZoom.disable();

// map.jumpTo({
//     center: [data.point.lon, data.point.lat],
//     zoom: 17,
//   });
//   marker.setLngLat([data.point.lon, data.point.lat]);
