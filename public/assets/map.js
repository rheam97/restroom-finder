mapboxgl.accessToken =
"pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg";
const map = new mapboxgl.Map({
container: "map", //Container ID
style: "mapbox://styles/olopez92084/cky6s06631d4p15o1kb7ut2qq", //style URL
center: [-77.03653127987717, 38.89876926362938], // starting position
zoom: 14, // starting zoom
});

const stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.034084142948, 38.909671288923]
      },
      properties: {
        phoneFormatted: "(202) 234-7336",
        phone: "2022347336",
        address: "1471 P St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 15th St NW",
        postalCode: "20005",
        state: "D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.049766, 38.900772]
      },
      properties: {
        phoneFormatted: "(202) 507-8357",
        phone: "2025078357",
        address: "2221 I St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 22nd St NW",
        postalCode: "20037",
        state: "D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.043929, 38.910525]
      },
      properties: {
        phoneFormatted: "(202) 387-9338",
        phone: "2023879338",
        address: "1512 Connecticut Ave NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at Dupont Circle",
        postalCode: "20036",
        state: "D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.0672, 38.90516896]
      },
      properties: {
        phoneFormatted: "(202) 337-9338",
        phone: "2023379338",
        address: "3333 M St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 34th St NW",
        postalCode: "20007",
        state: "D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.002583742142, 38.887041080933]
      },
      properties: {
        phoneFormatted: "(202) 547-9338",
        phone: "2025479338",
        address: "221 Pennsylvania Ave SE",
        city: "Washington DC",
        country: "United States",
        crossStreet: "btwn 2nd & 3rd Sts. SE",
        postalCode: "20003",
        state: "D.C."
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-76.933492720127, 38.99225245786]
      },
      properties: {
        address: "8204 Baltimore Ave",
        city: "College Park",
        country: "United States",
        postalCode: "20740",
        state: "MD"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.097083330154, 38.980979]
      },
      properties: {
        phoneFormatted: "(301) 654-7336",
        phone: "3016547336",
        address: "4831 Bethesda Ave",
        cc: "US",
        city: "Bethesda",
        country: "United States",
        postalCode: "20814",
        state: "MD"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.359425054188, 38.958058116661]
      },
      properties: {
        phoneFormatted: "(571) 203-0082",
        phone: "5712030082",
        address: "11935 Democracy Dr",
        city: "Reston",
        country: "United States",
        crossStreet: "btw Explorer & Library",
        postalCode: "20190",
        state: "VA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.10853099823, 38.880100922392]
      },
      properties: {
        phoneFormatted: "(703) 522-2016",
        phone: "7035222016",
        address: "4075 Wilson Blvd",
        city: "Arlington",
        country: "United States",
        crossStreet: "at N Randolph St.",
        postalCode: "22203",
        state: "VA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-75.28784, 40.008008]
      },
      properties: {
        phoneFormatted: "(610) 642-9400",
        phone: "6106429400",
        address: "68 Coulter Ave",
        city: "Ardmore",
        country: "United States",
        postalCode: "19003",
        state: "PA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-75.20121216774, 39.954030175164]
      },
      properties: {
        phoneFormatted: "(215) 386-1365",
        phone: "2153861365",
        address: "3925 Walnut St",
        city: "Philadelphia",
        country: "United States",
        postalCode: "19104",
        state: "PA"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Marker",
        coordinates: [-77.043959498405, 38.903883387232]
      },
      properties: {
        phoneFormatted: "(202) 331-3355",
        phone: "2023313355",
        address: "1901 L St. NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 19th St",
        postalCode: "20036",
        state: "D.C."
      }
    }
  ]
};

/* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
  store.properties.id = i;
});

map.on('load', () => {
  /* Add the data to your map as a layer */
  map.addLayer({
    id: 'locations',
    type: 'Marker',
    /* Add a GeoJSON source containing place coordinates and information. */
    source: {
      type: 'geojson',
      data: stores
    }
  });
  buildLocationList(stores);
  addMarkers();
});
 
/**
* Add a marker to the map for every store listing.
**/
function addMarkers() {
/* For each feature in the GeoJSON object above: */
for (const marker of stores.features) {
/* Create a div element for the marker. */
const el = document.createElement('div');
/* Assign a unique `id` to the marker. */
el.id = `marker-${marker.properties.id}`;
/* Assign the `marker` class to each marker for styling. */
el.className = 'marker';
 
/**
* Create a marker using the div element
* defined above and add it to the map.
**/
new mapboxgl.Marker(el, { offset: [0, -23] })
.setLngLat(marker.geometry.coordinates)
.addTo(map);
 
/**
* Listen to the element and when it is clicked, do three things:
* 1. Fly to the point
* 2. Close all other popups and display popup for clicked store
* 3. Highlight listing in sidebar (and remove highlight for all other listings)
**/
el.addEventListener('click', (e) => {
/* Fly to the point */
flyToStore(marker);
/* Close all other popups and display popup for clicked store */
createPopUp(marker);
/* Highlight listing in sidebar */
const activeItem = document.getElementsByClassName('active');
e.stopPropagation();
if (activeItem[0]) {
activeItem[0].classList.remove('active');
}
const listing = document.getElementById(
`listing-${marker.properties.id}`
);
listing.classList.add('active');
});
}
}
 
/**
* Add a listing for each store to the sidebar.
**/
function buildLocationList(stores) {
for (const store of stores.features) {
/* Add a new listing section to the sidebar. */
const listings = document.getElementById('listings');
const listing = listings.appendChild(document.createElement('div'));
/* Assign a unique `id` to the listing. */
listing.id = `listing-${store.properties.id}`;
/* Assign the `item` class to each listing for styling. */
listing.className = 'item';
 
/* Add the link to the individual listing created above. */
const link = listing.appendChild(document.createElement('a'));
link.href = '#';
link.className = 'title';
link.id = `link-${store.properties.id}`;
link.innerHTML = `${store.properties.address}`;
 
/* Add details to the individual listing. */
const details = listing.appendChild(document.createElement('div'));
details.innerHTML = `${store.properties.city}`;
// if (store.properties.phone) {
// details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
// }
 
link.addEventListener('click', function () {
for (const feature of stores.features) {
if (this.id === `link-${feature.properties.id}`) {
flyToStore(feature);
createPopUp(feature);
}
}
const activeItem = document.getElementsByClassName('active');
if (activeItem[0]) {
activeItem[0].classList.remove('active');
}
this.parentNode.classList.add('active');
});
}
}
 
/**
* Use Mapbox GL JS's `flyTo` to move the camera smoothly
* a given center point.
**/
function flyToStore(currentFeature) {
map.flyTo({
center: currentFeature.geometry.coordinates,
zoom: 15
});
}
 
/**
* Create a Mapbox GL JS `Popup`.
**/
function createPopUp(currentFeature) {
const popUps = document.getElementsByClassName('mapboxgl-popup');
if (popUps[0]) popUps[0].remove();
const popup = new mapboxgl.Popup({ closeOnClick: true })
.setLngLat(currentFeature.geometry.coordinates)
.setHTML(
`<h3>Bathroom</h3><h4>${currentFeature.properties.address}</h4>`
)
.addTo(map);
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