const router = require('express').Router();
const { Review, User, Marker } = require('../../models');
const sequelize = require('../../config/connection');

// seed database
// review.findOne
//console log on cmd line
// node file path