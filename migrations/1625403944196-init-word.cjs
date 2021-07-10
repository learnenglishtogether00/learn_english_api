"use strict";

const Bluebird = require("bluebird");
const mongodb = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const MongoClient = mongodb.MongoClient;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "learn_english";

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
Bluebird.promisifyAll(MongoClient);

const WORD_DATA = [
  {
    word: "struggle",
    wordTypeId: "80511ad5-4fb5-4e12-ba60-e323a23e2ca8",
    vnWords: ["đấu tranh"],
  },
  {
    word: "stabcd",
    wordTypeId: "80511ad5-4fb5-4e12-ba60-e323a23e2ca8",
    vnWords: ["đấu tranh 1"],
  },
  {
    word: "stabcdef",
    wordTypeId: "80511ad5-4fb5-4e12-ba60-e323a23e2ca8",
    vnWords: ["đấu tranh 2"],
  },
  {
    word: "lack",
    wordTypeId: "80511ad5-4fb5-4e12-ba60-e323a23e2ca8",
    vnWords: ["thiếu"],
  },
  {
    word: "apart from",
    wordTypeId: "4cba545d-781c-4e91-8d00-c2ba14c39a62",
    vnWords: ["ngoại trừ"],
  },
  {
    word: "drug",
    wordTypeId: "d29709c9-f61f-46ae-9b4d-e24b846ee1d9",
    vnWords: ["thuốc"],
  },
  {
    word: "consuming",
    wordTypeId: "d29709c9-f61f-46ae-9b4d-e24b846ee1d9",
    vnWords: ["việc tiêu thụ"],
  },
  {
    word: "exposing",
    wordTypeId: "d29709c9-f61f-46ae-9b4d-e24b846ee1d9",
    vnWords: ["việc tiếp xúc"],
  },
  {
    word: "bulk",
    wordTypeId: "4cba545d-781c-4e91-8d00-c2ba14c39a62",
    vnWords: ["số lượng lớn"],
  },
  {
    word: "assumption",
    wordTypeId: "d29709c9-f61f-46ae-9b4d-e24b846ee1d9",
    vnWords: ["sự đảm đương"],
  },
  {
    word: "obligation",
    wordTypeId: "d29709c9-f61f-46ae-9b4d-e24b846ee1d9",
    vnWords: ["nghĩa vụ"],
  },
  {
    word: "dominant",
    wordTypeId: "5300e488-24b7-4e5a-be29-633a32c5df87",
    vnWords: ["có ưu thế"],
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
      const formatData = WORD_DATA.map((word) => {
        return {
          ...word,
          id: uuidv4(),
        };
      });

      const Word = db.collection("words");
      return Word.insertMany(formatData);
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
      const Word = db.collection("words");
      return Word.deleteMany();
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch((err) => next(err));
};
