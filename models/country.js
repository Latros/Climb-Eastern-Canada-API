'use strict';

module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define("Country", {
    name: DataTypes.STRING,
    views: {type: DataTypes.INTEGER, defaultValue: 1},
    slug: {type: DataTypes.STRING, unique: true}
  }, {
    classMethods: {
      associate: function(models) {
        Country.hasMany(models.Province, {
          as: 'Provinces',
          foreignKey: { allowNull: false },
          onDelete: 'CASCADE'
        });
      }
    },
    hooks: {
      beforeCreate: function(country, options) {
        // country.slug = sluggifyString(country.name);
      }
    }
  });

  return Country;
};
