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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
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
