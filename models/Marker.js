const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Marker extends Model {}

Marker.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              isUrl: true
          }
      },
      lat: {
          type: DataTypes.DECIMAL,
          allowNull: false
      },
      lon: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      gendered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      unisex: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      disabled_access: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      key: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      changing_tables: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      menstruation_products: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      }
    },
      {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
      }
)

module.exports = Marker