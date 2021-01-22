/**
 * UpdateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    upload: function (req, res) {

        req.file('avatar').upload({
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }

            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }


            var baseUrl = sails.config.custom.baseUrl;


            var image = await Image.create({
                path: 'temp',
                name: 'totoImage',
                uploader: req.session.userId
            })
                .fetch();

            let url = require('util').format('%s/images/%s', baseUrl, image.id);

            await Image.update(image)
                .set({
                    path: url,
                })
                .fetch();


            // Save the "fd" and the url where the avatar for a user can be accessed
            User.update(req.session.userId, {

                // Generate a unique URL where the avatar can be downloaded.
                avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.session.userId),

                // Grab the first file and use it's `fd` (file descriptor)
                avatarFd: uploadedFiles[0].fd
            })
                .exec(function (err) {
                    if (err) return res.serverError(err);
                    return res.ok();
                });
        });
    },
};

