var Promise = require('bluebird');

module.exports = {
  seedDB: function (req, res) {
    Country.create({
        name: 'Canada'
      })
      .then(function (a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);
        return res.send(200);
      });
  }
};