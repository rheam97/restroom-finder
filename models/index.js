const User = require('./User');
const Review = require('./Review');
const Marker = require('./Marker');

User.hasMany(Review, {
  foreignKey: 'user_id',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Marker, {
  through: Review,
  foreignKey: 'user_id',
});

Marker.belongsToMany(User, {
  through: Review,
  foreignKey: 'marker_id',
});

Marker.hasMany(Review, {
  foreignKey: 'marker_id',
});

Review.belongsTo(Marker, {
  foreignKey: 'marker_id',
});

module.exports = { User, Review, Marker };
