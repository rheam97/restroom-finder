

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
    //need to find suitable image url w/o cors error
    // map.loadImage('', (error, image) => {
    // if (error) throw error;
    // // Add the loaded image to the style's sprite with the ID 'kitten'.
    // map.addImage('toilet', image);
    // });
    /* Add the data to your map as a layer */
    // map.addLayer({
    //   id: 'points',
    //   type: 'Marker', // change this to symbol when we figure out image
    //   source: {
    //     type: 'geojson',
    //     data: markers,
    //   } //**** doesnt seem to be recognizing points layer for other purposes */
    //   // layout: {
    //   //   'circle-radius': '5',
    //   //   'circle-color': '#000000'
    //   // }
    // })
    addMarkers()
    // map.on('click', 'points', async (e) => {
    //   console.log(
    //     `A click event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`
    //   );
    //  
    //  
    // });
    // map.on('mouseenter', 'points', () => {
    //   map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'points', () => {
    //   map.getCanvas().style.cursor = '';
    // });
  });
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
    
     // **make get request to bathroom with click event on marker
      //   //display on the right: bathroom and reviews
    //   // pass in bathroom id
    //   // will also include input and post
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
    .addTo(map)}}

}



map.on('contextmenu', async (e) => {
  console.log(e.lngLat);
  const { lng, lat } = await e.lngLat;
  const coords = [lng, lat];
  //make a marker for each feature and add to the map
  // open right hand modal with post
  // fetch post to bathroom
  //req.body would be lnglat object
  // req.body.title would be fetch to 
//https://api.mapbox.com/geocoding/v5/{mapbox.places}/{longitude},{latitude}/{address}.json


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

// need a modal function to be called when points layer is clicked into as well as map layer

getBathrooms();
