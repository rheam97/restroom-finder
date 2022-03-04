mapboxgl.accessToken =
  'pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg';
const map = new mapboxgl.Map({
  container: 'map', //Container ID
  style: 'mapbox://styles/mapbox/streets-v11', //style URL
  center: [-77.03653127987717, 38.89876926362938], // starting position
  zoom: 14, // starting zoom
});

async function getBathrooms() {
// may need to pass in window.location here instead
//because this is on home page and home page fetches all bathrooms
  const response = await fetch('/api/bathrooms');
  const data = await response.json();
  console.log(data)

  const bathrooms = data.map((bathroom) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [bathroom.lon, bathroom.lat],
      },
      properties: {
        marker_id: bathroom.id,
        icon: 'toilet' // not sure about this
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

    //need to find sutiable image url
// map.loadImage('https://flyclipart.com/download-toilet-paper-icon-png-clipart-toilet-paper-clip-art-treasure-map-clipart-432284', (error, image) => {
// if (error) throw error;
// // Add the loaded image to the style's sprite with the ID 'kitten'.
// map.addImage('toilet', image);
// });
    /* Add the data to your map as a layer */
    map.addLayer({
      id: 'points',
      type: 'circle', // change this to symbol when we figure out image
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: bathrooms
        }
      },
      // layout: {
      //   'icon-image': 'toilet',
      //   'icon-size': 1.5,
      //   'text-field': '{storeId}',
      //   'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      //   'text-offset': [0, 0.9],
      //   'text-anchor': 'top'
      // }
    })
  })
}


//layer needs to match layer name wih markers
map.on('click', 'points', (e) => {
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
map.addControl(new mapboxgl.NavigationControl());

getBathrooms();
