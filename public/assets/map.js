mapboxgl.accessToken =
"pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg";
let map = new mapboxgl.Map({
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
.setLngLat([geolocate])
.addTo(map);
   
  // Add the geocoder to the map
  map.addControl(geocoder);

//initiates the series of processes which run once the search is run on the webpage. If a text is entered in the input field, a search is performed
var formSubmitHandler = function (event) {
// prevent page from refreshing
event.preventDefault();

// get value from input element
var cityName = cityInputEl.value.trim();
if (/[0-9]/.test(cityName)) {
  $("#modal-error").modal("open");
  return;
}

if (cityName) {
  getCityData(cityName);
  localStoring(cityName);

  cityInputEl.value = "";
} else {
  //$(document).ready(function () {
  $("#modal").modal("open");
}
};

var buttonClickHandler = function (event) {
// get the city attribute from the clicked element
var city = event.target.getAttribute("data-city");

if (city) {
  getCity(city);
}
};

var getCityData = function (city) {
var city = cityInputEl.value.trim();

if (city) {
  getCity(city);
}
};

function onShowPOI(data) {
    let poi = document.getElementById("poi");
    poi.innerHTML = "";
    if (data.preview) {
      poi.innerHTML += `<img src="${data.preview.source}">`;
    }
    poi.innerHTML += data.wikipedia_extracts
      ? data.wikipedia_extracts.html
      : data.info
      ? data.info.descr
      : "No description";
  
    poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;

//sets map to Point of Interest and plants a marker
map.jumpTo({
    center: [data.point.lon, data.point.lat],
    zoom: 17,
  });
  marker.setLngLat([data.point.lon, data.point.lat]);
}