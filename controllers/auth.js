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

exports.postLogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    jwt.sign(
      { userId: user._id },
      SECRET,
      {
        expiresIn: "1h"
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
