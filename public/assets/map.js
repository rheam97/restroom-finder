//DOM references in homepage
let reviewDisplay = document.querySelector('.output-input');
let createBathroom = document.getElementById('postBathroom')

//map access token
mapboxgl.accessToken =
  'pk.eyJ1Ijoib2xvcGV6OTIwODQiLCJhIjoiY2t5NnI2MDlqMG42ZTJvcWkybGtobW92ZyJ9.07gsbcPupXhcC_7Wf4_BGg';
const map = new mapboxgl.Map({
  container: 'map', //Container ID
  style: 'mapbox://styles/mapbox/streets-v11', //style URL
  center: [-77.0365, 38.8977], // starting position
  zoom: 11, // starting zoom
});

async function getBathrooms() {
  // may need to pass in window.location here instead
  //because this is on home page and home page fetches all bathrooms
  const response = await fetch('/api/bathrooms');
  const data = await response.json();
console.log(data)
  

  const bathrooms = data.map((bathroom) => {
    console.log(bathroom.id, bathroom.lon, bathroom.lat)
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
  // console.log(bathrooms);
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
    addMarkers();
  });

  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    for (const marker of markers.features) {
      console.log(`these are the marker features ${JSON.stringify(marker)}`);
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
      el.addEventListener('click', async (e) => {
        // *** render right hand display
        e.stopPropagation();
        // will have to pass this data into html on right hand display
        const response = await fetch(`/api/bathrooms/${el.id}`);
        const data = await response.json().catch((err) => response.json(err));
        console.log(data)
        console.log(response)

        bathroomDisplay(data);
      });
      /**Create a marker using the div element defined above and add it to the map.**/
      new mapboxgl.Marker(el, { offset: [0, 0] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    }
  }
}

function bathroomDisplay(data) {
  console.log(data)
  if ((reviewDisplay.style.display = 'none')) {
    reviewDisplay.style.display = 'block';
  }
  reviewDisplay.innerHTML = '';
  let bathroomDiv = document.createElement('div');
  let addReviewDiv = document.createElement('div');
  let reviewsDiv = document.createElement('div');
  reviewDisplay.appendChild(bathroomDiv);

  let title = document.createElement('h2');
  title.classList.add('restroom-name');
  title.textContent = data.title;
  bathroomDiv.appendChild(title);

  let image = document.createElement('img');
  image.setAttribute('src', `${data.image_url}`);
  if (data.image_url !== null) {
    bathroomDiv.appendChild(image);
  }

  let pictogram = document.createElement('div');
  pictogram.classList.add('pictogram');
  bathroomDiv.appendChild(pictogram);
  // need avg rating function

  if (data.changing_tables === 'changingTables') {
    let baby_icon = document.createElement('img');
    baby_icon.setAttribute('src', '/assets/images/changing_tables.png');
    baby_icon.classList = 'pictogram';
    pictogram.appendChild(baby_icon);
  }
  if (data.gendered === 'gendered') {
    let gendered_icon = document.createElement('img');
    gendered_icon.setAttribute('src', '/assets/images/gendered.png');
    gendered_icon.classList = 'pictogram';
    pictogram.appendChild(gendered_icon);
  }
  if (data.unisex === 'unisex') {
    let unisex_icon = document.createElement('img');
    unisex_icon.setAttribute('src', '/assets/images/unisex.png');
    unisex_icon.classList = 'pictogram';
    pictogram.appendChild(unisex_icon);
  }
  if (data.key === 'key') {
    let key_icon = document.createElement('img');
    key_icon.setAttribute('src', '/assets/images/key.png');
    key_icon.classList = 'pictogram';
    pictogram.appendChild(key_icon);
  }
  if (data.menstruation_products === 'period') {
    let menstruation_products_icon = document.createElement('img');
    menstruation_products_icon.setAttribute('src', '/assets/images/menstruation_products.png');
    menstruation_products_icon.classList = 'pictogram';
    pictogram.appendChild(menstruation_products_icon);
  }
  if ((data.disabled_access === 'disabled')) {
    let disabled_access_icon = document.createElement('img');
    disabled_access_icon.setAttribute(
      'src',
      '/assets/images/disabled_access.png'
    );
    disabled_access_icon.classList = 'pictogram';
    pictogram.appendChild(disabled_access_icon);
  }



  reviewDisplay.appendChild(addReviewDiv);

  let formDiv = document.createElement('form');
  formDiv.classList.add("rating")

  let labelReview = document.createElement('label');
  labelReview.setAttribute('for', 'review-rating');
  labelReview.textContent = 'Rating: ';

  let inputReview = document.createElement('input');
  inputReview.setAttribute('name', 'review-rating');
  inputReview.setAttribute('type', 'number');
  inputReview.setAttribute('id', 'rating');
  inputReview.setAttribute('min', 1);
  inputReview.setAttribute('max', 5);

  let labelReviewText = document.createElement('label');
  labelReviewText.setAttribute('for', 'review-text');
  labelReviewText.textContent = 'Comment: ';
  let inputReviewText = document.createElement('textarea');
  inputReviewText.setAttribute('name', 'review-text');
  inputReviewText.setAttribute('rows', '1');
  inputReviewText.setAttribute('id', 'text');

  let reviewSubmit = document.createElement('button');
  reviewSubmit.setAttribute('type', 'submit');
  reviewSubmit.setAttribute('class', 'button');
  reviewSubmit.setAttribute('id', 'reviewSubmit');
  reviewSubmit.textContent = 'Submit'

  // reviewSubmit.addEventListener('submit', newReviewHandler(inputReview, inputReviewText, data.id, event))
  document.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.id === 'reviewSubmit') {
      console.log(data.id)
      newReviewHandler(inputReview, inputReviewText, data.id);
    }
  });
  formDiv.appendChild(labelReview);
  formDiv.appendChild(inputReview);
  formDiv.appendChild(labelReviewText);
  formDiv.appendChild(inputReviewText);
  formDiv.appendChild(reviewSubmit);
  addReviewDiv.appendChild(formDiv);

  reviewDisplay.appendChild(reviewsDiv);
  for (i = 0; i < data.reviews.length; i++) {

    let username = document.createElement('h4');
    username.textContent = data.reviews[i].user.username;

    let reviewText = document.createElement('p');
    reviewText.textContent = data.reviews[i].review_text;

    let rating = document.createElement('p');
    rating.textContent = `${data.reviews[i].review_rating}/5`;

    reviewsDiv.style.overflow = 'auto';
    reviewsDiv.appendChild(username);
    reviewsDiv.appendChild(reviewText);
    reviewsDiv.appendChild(rating);
  }
}
// add review post review**** need help with this because its not reading elements because they dont exist
async function newReviewHandler(review, text, bathroom_id) {
  ////change these dom references
  const review_rating = review.value;
  const review_text = text.value;

  const response = await fetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({
      review_rating,
      review_text,
      bathroom_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    // not sure about this location
    document.location.replace('/api/reviews'); // go to user reviews
  } else {
    alert(response.statusText);
  }
}

// on right click, add a marker, trigger modal with input, and pass lat and lon of e into post
map.on('contextmenu', async (e) => {
  console.log(e.lngLat);
  const { lng, lat } = await e.lngLat;
  const coords = [lng, lat];
  console.log(coords);

    // define function to open modal
  function openModal($el) {
    $el.classList.add('is-active');
  }
    // define function to close modal
  function closeModal($el) {
    $el.classList.remove('is-active');
  }
    // elements that have an id of 'map' will be a trigger of the event
  (document.querySelectorAll('#map') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    openModal($target);
  });

    //elements that contain following classes will be closed
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

    //select 'create' button of the modal
  const postingBtn = document.getElementById('postBathroom')

    // A marker will be created when the user click 'create' button
  postingBtn.addEventListener('click', function(e){
    const newel = document.createElement('div');
    newel.className = 'marker';
    new mapboxgl.Marker(newel).setLngLat(coords).addTo(map);  
      postBathroom(lng, lat)
  })

});

async function postBathroom(lon, lat) {
  const title =  document.getElementById('bathroom-title').value
  const image_url = document.getElementById('image-url').value

  const gendered = document.getElementById('gendered').value
  const unisex = document.getElementById('unisex').value
  const disabled_access = document.getElementById('disabled').value
  const menstruation_products= document.getElementById('period').value
  const changing_tables= document.getElementById('baby').value
  const key = document.getElementById('key').value

  // console.log(gendered)
  // console.log(unisex)
  // console.log(disabled_access)
  // console.log(menstruation_products)
  // console.log(changing_tables)
  // console.log(key)

  const response = await fetch('/api/bathrooms/', {
    method: 'POST',
    body: JSON.stringify({
      title,
      image_url,
      gendered,
      unisex,
      disabled_access,
      menstruation_products,
      changing_tables,
      key,
      lon,
      lat
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/');
    // console.log(response)
  } else {
    alert(response.statusText);
  }
}
//"lat":"38.9266161231845440","lon":"-76.9630289306640100"
//76.96302893066401, 38.926883211081815
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

