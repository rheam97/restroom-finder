const router = require('express').Router()
const userRoutes = require('./user-routes')
const reviewRoutes = require('./review-routes')
router.use('/users', userRoutes)
router.use('/reviews', reviewRoutes)
const bathroomRoutes = require('./bathroom-routes');

router.use('/markers', bathroomRoutes);

module.exports= router