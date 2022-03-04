mapboxgl.accessToken =
  'pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg';
const map = new mapboxgl.Map({
  container: 'map', //Container ID
  style: 'mapbox://styles/mapbox/streets-v11', //style URL
  center: [-77.03653127987717, 38.89876926362938], // starting position
  zoom: 14, // starting zoom
});

async function getBathrooms() {
  const response = await fetch('/api/bathrooms');
  const data = await response.json();
  console.log(data); // this works

  const bathrooms = data.map((bathroom) => {
// this works
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [bathroom.lon, bathroom.lat],
      },
      properties: {
        marker_id: bathroom.id,
        // icon: 'toilet.jiff' // not sure about this
      },
    };
  });
  console.log(bathrooms);
  loadMap(bathrooms);
}

//on map load // add bathroom id to each marker
// in this case get all bathrooms and render markers with lat and lon and id from bathrooms
async function loadMap(bathrooms) {
  map.on('load', () => {
    /* Add the data to your map as a layer */
    map.addLayer({
      id: 'locations',
      type: 'circle', // this works
      /* Add a GeoJSON source containing place coordinates and information. */
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: bathrooms
      }, // this doesnt work with icon yet
      // layout: {
      //   'icon-image': '{icon}-15',
      //   'icon-size': 1.5,
      //   'text-field': '{storeId}',
      //   'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      //   'text-offset': [0, 0.9],
      //   'text-anchor': 'top'
      // },
    }
    });
  });
}

//add markers to map
// markers.features.forEach(function(marker) {
//   console.log(marker.geometry.coordinates)
//   //create a html element for each feature
//   var el = document.createElement('div');
//   el.className = 'marker';
// //make a marker for each feature and add to the map
// new mapboxgl.Marker(el)
// .setLngLat(marker.geometry.coordinates)
// .setPopup(new mapboxgl.Popup({ offset: 25 })
// .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.location + '</p>'))
// .addTo(map);
// });

map.addControl(new mapboxgl.NavigationControl());

//layer needs to match layer name wih markers
map.on('click', 'locations', (e) => {
  // make get request to bathroom
  // pass in bathroom id
  //display on the right: bathroom and reviews
  // will also include input and post
});

map.on('contextmenu', async (e) => {
  console.log(e.lngLat);
  const { lng, lat } = await e.lngLat;
  const coords = [lng, lat];
  //make a marker for each feature and add to the map
  // open right hand modal with post
  // fetch post to bathroom
  //req.body would be lnglat object
  var el = document.createElement('div');
  el.className = 'marker';
  new mapboxgl.Marker(el)
    .setLngLat(coords)
    // .setPopup(new mapboxgl.Popup({ offset: 25 }))
    // .setHTML('<p>test bathroom</p>')
    .addTo(map);
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

getBathrooms();
