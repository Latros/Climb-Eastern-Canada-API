var models  = require('../models');
var express = require('express');
var router  = express.Router();

function findAllLocations () {
  return models.Location.findAll({
    include: [{
      model: models.Photo,
      as: 'Photos'
    }, {
      model: models.Sublocation,
      as: 'Sublocations'
    }, {
      model: models.Province
    }]
  });
}

function createLocation (data) {
  return models.Location.create(data);
}

function findLocationById (id) {
  return models.Location.findById(id, {
    include: [{
      model: models.Photo,
      as: 'Photos'
    }, {
      model: models.Sublocation,
      as: 'Sublocations'
    }, {
      model: models.Province
    }]
  });
}

function updateLocationById (id, data) {
  return models.Location.update(data, {
    where: { id: id }
  });
}

// TODO: Check if there are any provinces first
function deleteLocationById (id) {
  return models.Location.destroy({
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

router.route('/')

  .get(function(req, res) {
    findAllLocations().then(function(locations) {
      successHandler(res, locations);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .post(function(req, res) {
    createLocation(req.body).then(function(location) {
      findLocationById(location.id).then(function(location) {
        successHandler(res, location);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  });

router.route('/:locationId')

  .get(function(req, res) {
    findLocationById(req.params.locationId).then(function(locations) {
      successHandler(res, locations);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .put(function(req, res) {
    updateLocationById(req.params.locationId, req.body).then(function() {
      findLocationById(req.params.locationId).then(function(location) {
        successHandler(res, location);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .delete(function(req, res) {
    deleteLocationById(req.params.locationId).then(function() {
      successHandler(res, null);
    }, function(error) {
      errorHandler(res, error);
    });
  });


module.exports = router;
