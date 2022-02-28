const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Marker extends Model {}

Marker.init({})

module.exports = Marker