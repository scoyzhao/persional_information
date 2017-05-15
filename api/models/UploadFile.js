"use strict";

/**
 * UploadFile
 * @description :: Model for storing UploadFile records
 */

module.exports = {
  schema: true,
  //autoPK: false,

  attributes: {
    location: {
      type: 'string',
      required: true
    },

    user: {
    	model: 'user',
    	//unique: true
    },

    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),
  beforeCreate: (values, next) => next()
};
