const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    review_text: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    review_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    marker_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'marker',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
