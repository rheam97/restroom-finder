const router = require('express').Router();
const { Review, User, Bathroom } = require('../../models');
const withAuth = require('../../utils/auth.js');
const sequelize = require('../../config/connection');
// get all bathrooms on map load
router.get('/', (req, res) => {
  // console.log('**success')
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

//get all reviews on one bathroom // add withauth later
router.get('/:id', withAuth, (req, res) => {
  Bathroom.findOne({
    where: {
      id: req.params.id,
    },
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
        },
      },
      {
        model: User
      },
    ],
  })
    .then((dbBathroomData) => {
      if (!dbBathroomData) {
        res.sendStatus(404).json({ message: 'No bathroom found with this id.' });
        return;
      }
      res.json(dbBathroomData); ///render sidebar.handlebars
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// //add marker if logged in
router.post('/', withAuth, (req, res) => {
  Bathroom.create({
    title: req.body.title,
    user_id: req.session.user_id,
    gendered: req.body.gendered,
    lat: req.body.lat,
    lon: req.body.lon,
    unisex: req.body.unisex,
    disabled_access: req.body.disabled_access,
    changing_tables: req.body.changing_tables,
    key: req.body.key,
    menstruation_products: req.body.menstruation_products,
  })
    .then((dbBathroomData) => {
      return Bathroom.findOne({
        where: {
          id: dbBathroomData.id,
        }, // may need to add attr.
      }).then((dbBathroomData) => {
        console.log(dbBathroomData)
        res.json(dbBathroomData)
      
    })
  }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
