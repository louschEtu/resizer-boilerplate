/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */





const passport = require('passport');

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    // passport.authenticate('local', function (err, user, info) {
    //   if ((err) || (!user)) {
    //     return res.send({
    //       message: info.message,
    //       user
    //     });
    //   }
    //   req.logIn(user, function (err) {
    //     if (err) res.send(err);
    //     return res.send({
    //       message: info.message,
    //       user
    //     });
    //   });
    // })(req, res);
    passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" })(req, res);
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    User.signup({
      username: req.param('username'),
      password: req.param('password'),
      passwordConfirm: req.param('password_confirm')
    }, (err) => {
      if (err) {
        return res.negotiate(err);
      }
      return res.redirect('/login');
    });
  },

  /**
   * `UserController.toto()`
   */
  toto: async function (req, res) {
    return 'toto';
  }
};

