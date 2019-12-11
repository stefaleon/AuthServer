const express = require("express");
const helmet = require("helmet");

const auth = require("./middleware/auth");

require("./db");

const authRoutes = require("./routes/auth");

const app = express();

app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", auth, (req, res) => res.json({ msg: "This is the Auth API" }));

app.use(authRoutes);

module.exports = app;
