// login
//signup
//logout
// get user reviews
// add review
// const router = require('express').Router()
// const sequelize = require('../config/connection')
// const {Review, User, Marker} = require('../models')

// login post user
async function loginFormHandler(event){
    event.preventDefault()
    const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if(email && password){
      const response = await fetch('/api/users/login', {
          method: 'POST', 
          body: JSON.stringify({
              email, password
          }),
          headers: {'Content-Type': 'application/json'}
      })

 if(response.ok){
    response.text().then(data => {
       console.log(data)});
    document.location.replace('/dashboard')
      }else {
          alert(response.statusText)
     }
 }
}

//sign up post user
async function signupFormHandler(event){
event.preventDefault()

const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
if(username && email && password){
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username, email, password
        }),
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok) {
        document.location.replace('/dashboard/');
    }
    else {
        alert(response.statusText)
    }
}
}
// add review post review
async function newReviewHandler(event){
    event.preventDefault()
                            ////change these dom references
    const review_rating = document.getElementById('rating').value
    const review_text = document.querySelector('input[name="review-text"]').value

    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
            review_rating,
            review_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){ // not sure about this location
        document.location.replace('/reviews') // go to user reviews
        output(review_rating)
    }else {
        alert(response.statusText)
    }
}

// render rating output
function output(rating){
    // render the rating in the specified dom element, update dom element
    document.getElementById('output').innerHTML = rating
    console.log(rating)
}

// logout post users
async function logout(){

    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
        document.location.replace('/')
    }else{
        alert(response.statusText)
    }
}

//*** do we need to import imports in controllers in order to access user session? */
async function userReviewHandler(event){
    event.preventDefault()
    //DOM references
    let user_id = req.session.user_id
    const response = await fetch('/api/reviews', {
        method: 'GET',
        body: JSON.stringify({
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){ // not sure about this location
        document.location.replace('/reviews') // go to user reviews
    }else {
        alert(response.statusText)
    }
}


// add dom refrence and listener for get user reviews
// ***change selector for post form
// document.querySelector('.new-post-form').addEventListener('submit', newReviewHandler)
// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)
// document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// document.querySelector('#logout').addEventListener('click', logout)
