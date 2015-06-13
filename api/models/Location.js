module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    views: {
      type: 'integer',
      defaultsTo: 1
    },

    slug: {
      type: 'string',
      index: true,
      unique: true,
      required: true
    },

    overview: {
      type: 'text',
      required: true
    },

    directions: {
      type: 'text',
      required: true
    },

    rock_type: {
      type: 'string',
      required: true
    },

    rock_features: {
      type: 'array',
      required: true
    },

    access: {
      type: 'text',
      required: true
    },

    camping: {
      type: 'text',
      required: true
    },

    sublocations: {
      collection: 'Sublocation'
    },

    climbs: {
      collection: 'Climb'
    },

    pictures: {
      collection: 'Image'
    },

    parking_location_latitude: {
      type: 'string'
    },

    parking_location_longitude: {
      type: 'string'
    }

  },

  beforeValidate: function (values, cb) {
    if (!values.name) return cb();
    values.slug = SlugService.sluggifyString(values.name);
    return cb();
  }
};