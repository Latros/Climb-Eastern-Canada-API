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

    description: {
      type: 'text',
      required: true
    },

    location: {
      model: 'Location',
      required: true
    },

    climbs: {
      collection: 'Climb'
    },

    pictures: {
      collection: 'Image'
    }

  },

  beforeValidate: function (values, cb) {
    if (!values.name) return cb();
    values.slug = SlugService.sluggifyString(values.name);
    return cb();
  }
};