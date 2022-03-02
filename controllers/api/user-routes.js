const router = require('express').Router()
const {Review, User, Marker} = require('../../models')
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection')



module.exports = router