const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const private = require("../private/private");

const SECRET = process.env.SECRET || private.secret;

exports.getSignUp = (req, res, next) => {
  res.send({ "response from": "getSignUp" });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "Email and Password are required" });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    bcrypt
      .genSalt(10)
      .then(salt => {
        bcrypt.hash(password, salt).then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword
          });

          user.save(err => {
            if (err) {
              return next(err);
            }

            const token = jwt.sign({ userId: user._id }, SECRET, {
              expiresIn: "1h"
            });

            res.json({ token });
          });
        });
      })
      .catch(err => {
        return next(err);
      });
  });
};
