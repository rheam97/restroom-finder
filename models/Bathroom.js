const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bathroom extends Model {}

Bathroom.init(
  {
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
    lat: {
      type: DataTypes.DECIMAL(19, 16),
      allowNull: false,
    },
    lon: {
      type: DataTypes.DECIMAL(19, 16),
      allowNull: false,
    },

    // isUrl and allowNull crash each other
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gendered: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unisex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disabled_access: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    changing_tables: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menstruation_products: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'bathroom',
  }
);

module.exports = Bathroom;
