const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, User, Bathroom } = require('../models');


router.get('/', (req, res) => {
    console.log(req.session)
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
  res.render('login'); 
});

module.exports = router;
