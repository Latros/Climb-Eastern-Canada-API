'use strict';

module.exports = function(sequelize, DataTypes) {
  var Climb = sequelize.define("Climb", {
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
    grade: {
      type: DataTypes.ENUM(
        '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
        '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b', '5.11c', '5.11d',
        '5.12a', '5.12b', '5.12c', '5.12d', '5.13a', '5.13b', '5.13c', '5.13d',
        '5.14a', '5.14b', '5.14c', '5.14d', '5.15a', '5.15b', '5.15c', '5.15d',
        'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12',
        'V13', 'V14', 'V15', 'V16', 'A0', 'A1', 'A2', 'A3'
      ),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    numberOfBolts: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    numberOfPitches: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    isProject: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    style: {
      type: DataTypes.ENUM('Traditional', 'Sport', 'Boulder', 'Aid', 'Mixed'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    protectionRating: {
      type: DataTypes.ENUM('G', 'PG', 'R', 'X'),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    heightInMeters: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    firstAscentBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    firstAscentYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    anchor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        Climb.belongsTo(models.Sublocation, { 
          foreignKey: { allowNull: false }
        });
        Climb.hasMany(models.Photo, {as: 'Photos'});
      }
    },
    hooks: {
      beforeCreate: function(climb, options) {
        // climb.slug = sluggifyString(climb.name);
      }
    }
  });

  return Climb;
};