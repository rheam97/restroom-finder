const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Review extends Model {}

Review.init({})





module.exports = Review