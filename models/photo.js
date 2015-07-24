"use strict";

module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    name: DataTypes.STRING,
    views: {type: DataTypes.INTEGER, defaultValue: 1},
    slug: {type: DataTypes.STRING, unique: true},
    file: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(photo, options) {
        // photo.slug = sluggifyString(photo.name);
      }
    }
  });

  return Photo;
};