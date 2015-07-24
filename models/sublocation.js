"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sublocation = sequelize.define("Sublocation", {
    name: DataTypes.STRING,
    views: {type: DataTypes.INTEGER, defaultValue: 1},
    slug: {type: DataTypes.STRING, unique: true},
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Sublocation.belongsTo(models.Location)
        Sublocation.hasMany(models.Climb, {as: 'Climbs'});
        Sublocation.hasMany(models.Photo, {as: 'Photos'});
      }
    },
    hooks: {
      beforeCreate: function(sublocation, options) {
        // sublocation.slug = sluggifyString(sublocation.name);
      }
    }
  });

  return Sublocation;
};