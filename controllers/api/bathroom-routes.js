const router = require('express').Router();
const { Review, User, Bathroom } = require('../../models');
const withAuth = require('../../utils/auth.js');
const sequelize = require('../../config/connection');
// get all bathrooms on map load
router.get('/', (req, res) => {
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
          attributes: ['review_rating', 'review_text'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: 'username',
        },
      ]
    }).then((dbBathroomData) => {
      res.json(dbBathroomData)
}).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})
//get all reviews on one bathroom
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
          Model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbBathroomData) => {
      if (!dbBathroomData) {
        res
          .sendStatus(404)
          .json({ message: 'No bathroom found with this id.' });
        return;
      }
      res.json(dbBathroomData);
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
    .then(() => {
      Bathroom.findOne({
        where: {
          id: req.body.bathroom_id,
        }, // may need to add attr.
      }).then((dbBathroomData) => {
        res.json(dbBathroomData)
    })
  }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
