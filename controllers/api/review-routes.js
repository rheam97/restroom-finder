const router = require('express').Router();
const { Review, User, Marker } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// get all reviews from loggedin user
router.get('/', (req, res) => {
  console.log('**');
  console.log(req.session);
  Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'review_rating',
      'review_text',
      'title',
      'male',
      'female',
      'unisex',
      'disabled_access',
      'changing_tables',
      'key',
      'menstruation_products',
    ],
    include: [
      {
        model: Marker,
        attributes: ['id', 'title', 'lat', 'lon'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbReviewData) => {
      const reviews = dbReviewData.map((review) => review.get({ plain: true }));
      console.log(reviews);
      res.render('', { reviews, loggedIn: true });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add a review if loggedin
router.post('/', withAuth, (req, res) => {
  Review.create({
    title: req.body.title,
    review_rating: req.body.review_rating,
    review_text: req.body.review_text,
    marker_id: req.body.marker_id,
    user_id: req.session.user_id,
    male: req.body.male,
    female: req.body.female,
    unisex: req.body.unisex,
    disabled_access: req.body.disabled_access,
    changing_tables: req.body.changing_tables,
    menstruation_products: req.body.menstruation_products,
    key: req.body.key,
  }).then(() => {
    return Review.findOne({
      where: {
        id: req.body.review_id,
      },
      attributes: [
        'id',
        'review_rating',
        'title',
        'review_text',
        'user_id',
        'male',
        'female',
        'unisex',
        'disabled_access',
        'key',
        'menstruation_products',
        'changing_tables',
      ],
      include: [
        {
          model: Marker,
          attributes: ['id', 'title', 'lat', 'lon'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
            model: User,
            attributes: ['username']
        }
      ]
    }).then(dbReviewData=> res.json(dbReviewData))
  }).catch(err=> {
      console.log(err)
      res.sendStatus(500).json(err)
  })
});

//delete a review (only from loggedin user)**will this delete on the users own reviews?

router.delete('/:id', withAuth, (req, res)=> {
    Review.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    }).then(dbPostData=> {
        if(!dbPostData){
            res.status(404).json({message: 'No review with this id found.'})
            return
        }
        res.json(dbPostData)
    }).catch(err=> {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;
