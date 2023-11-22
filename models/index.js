const User = require('./User');
const Review = require('./Review');
const Bathroom = require('./Bathroom');


// user has many review
//Review belongs to one User

//Bathroom has many reviews
//Reviews belongs to bathroom

//Map has One bathroom
//Bathroom belongs to map

//User has many Map (or Marker)
//Map belongs to user????


//  User.hasMany(Review);

// Review.belongsTo(User, {

// });


// Bathroom.belongsToMany(User, {
//   through: Review,

// });

// User.belongsToMany(Bathroom, {
// through: Review,

// })

// Bathroom.hasMany(Review);

// Review.belongsTo(Bathroom, {

//   });


module.exports = { User, Review, Bathroom};
