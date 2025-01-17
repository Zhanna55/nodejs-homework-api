const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { HttpError } = require('../helpers');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    if (!authorization) {
      throw HttpError(401, 'Not authorized');
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw HttpError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, 'Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
module.exports = authenticate;
