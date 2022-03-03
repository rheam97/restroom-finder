const router = require('express').Router();
const { Review, User, Bathroom } = require('../../models');
const withAuth = require('../../utils/auth.js');
const sequelize = require('../../config/connection');

//get all reviews on one marker
router.get('/:id', withAuth, (req, res) => {
  Marker.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'image_url', 'lat', 'lon', 'gendered',
    'unisex',
    'disabled_access',
    'changing_tables',
    'key',
    'menstruation_products'],
    include: [
      {
        model: Review,
        attributes: [
          'id',
          'review_rating',
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
          res.sendStatus(404).json({message: 'No marker found with this id.'})
          return
      }
      res.json(dbMarkerData)
  }).catch(err=> {
    console.log(err)
    res.status(500).json(err)
})
});

//add marker if logged in
router.post('/', withAuth, (req, res)=> {
    Marker.create({
        title: req.body.title,
        lat: req.body.lat,
        lon: req.body.lon,
        user_id: req.session.user_id,
        gendered: req.body.gendered,
        unisex: req.body.unisex,
        disabled_access: req.body.disabled_access,
        changing_tables: req.body.changing_tables,
        key: req.body.key,
        menstruation_products: req.body.menstruation_products
    }).then(()=> {
        Marker.findOne({
            where: {
                id: req.body.marker_id
            } // may need to add attr.
        }).then(dbMarkerData=> {
            res.json(dbMarkerData)
        })
     }).catch(err=>{
         console.log(err)
         res.status(500).json(err)
    })
})


module.exports = router;
