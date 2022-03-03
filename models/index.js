const User = require('./User');
const Review = require('./Review');
const Bathroom = require('./Bathroom');
const Map = require('./Map')

// user has many review
//Review belongs to one User

//Bathroom has many reviews
//Reviews belongs to bathroom

//Map has One bathroom
//Bathroom belongs to map

//User has many Map (or Marker)
//Map belongs to user????


 User.hasMany(Review, {
  foreignKey: 'user_id',
 });

Review.belongsTo(User, {
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
  foreignKey: 'bathroom_id',
});

User.belongsToMany(Bathroom, {
through: Review,
foreignKey: 'user_id'
})

Bathroom.hasMany(Review, {
  foreignKey: 'bathroom_id',
});

Review.belongsTo(Bathroom, {
    foreignKey: 'bathroom_id',
  });

  //not sure
  User.hasMany(Map, {
      foreignKey: 'user_id'
  })

  Map.belongsTo(User, {
      foreignKey: 'user_id'
  })


module.exports = { User, Review, Bathroom, Map };
