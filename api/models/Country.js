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

    provinces: {
      collection: 'Province'
    }

  },

  beforeValidate: function (values, cb) {
    if (!values.name) return cb();
    values.slug = SlugService.sluggifyString(values.name);
    return cb();
  }
};