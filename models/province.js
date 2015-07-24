'use strict';

module.exports = function(sequelize, DataTypes) {
  var Province = sequelize.define("Province", {
    name: DataTypes.STRING,
    views: {type: DataTypes.INTEGER, defaultValue: 1},
    slug: {type: DataTypes.STRING, unique: true}
  }, {
    classMethods: {
      associate: function(models) {
        Province.belongsTo(models.Country)
        Province.hasMany(models.Location, {as: 'Locations'});
      }
    },
    hooks: {
      beforeCreate: function(province, options) {
        // province.slug = sluggifyString(province.name);
      }
    }
  });

  return Province;
};