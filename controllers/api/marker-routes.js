const router = require('express').Router();
const { Review, User, Marker } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//get all reviews on one marker

router.get('/:id', withAuth, (req, res) => {
  Marker.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'lat', 'lon'],
    include: [
      {
        model: Review,
        attributes: [
          'id',
          'review_rating',
          'title',
          'male',
          'female',
          'unisex',
          'disabled_access',
          'changing_tables',
          'key',
          'menstruation_products',
          'review_text',
        ],
        include: {
            Model: User,
            attributes: ['username'],
          }
        },
          {
            model: User,
            attributes: ['username'],
          },
        ],
  }).then(dbMarkerData=> {
      if(!dbMarkerData){
          res.sendStatus(404).json({message: 'no marker found with this id.'})
          return
      }
      res.json(dbMarkerData)
  }).catch(err=> {
    console.log(err)
    res.status(500).json(err)
})
});

//add marker if logged in, *** do i add user_id?
router.post('/', withAuth, (req, res)=> {
    Marker.create({
        title: req.body.title,
        lat: req.body.lat,
        lon: req.body.lon,
        user_id: req.session.user_id
    }).then(()=> {
        Marker.findOne({
            where: {
                id: req.body.marker_id
            },
            attributes: ['id', 'title', 'lat', 'lon']
        }).then(dbMarkerData=> {
            res.json(dbMarkerData)
        })
     }).catch(err=>{
         console.log(err)
         res.status(500).json(err)
    })
})


module.exports = router;
