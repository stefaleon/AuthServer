const jwt = require("jsonwebtoken");

const private = require("../private/private");

const SECRET = process.env.SECRET || private.secret;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    // set the request user as the user identified from the user id included in the token payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
