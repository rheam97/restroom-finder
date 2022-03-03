const User = require('./User');
const Review = require('./Review');
const Bathroom = require('./Bathroom');
const Map = require('./Map')


// user has many review
//Review belongs to one User

//Map has One bathroom
//Bathroom belongs to map

//User has many Map
//Map belongs to user????

//Bathroom has many reviews
//Reviews belongs to bathroom
User.hasMany(Review, {
  foreignKey: 'user_id',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Map, {
  through: Review,
  foreignKey: 'user_id',
});

Map.hasOne(Bathroom, {
foreignKey: 'map_id'
})

Bathroom.belongsTo(Map, {
foreignKey: 'map_id'
})

Bathroom.belongsToMany(User, {
  through: Review,
  foreignKey: 'marker_id',
});

Bathroom.hasMany(Review, {
  foreignKey: 'marker_id',
});

Review.belongsTo(Map, {
  foreignKey: 'marker_id',
});

module.exports = { User, Review, Bathroom, Map };
