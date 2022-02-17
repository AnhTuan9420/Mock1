const passport = require('passport');

const verifyCallback = (req, resolve, reject, roleRights) => async (err, user) => {
  if (err || !user) {
    return reject('Please authenticate !!!');
  }
  req.user = user;
  if (!roleRights || roleRights !== user.role) {
    if (!user.role === 'user') {
      return reject('You must be logged in with User permission to view this page.');
    } else {
      return reject('You must be logged in with Admin permission to view this page.');
    };
  } else {
    resolve();
  }
};

const auth = (roleRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, roleRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
