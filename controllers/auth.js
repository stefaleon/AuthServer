const User = require("../models/user");

exports.getSignUp = (req, res, next) => {
  res.send({ "response from": "getSignUp" });
};

exports.postSignUp = (req, res, next) => {
  res.send({ "response from": "postSignUp" });
};
