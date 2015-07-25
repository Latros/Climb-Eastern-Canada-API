'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sublocation = sequelize.define("Sublocation", {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Sublocation.belongsTo(models.Location, {
          foreignKey: { allowNull: false }
        });
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
