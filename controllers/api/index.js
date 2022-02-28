const router = require('express').Router()
const userRoutes = require('./user-routes')
const reviewRoutes = require('./review-routes')
router.use('/users', userRoutes)
router.use('/reviews', reviewRoutes)
const markerRoutes = require('./marker-routes');

router.use('/markers', markerRoutes);

module.exports= router