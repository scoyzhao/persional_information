"use strict";

/**
 * UploadFileController
 * @description :: Server-side logic for ...
 * NOTE: Not using StorageService, for it saved the file twice.
 */

const path = require('path');
const _ = require('lodash');

module.exports = {

    // upload photo
    upload: function(req, res) {
        var userId = req.user.id;

        var data;

        req.file('photo')
            .upload({
                dirname: path.resolve(__dirname, '../../photo')
            }, function(err, uploadedFiles) {
                if (err) {
                    return res.json(500, err);
                }
                if (!uploadedFiles || uploadedFiles.length <= 0) {
                    return res.badRequest(null, { message: 'No upfiles sent' });
                }

                data = _.map(uploadedFiles, function(file) {
                    var _data = {
                        location: file.fd,
                        // path.basename(file.fd),
                        user: userId
                    };

                    return _data;
                });

                // _.map() return a array...
                UploadFile
                    .create({
                        // filename for get the photo
                        location: data[0].location,
                        user: data[0].user
                    })
                    .then((photo) => {
                        return res.created(photo);
                    })
                    .catch(res.negotiate);
            })
    }
}
