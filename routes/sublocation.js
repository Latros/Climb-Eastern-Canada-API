var models  = require('../models');
var express = require('express');
var router  = express.Router();

function findAllSublocations () {
  return models.Sublocation.findAll({
    include: [{
      model: models.Photo,
      as: 'Photos'
    }, {
      model: models.Climb,
      as: 'Climbs'
    }, {
      model: models.Location
    }]
  });
}

function createSublocation (data) {
  return models.Sublocation.create(data);
}

function findSublocationById (id) {
  return models.Sublocation.findById(id, {
    include: [{
      model: models.Photo,
      as: 'Photos'
    }, {
      model: models.Climb,
      as: 'Climbs'
    }, {
      model: models.Location
    }]
  });
}

function updateSublocationById (id, data) {
  return models.Sublocation.update(data, {
    where: { id: id }
  });
}

// TODO: Delete all climbs associated with sublocations??
function deleteSublocationById (id) {
  return models.Sublocation.destroy({
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
    findAllSublocations().then(function(sublocations) {
      successHandler(res, sublocations);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .post(function(req, res) {
    createSublocation(req.body).then(function(sublocation) {
      findSublocationById(sublocation.id).then(function(sublocation) {
        successHandler(res, sublocation);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  });

router.route('/:sublocationId')

  .get(function(req, res) {
    findSublocationById(req.params.sublocationId).then(function(sublocations) {
      successHandler(res, sublocations);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .put(function(req, res) {
    updateSublocationById(req.params.sublocationId, req.body).then(function() {
      findSublocationById(req.params.sublocationId).then(function(sublocation) {
        successHandler(res, sublocation);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .delete(function(req, res) {
    deleteSublocationById(req.params.sublocationId).then(function() {
      successHandler(res, null);
    }, function(error) {
      errorHandler(res, error);
    });
  });

module.exports = router;
