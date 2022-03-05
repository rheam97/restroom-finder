const router = require('express').Router()
const sequelize = require('../config/connection')
const {Review, User, Bathroom} = require('../models')

// may need to get fetch to geojson instead
// non loggedin users homepage gets all markers on the map
// get all bathrooms on map load
router.get('/', (req, res) => {
    console.log('**success')
      Bathroom.findAll({
        attributes: [
          'id',
          'title',
          'image_url',
          'lat',
          'lon',
          'gendered',
          'unisex',
          'disabled_access',
          'changing_tables',
          'key',
          'menstruation_products',
        ],
        include: [
          {
            model: Review,
            include: {
              model: User
            }
          },
          {
            model: User
          },
        ]
      }).then((dbBathroomData) => {
        res.json(dbBathroomData)
  }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  })
  
// redirects loggedin user to homepage
router.get('/login', (req, res)=> {
    if(req.session.loggedIn){
        console.log('redirecting')
        res.redirect('/');
        return
    }
    res.render('login')
})

module.exports = router