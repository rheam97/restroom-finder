

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
  console.log(data);

  const bathrooms = data.map((bathroom) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [bathroom.lon, bathroom.lat],
      },
      properties: {
        marker_id: bathroom.id,
        icon: 'toilet', // not sure about this
      },
    };
  });
  console.log(bathrooms);
  const markers = {
    type: 'FeatureCollection',
    features: bathrooms,
  };
  loadMap(markers);
}

//on map load // add bathroom id to each marker
// in this case get all bathrooms and render markers with lat and lon and id from bathrooms
async function loadMap(markers) {
  map.on('load', () => {
    addMarkers()
  })
  map.on('contextmenu', async(e)=> {
    console.log(e.lngLat);
    const { lng, lat } = await e.lngLat;
    const coords = [lng, lat];
    console.log(coords)
    //make a marker  add to the map
    var newel = document.createElement('div');
    newel.className = 'marker';
    new mapboxgl.Marker(newel)
      .setLngLat(coords)
      // .setPopup(new mapboxgl.Popup({ offset: 25 }))
      // .setHTML('<p>test bathroom</p>')
      .addTo(map);

    // open right hand modal with post
    // fetch post to bathroom
    //req.body would be lnglat object
    // req.body.title would be fetch to 
  //https://api.mapbox.com/geocoding/v5/{mapbox.places}/{longitude},{latitude}/{address}.json
  })
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of markers.features) {
    console.log(`these are the marker features ${JSON.stringify(marker)}`)
    /* Create a div element for the marker. */
    const el = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    el.id = `${marker.properties.marker_id}`;
    /* Assign the `marker` class to each marker for styling. */
    el.className = 'marker';
    
     //**make get request to bathroom with click event on marker
        //display on the right: bathroom and reviews
      // pass in bathroom id
      // will also include input and post
    el.addEventListener('click', async(e)=> {
    // *** render right hand display
    // will have to pass this data into html on right hand display
     const response = await fetch(`api/bathrooms/${el.id}`)
     const data = await response.json().catch(err=> response.json(err))
     console.log(data)
   
     e.stopPropagation()
    })
    /**
    * Create a marker using the div element
    * defined above and add it to the map.
    **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
    .setLngLat(marker.geometry.coordinates)
    .addTo(map)}
  }

}



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

// need a modal function to be called when points layer is clicked into as well as map layer

getBathrooms();
