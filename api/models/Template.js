"use strict";

/**
 * Template
 * @description :: Model for storing Template records
 */

module.exports = {
  schema: true,

  attributes: {
    content: {
    	type: 'string',
    },

    user: {
    	model: 'user',
    	unique: true
    },

    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),
  beforeCreate: (values, next) => next()
};
