'use strict';

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
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
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    rockDescription: {
      type: DataTypes.TEXT
    },
    access: {
      type: DataTypes.TEXT
    },
    camping: {
      type: DataTypes.TEXT
    },
    parkingLatitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    parkingLongitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Location.belongsTo(models.Province, {
          foreignKey: { allowNull: false }
        });
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
