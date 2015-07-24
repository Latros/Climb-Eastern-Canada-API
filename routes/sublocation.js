var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.route('/')
  .get(function(req, res) {
    models.Sublocation.findAll({
    include: [ { model: models.Climb, as: 'Climbs' }, { model: models.Photo, as: 'Photos' }, { model: models.Location } ]
  }).then(function(sublocations) {
      res.send(sublocations);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  .post(function(req, res) {
    models.Sublocation.create(req.body).then(function(sublocation) {
      models.Sublocation.findById(sublocation.dataValues.id, {
        include: [ { model: models.Climb, as: 'Climbs' }, { model: models.Photo, as: 'Photos' }, { model: models.Location } ]
      }).then(function(sublocation) {
        res.send(sublocation);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      })
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });


router.route('/:sublocation_id')

  .get(function(req, res) {
    models.Sublocation.findById(req.params.sublocation_id, {
      include: [ { model: models.Climb, as: 'Climbs' }, { model: models.Photo, as: 'Photos' }, { model: models.Location } ]
    }).then(function(sublocation) {
      res.send(sublocation);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  .put(function(req, res) {
    models.Sublocation.update(req.body, {
      where: { id: req.params.sublocation_id }
    }).then(function() {
      models.Sublocation.findById(req.params.sublocation_id, {
        include: [ { model: models.Climb, as: 'Climbs' }, { model: models.Photo, as: 'Photos' }, { model: models.Location } ]
      }).then(function(sublocation) {
        res.send(sublocation);
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
    models.Sublocation.destroy(
      {where: { id: req.params.sublocation_id }
    }).then(function() {
      res.sendStatus(200);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });


module.exports = router;