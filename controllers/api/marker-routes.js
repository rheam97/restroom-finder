const router = require('express').Router()
const {Review, User, Marker} = require('../../models')
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection')

//get all reviews on one marker

//add marker if logged in

// delete marker if loggedin 


module.exports = router