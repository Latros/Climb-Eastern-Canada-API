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
  return models.Climb.create(data);
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
  });
}

function deleteClimbById (id) {
  return models.Climb.destroy({
    where: {
      id: id
    }
  });
}

function errorHandler (res, error) {
  // Parse the error object and send a 400 if we know the error has something
  // to do with the data the user submitted, otherwise send 500 because the
  // error is probably ours :)
console.log(error);
  return error && error.name === 'SequelizeValidationError' ? res.status(400).send(error) : res.status(500);
}

function successHandler (res, resource) {
  // Send back the resource that was updated/created/retrieved etc etc
  return resource !== null ? res.status(200).send(resource) : res.sendStatus(200);
}

/* Base level (id-less) routes */
router.route('/')

  .get(function(req, res) {
    findAllClimbs().then(function(climbs) {
      successHandler(res, climbs);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .post(function(req, res) {
    createClimb(req.body).then(function(climb) {
      findClimbById(climb.id).then(function(climb) {
        successHandler(res, climb);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  });

/* Routes Where ID is specified */
router.route('/:climbId')

  .get(function(req, res) {
    findClimbById(req.params.climbId).then(function(climbs) {
      successHandler(res, climbs);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .put(function(req, res) {
    updateClimbById(req.params.climbId, req.body).then(function() {
      findClimbById(req.params.climbId).then(function(climb) {
        successHandler(res, climb);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .delete(function(req, res) {
    deleteClimbById(req.params.climbId).then(function() {
      successHandler(res, null);
    }, function(error) {
      errorHandler(res, error);
    });
  });

module.exports = router;