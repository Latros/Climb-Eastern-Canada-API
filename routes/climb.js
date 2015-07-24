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
  return models.Climb.create(data).then(function(climb) {
    return findClimbById(climb.dataValues.id);
  }, errorHandler);
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

function errorHandler (res, error) {
  // Parse the error object and send a 400 if we know the error has something
  // to do with the data the user submitted, otherwise send 500 because the
  // error is probably ours :)
console.log(error);
  return error && error.name === 'SequelizeValidationError' ? res.status(400).send(error) : res.status(500);
}

function successHandler (res, resource) {
  // Send back the resource that was updated/created/retrieved etc etc
  return res.status(200).send(resource);
}

/* Base level (id-less) routes */
router.route('/')

  .get(function(req, res) {
    findAllClimbs().then(function(climbs) {
      successHandler(res, climbs);
    }, function(error) {
      errorHandler(res, error);
    })
  })

  .post(function(req, res) {
    models.Climb.create(req.body).then(function(climb) {
      models.Climb.findById(climb.dataValues.id, {
        include: [ { model: models.Photo, as: 'Photos' }, { model: models.Sublocation } ]
      }).then(function(climb) {
        res.send(climb);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      })
    }, function(err) {
      console.log(err);
      res.send(400, err);
    });
  });

  // .post(function(req, res) {
  //   createClimb(req.body).then(function(climb) {
  //     successHandler(res, climb);
  //   }, function(error) {
  //     console.log(arguments);
  //     errorHandler(res, error);
  //   })
  // });


/* Routes Where ID is specified */
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