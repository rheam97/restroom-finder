mapboxgl.accessToken =
"pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg";

const geojson = {
  'type': 'FeatureCollection',
  'features': [
  {
  'type': 'Feature',
  'properties': {
  'message': 'Foo',
  'iconSize': [60, 60]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [-66.324462, -16.024695]
  }
  },
  {
  'type': 'Feature',
  'properties': {
  'message': 'Bar',
  'iconSize': [50, 50]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [-61.21582, -15.971891]
  }
  },
  {
  'type': 'Feature',
  'properties': {
  'message': 'Restroom',
  'iconSize': [-77.03, 38.90]
  },
  'geometry': {
  'type': 'Point',
  'coordinates': [-63.292236, -18.281518]
  }
  }
  ]
  };

const map = new mapboxgl.Map({
container: "map", //Container ID
style: "mapbox://styles/olopez92084/cky6s06631d4p15o1kb7ut2qq", //style URL
center: [-77.03, 38.90], // starting position
zoom: 17, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

// Initialize the GeolocateControl.
const geolocate = new mapboxgl.GeolocateControl({
positionOptions: {
  enableHighAccuracy: true,
},
trackUserLocation: true,
});
// Add the control to the map.
map.addControl(geolocate);

// Set marker options.
const marker = new mapboxgl.Marker({
color: "red",
draggable: false,
})
.setLngLat([-77.03, 38.90])
.addTo(map);
   
  // Add the geocoder to the map
  map.addControl(geocoder);

  for (const marker of geojson.features) {
    // Create a DOM element for each marker.
    const el = document.createElement('div');
    const width = marker.properties.iconSize[0];
    const height = marker.properties.iconSize[1];
    el.className = 'marker';
    el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
    el.style.width = `5px`;
    el.style.height = `5px`;
    el.style.backgroundSize = '100%';
     
    el.addEventListener('click', () => {
    window.alert(marker.properties.message);
    });
     
    // Add markers to the map.
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    }
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
