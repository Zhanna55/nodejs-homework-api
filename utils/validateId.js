const mongoose = require('mongoose');
const { HttpError } = require('../helpers');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    next(HttpError(404));
  }
  next();
};

module.exports = validateId;
