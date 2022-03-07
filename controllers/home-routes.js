const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, User, Bathroom } = require('../models');

// may need to get fetch to geojson instead
// non loggedin users homepage gets all markers on the map
// get all bathrooms on map load
router.get('/', (req, res) => {
    console.log(req.session)
    // req.session.destroy(()=>{
    //     res.status(204).end()
    // })
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    })
 })

// redirects loggedin user to homepage
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    console.log('redirecting');
    res.redirect('/');
    return;
  }
  res.render('login'); // how to hide map here????
});

module.exports = router;
