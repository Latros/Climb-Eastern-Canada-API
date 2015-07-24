'use strict';

var models  = require('../models');
var express = require('express');
var router  = express.Router();

function findAllClimbs () {
  return models.Climb.findAll({
    include: [{
      model: models.Photo,
      as: 'Photos'
    }, {
      model: models.Sublocation
    }]
  });
}

function createClimb (data) {
  return models.Climb.create(req.body).then(function(climb) {
    return findClimbById(climb.dataValues.id);
  }, errorHandler;
}

function findClimbById (id) {
  return models.Climb.findById(id, {
    include: [{
      model: models.Photo,
      as: 'Photos'
    }, {
      model: models.Sublocation
    }]
  });
}

function updateClimbById (id, data) {
  return models.Climb.update(data, {
    where: { id: id }
  }).then(function() {
    return findClimbById(id);
  }, errorHandler);
}

function deleteClimbById (id) {
  return models.Climb.destroy({
    where: {
      id: id
    }
  });
}

function errorHandler (error) {
  // Parse the error object and send a 400 if we know the error has something
  // to do with the data the user submitted, otherwise send 500 because the
  // error is probably ours :)
  return error.name === 'SequelizeValidationError' ? res.send(400, error) : res.send(500, error);
}

function successHandler (resource) {
  // Send back the resource that was updated/created/retrieved etc etc
  return res.send(200, resource);
}

/* Base level (id-less) routes */
router.route('/')

  .get(function(req, res) {
    findAllClimbs.then(successHandler, errorHandler);
  })

  .post(function(req, res) {
    createClimb(req.body).then(successHandler, errorHandler);
  });


/* Routes Where ID is specified*/
router.route('/:climbId')

  .get(function(req, res) {
    findClimbById(req.params.climbId).then(successHandler, errorHandler);
  })

  .put(function(req, res) {
    updateClimbById(req.body, req.params.climbId).then(successHandler, errorHandler);
  })

  .delete(function(req, res) {
    deleteClimbById(req.params.climbId).then(successHandler, errorHandler);
  });

module.exports = router;