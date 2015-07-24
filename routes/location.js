var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.route('/')
  .get(function(req, res) {
    models.Location.findAll({
    include: [ { model: models.Sublocation, as: 'Sublocations' }, { model: models.Photo, as: 'Photos' }, { model: models.Province } ]
  }).then(function(locations) {
      res.send(locations);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  .post(function(req, res) {
    models.Location.create(req.body).then(function(location) {
      models.Location.findById(location.dataValues.id, {
        include: [ { model: models.Sublocation, as: 'Sublocations' }, { model: models.Photo, as: 'Photos' }, { model: models.Province } ]
      }).then(function(location) {
        res.send(location);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      })
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });


router.route('/:location_id')

  .get(function(req, res) {
    models.Location.findById(req.params.location_id, {
      include: [ { model: models.Sublocation, as: 'Sublocations' }, { model: models.Photo, as: 'Photos' }, { model: models.Province } ]
    }).then(function(location) {
      res.send(location);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  .put(function(req, res) {
    models.Location.update(req.body, {
      where: { id: req.params.location_id }
    }).then(function() {
      models.Location.findById(req.params.location_id, {
        include: [ { model: models.Sublocation, as: 'Sublocations' }, { model: models.Photo, as: 'Photos' }, { model: models.Province } ]
      }).then(function(location) {
        res.send(location);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      })
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  .delete(function(req, res) {
    models.Location.destroy(
      {where: { id: req.params.location_id }
    }).then(function() {
      res.sendStatus(200);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });


module.exports = router;