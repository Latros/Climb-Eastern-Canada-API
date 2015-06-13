var q = require('q');
var createdCountryId;
var createdProvinceId;
var createdLocationId;

module.exports = {
  seedDB: function (req, res) {

    createCountry({
        name: 'Canada'
      })
      .then(function () {
        return createProvince({
          name: 'New Brunswick',
          country: createdCountryId
        });
      })
      .then(function () {
        return createLocation({
          name: 'Sunnyside',
          overview: 'TODO',
          directions: 'TODO',
          rock_type: 'Granite',
          rock_features: 'Slopers',
          access: 'TODO',
          camping: 'TODO',
          province: createdProvinceId
        });
      })
      .then(function () {
        return createSublocation({
          name: 'The Dark Side',
          description: 'TODO',
          location: createdLocationId
        });
      })
      .then(function () {
        return createClimb({
          name: 'Sith',
          grade: '5.11c',
          style: 'Sport',
          description: 'TODO',
          location: createdLocationId
        });
      })
      .then(function (results) {
        console.log('Successfully seeded the DB.');
        return res.send('Successfully seeded the DB.');
      }, function (error) {
        console.log('An error occured attempting to seed the DB: ', error);
      });
  }
};

function createCountry(data) {
  var deferred = q.defer();
  Country.create(data)
    .exec(function (err, results) {
      if (err || !results) deferred.reject(err, results);
      console.log('RESULTS OF COUNTRY SEED:', results, err);
      createdCountryId = results.id;
      deferred.resolve(results);
    });
  return deferred.promise;
}

function createProvince(data) {
  var deferred = q.defer();
  Province.create(data)
    .exec(function (err, results) {
      if (err || !results) deferred.reject(err, results);
      console.log('RESULTS OF PROVINCE SEED:', results, err);
      createdProvinceId = results.id;
      deferred.resolve(results);
    });
  return deferred.promise;
}

function createLocation(data) {
  var deferred = q.defer();
  Location.create(data)
    .exec(function (err, results) {
      if (err || !results) deferred.reject(err, results);
      console.log('RESULTS OF LOCATION SEED:', results, err);
      createdLocationId = results.id;
      deferred.resolve(results);
    });
  return deferred.promise;
}

function createSublocation(data) {
  var deferred = q.defer();
  Sublocation.create(data)
    .exec(function (err, results) {
      if (err || !results) deferred.reject(err, results);
      console.log('RESULTS OF SUBLOCATION SEED:', results, err);
      deferred.resolve(results);
    });
  return deferred.promise;
}

function createClimb(data) {
  var deferred = q.defer();
  Climb.create(data)
    .exec(function (err, results) {
      if (err || !results) deferred.reject(err, results);
      console.log('RESULTS OF CLIMB SEED:', results, err);
      deferred.resolve(results);
    });
  return deferred.promise;
}