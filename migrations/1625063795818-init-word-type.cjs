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
    id: "d29709c9-f61f-46ae-9b4d-e24b846ee1d9",
    name: "Danh từ (N)",
  },
  {
    id: "80511ad5-4fb5-4e12-ba60-e323a23e2ca8",
    name: "Động từ (V)",
  },
  {
    id: "8d318f59-b78b-4086-ab85-a6a1f33add02",
    name: "Trạng từ (ADV)",
  },
  {
    id: "5300e488-24b7-4e5a-be29-633a32c5df87",
    name: "Tính từ (ADJ)",
  },
  {
    id: "16ad8448-e1cd-43ae-a809-47b9ffab1b6c",
    name: "Cụm danh từ",
  },
  {
    id: "4cba545d-781c-4e91-8d00-c2ba14c39a62",
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
