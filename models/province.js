'use strict';

module.exports = function(sequelize, DataTypes) {
  var Province = sequelize.define("Province", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Province.belongsTo(models.Country, {
          foreignKey: { allowNull: false }
        });
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
