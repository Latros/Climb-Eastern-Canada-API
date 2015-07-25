var models  = require('../models');
var express = require('express');
var router  = express.Router();

function findAllProvinces () {
  return models.Province.findAll({
    include: [{
      model: models.Location,
      as: 'Locations'
    }, {
      model: models.Country
    }]
  });
}

function createProvince (data) {
  return models.Province.create(data);
}

function findProvinceById (id) {
  return models.Province.findById(id, {
    include: [{
      model: models.Location,
      as: 'Locations'
    }, {
      model: models.Country
    }]
  });
}

function updateProvinceById (id, data) {
  return models.Province.update(data, {
    where: { id: id }
  });
}

// TODO: Delete all climbs associated with sublocations??
function deleteProvinceById (id) {
  return models.Province.destroy({
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
    findAllProvinces().then(function(provinces) {
      successHandler(res, provinces);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .post(function(req, res) {
    createProvince(req.body).then(function(province) {
      findProvinceById(province.id).then(function(province) {
        successHandler(res, province);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  });

router.route('/:provinceId')

  .get(function(req, res) {
    findProvinceById(req.params.provinceId).then(function(provinces) {
      successHandler(res, provinces);
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .put(function(req, res) {
    updateProvinceById(req.params.provinceId, req.body).then(function() {
      findProvinceById(req.params.provinceId).then(function(province) {
        successHandler(res, province);
      }, function(error) {
        errorHandler(res, error);
      });
    }, function(error) {
      errorHandler(res, error);
    });
  })

  .delete(function(req, res) {
    deleteProvinceById(req.params.provinceId).then(function() {
      successHandler(res, null);
    }, function(error) {
      errorHandler(res, error);
    });
  });


module.exports = router;
