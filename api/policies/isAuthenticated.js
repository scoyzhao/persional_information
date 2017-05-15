"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', (error, user, info) => {

        // if (info.name === 'TokenExpiredError') info.status = 401;
        // if (info.name === 'JsonWebTokenError') info.status = 401;
        // if (error || !user) return res.negotiate(error || info);
        if (error) return res.serverError(error);

        if (!user) {
            var config = {};
            config.info = info && info.code;
            config.message = info && info.message;
            return res.unauthorized(null, config);
        }

        req.user = user;

        next();
    })(req, res);
};
