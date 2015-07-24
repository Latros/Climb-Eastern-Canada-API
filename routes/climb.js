var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.route('/')
  .get(function(req, res) {
    models.Climb.findAll({
    include: [ { model: models.Photo, as: 'Photos' }, { model: models.Sublocation } ]
  }).then(function(climbs) {
      res.send(climbs);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
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


router.route('/:climb_id')

  .get(function(req, res) {
    models.Climb.findById(req.params.climb_id, {
      include: [ { model: models.Photo, as: 'Photos' }, { model: models.Sublocation } ]
    }).then(function(climb) {
      res.send(climb);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  .put(function(req, res) {
    models.Climb.update(req.body, {
      where: { id: req.params.climb_id }
    }).then(function() {
      models.Climb.findById(req.params.climb_id, {
        include: [ { model: models.Photo, as: 'Photos' }, { model: models.Sublocation } ]
      }).then(function(climb) {
        res.send(climb);
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
    models.Climb.destroy(
      {where: { id: req.params.climb_id }
    }).then(function() {
      res.sendStatus(200);
    }, function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  });


module.exports = router;