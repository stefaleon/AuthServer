const User = require("../models/user");

exports.getSignUp = (req, res, next) => {
  res.send({ "response from": "getSignUp" });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
      res.json({ "sign-up-success": `Added user with email ${user.email}` });
    });
  });
};
