const router = require('express').Router()
const sequelize = require('../config/connection')
const {Review, User, Marker} = require('../models')


// non loggedin users homepage gets all markers
router.get('/', (req,res)=> {
    console.log(req.session)
    Marker.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                model: Review,
                attributes: ['id', 'title', 'male', 'female', 'unisex', 'disabled_access', 'changing_tables', 'key', 'menstruation_products', 'review_text', 'user_id'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
        
    }).then(dbMarkerData=> {
        const markers = dbMarkerData.map(marker=> marker.get({plain: true}))
        res.render('homepage', {
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