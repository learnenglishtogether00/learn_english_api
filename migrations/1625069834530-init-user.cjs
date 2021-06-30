"use strict";
const Bluebird = require("bluebird");
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");
const MongoClient = mongodb.MongoClient;

const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || "27017";
const DB = process.env.DB_NAME || "learn_english";

const url = `mongodb://${HOST}:${PORT}/${DB}`;
Bluebird.promisifyAll(MongoClient);

const USER_DATA = {
  name: "ADMIN",
  username: "admin",
  password: "abc@123",
};

module.exports.up = function (next) {
  let mClient = null;
  return MongoClient.connect(url, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      mClient = client;
      return client.db();
    })
    .then((db) => {
      const User = db.collection("users");

      const newUser = USER_DATA;
      const SALT_ROUND = 10;

      const salt = bcrypt.genSaltSync(SALT_ROUND);
      const hash = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hash;

      return User.insertOne(newUser);
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch((err) => next(err));
};

module.exports.down = function (next) {
  let mClient = null;
  return MongoClient.connect(url, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      mClient = client;
      return client.db();
    })
    .then((db) => {
      const User = db.collection("users");
      return User.deleteMany();
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch((err) => next(err));
};
