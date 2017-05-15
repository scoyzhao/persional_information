"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
    schema: true,

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
            alphanumericdashed: true
        },

        password: {
            type: 'string',
            required: true
        },

        email: {
            type: 'email',
            required: true,
            unique: true
        },

        firstname: {
            type: 'string',
            defaultTo: ''
        },

        lastname: {
            type: 'string',
            defaultTo: ''
        },

        intro: {
            type: 'string'
        },

        work: {
            type: 'string'
        },

        education: {
            type: 'string'
        },

        tags: {
            type: 'array'
        },

        weibo: {
            type: 'string'
        },

        weixin: {
            type: 'string'
        },

        qq: {
            type: 'string'
        },

        // TODO
        photo: {
            collection: 'UploadFile',
            via: 'user'
        },

        // TODO
        template: {
            collection: 'Template',
            via: 'user'
        },

        seetings: {
            type: 'json'
        },

        page: {
            type: 'string'
        },

        toJSON() {
            let obj = this.toObject();

            delete obj.password;

            return obj;
        }
    },

    beforeUpdate(values, next) {
        if (false === values.hasOwnProperty('password')) return next();
        if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

        return HashService.bcrypt.hash(values.password)
            .then(hash => {
                values.password = hash;
                next();
            })
            .catch(next);
    },

    beforeCreate(values, next) {
        if (false === values.hasOwnProperty('password')) return next();

        return HashService.bcrypt.hash(values.password)
            .then(hash => {
                values.password = hash;
                next();
            })
            .catch(next);
    }
};
