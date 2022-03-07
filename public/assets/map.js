//DOM references in homepage
mapboxgl.accessToken =
  'pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg';
const map = new mapboxgl.Map({
  container: 'map', //Container ID
  style: 'mapbox://styles/mapbox/streets-v11', //style URL
  center: [-77.0365, 38.8977], // starting position
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
        icon: 'toilet', 
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
    // on load, add markers with info from bathroom model
    addMarkers()
  })
  // on right click, add a marker, trigger modal with input, and pass lat and lon of e into post 
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
    
     //make get request to bathroom with click event on marker
      //**** make data display on the right: bathroom and reviews
      // pass in bathroom id
      // *** modal will also include input and post
    el.addEventListener('click', async(e)=> {
    // *** render right hand display
    // will have to pass this data into html on right hand display
     const response = await fetch(`api/bathrooms/${el.id}`)
     const data = await response.json().catch(err=> response.json(err))
     console.log(data)
     
   
     e.stopPropagation()
    })
    /**Create a marker using the div element defined above and add it to the map.**/
    new mapboxgl.Marker(el, { offset: [0, -23] })
    .setLngLat(marker.geometry.coordinates)
    .addTo(map)}
  }

}
map.on('contextmenu', async(e)=> {
    console.log(e.lngLat);
    const { lng, lat } = await e.lngLat;
    const coords = [lng, lat];
    console.log(coords)
    //make a marker  add to the map
    const newel = document.createElement('div');
    newel.className = 'marker';
    new mapboxgl.Marker(newel)
      .setLngLat(coords)
      .addTo(map);

      //*** cant store this permanently and need to display it on map because of terms */
    // const response = await fetch(`https://api.mapbox.com/geocoding/v5/{mapbox.places}/${lng},${lat}/{address}.json`)
    // const address = await response.json()
    // console.log(address)

    // open right hand modal with click, modal will contain input form
        //req.body would be lnglat object
    // ****DOM references for input form (booleans) go in body as well
  //   async function postBathroom(lon, lat){
  //     const response = await fetch('/api/bathrooms/', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //           lon,
  //           lat,
  //       }),
  //       headers: {
  //           'Content-Type': 'application/json'
  //       }
  //     })
  //   }
  //  postBathroom(lng, lat)
  })


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
