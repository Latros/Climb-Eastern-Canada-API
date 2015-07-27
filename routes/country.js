var models  = require('../models');
var express = require('express');
var router  = express.Router();

function findAllCountries () {
  return models.Country.findAll({
    include: [{
      model: models.Province,
      as: 'Provinces'
    }]
  });
}

function createCountry (data) {
  return models.Country.create(data);
}

function findCountryById (id) {
  return models.Country.findById(id, {
    include: [{
      model: models.Province,
      as: 'Provinces'
    }]
  });
}

function updateCountryById (id, data) {
  return models.Country.update(data, {
    where: { id: id }
  });
}

// TODO: Check if there are any provinces first
function deleteCountryById (id) {
  return models.Country.destroy({
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
    findAllCountries().then(function(countries) {
      successHandler(res, countries);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .post(function(req, res) {
    createCountry(req.body).then(function(country) {
      findCountryById(country.id).then(function(country) {
        successHandler(res, country);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  });

router.route('/:countryId')

  .get(function(req, res) {
    findCountryById(req.params.countryId).then(function(countries) {
      successHandler(res, countries);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .put(function(req, res) {
    updateCountryById(req.params.countryId, req.body).then(function() {
      findCountryById(req.params.countryId).then(function(country) {
        successHandler(res, country);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .delete(function(req, res) {
    deleteCountryById(req.params.countryId).then(function() {
      successHandler(res, null);
    }, function(error) {
      errorHandler(res, error);
    });
  });


module.exports = router;
