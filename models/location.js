'use strict';

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    name: DataTypes.STRING,
    views: {type: DataTypes.INTEGER, defaultValue: 1},
    slug: {type: DataTypes.STRING, unique: true},
    overview: DataTypes.TEXT,
    directions: DataTypes.TEXT,
    rockDescription: DataTypes.TEXT,
    access: DataTypes.TEXT,
    camping: DataTypes.TEXT,
    parkingLatitude: DataTypes.STRING,
    parkingLongitude: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Location.belongsTo(models.Province)
        Location.hasMany(models.Sublocation, {as: 'Sublocations'});
        Location.hasMany(models.Photo, {as: 'Photos'});
      }
    },
    hooks: {
      beforeCreate: function(location, options) {
        // location.slug = sluggifyString(location.name);
      }
    }
  });

  return Location;
};