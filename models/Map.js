const { Model, DataTypes, NUMBER } = require('sequelize');
const sequelize = require('../config/connection');
const { beforeSave } = require('./User');

class Map extends Model {}

Map.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lat: {
        type: DataTypes.NUMBER,
        allowNull: false
    }, 
    lon: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    location: {
        type: {
            type: String
        },
        formattedAddress: String,
        coordinates: {
            type: {NUMBER}
        }
     
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
    hooks: {
      // node geocoder?? to turn coordinates in adddress
      async beforeSave(newMapData) {       
        let loc = newMapData.location
        const lon = newMapData.lon
        const lat = newMapData.lat
        loc  = await geocoder.reverse({lon, lat});
       this.location = {
          type: 'Point',
          formattedAddress: loc[0].formattedAddress,
          coordinates: {lon, lat}
        };
      
        return newMapData, next()
        // Do not save address
        // this.address = undefined;
      }
    },
    sequelize,
    underscored: true,
    freezeTableName: true,
    timestamps: false,
    modelName: 'map',
  }
);

module.exports = Map