const router = require('express').Router();
const { Review, User, Bathroom} = require('../../models');
const withAuth = require('../../utils/auth.js');
const sequelize = require('../../config/connection');

// get all reviews from loggedin user
router.get('/', withAuth, (req, res) => {
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
      'created_at'
    ],
    include: [
      {
        model:  Bathroom,
      },
      { 
        model: User
      },
    ],
  })
    .then((dbReviewData) => {
      const reviews = dbReviewData.map((review) => review.get({ plain: true }));
      console.log(reviews);
      res.render('reviewspage', { reviews, loggedIn: true });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add a review if loggedin
router.post('/', withAuth, (req, res) => {
  Review.create({
    review_rating: req.body.review_rating,
    review_text: req.body.review_text,
    bathroom_id: req.body.bathroom_id,
    user_id: req.session.user_id
  }).then((dbReviewData) => {
     return Review.findOne({
      where: {
        id: dbReviewData.id,
      },
      attributes: [
        'id',
        'review_rating',
        'review_text',
        'user_id',
        'created_at'
      ],
      include: [
        {
          model: Bathroom,
          attributes: ['id', 'title', 'image_url', 'gendered',
          'unisex',
          'disabled_access',
          'changing_tables',
          'key',
          'menstruation_products'],
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
      res.status(500).json(err)
  })
});

// get one review
router.get('/:id', withAuth, (req, res)=> {
    Review.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: ['id', 'review_text', 'review_rating', 'user_id', 'bathroom_id'],
        include:[{
            model: Bathroom, 
            include: {
                model: User,
                attributes: ['username']
            }
        }, {
            model: User,
            attributes: ['username']
        }]
    }).then(dbReviewData=> {
        if(!dbReviewData){
            res.status(404).json({message: 'Review not found.'})
            return
        }
        res.json(dReviewData)
    }).catch(err=> {
        console.log(err)
        res.status(500).json(err)
    })
})

//delete a review (only from loggedin user)
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
