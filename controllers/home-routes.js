const router = require('express').Router()
const sequelize = require('../config/connection')
const {Review, User, Bathroom} = require('../models')


// non loggedin users homepage gets all markers on the map
router.get('/', (req,res)=> {
    console.log(req.session)
    Bathroom.findAll({
        attributes: ['id', 'title', 'lat', 'lon', 'gendered',
        'unisex',
        'disabled_access',
        'changing_tables',
        'key',
        'menstruation_products'],
        include: [
            {
                model: Review,
                attributes: ['id', 'review_rating'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
        
    }).then(dbMarkerData=> {
        const markers = dbMarkerData.map(marker=> marker.get({plain: true}))
        res.render('', {
            markers,
            loggedIn: req.session.loggedIn})
    }).catch(err=> {
        console.log(err)
        res.status(500).json(err)
    })
   
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