"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */

module.exports = {
    me: function(req, res) {
        User
            .findOne({ id: req.user.id })
            .populate('photo')
            .populate('template')
            .then(res.ok)
            .catch(res.serverError);
    },
};
