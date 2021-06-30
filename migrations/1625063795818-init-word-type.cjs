"use strict";

const Bluebird = require("bluebird");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "learn_english";

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
Bluebird.promisifyAll(MongoClient);

const WORD_TYPE_DATA = [
  {
    name: "Danh từ (N)",
  },
  {
    name: "Động từ (V)",
  },
  {
    name: "Trạng từ (ADV)",
  },
  {
    name: "Tính từ (ADJ)",
  },
  {
    name: "Cụm danh từ",
  },
  {
    name: "Khác",
  },
];

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
      const WordType = db.collection("wordtypes");
      return WordType.insertMany(WORD_TYPE_DATA);
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
      const WordType = db.collection("wordtypes");
      return WordType.deleteMany();
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch((err) => next(err));
};
