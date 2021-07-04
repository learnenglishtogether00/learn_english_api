import Word from "../models/word.js";
import { successRes, errRes } from "../../utils/server.js";

const createWord = (req, res) => {
  const bodyData = req.body;

  const word = new Word({
    word: bodyData.word,
    desc: bodyData.desc || "",
    wordTypeIds: bodyData.wordTypeIds,
    vnWords: bodyData.vnWords,
    related: bodyData.related,
  });

  return word
    .save()
    .then((newWord) => {
      return successRes({
        res,
        msg: "Tạo từ mới thành công",
        data: newWord,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

const getWords = (req, res) => {
  return Word.find()
    .then((words) => {
      return successRes({
        res,
        msg: "Get words successfully",
        data: words,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

const getWordsByEN = (req, res) => {
  const keyWord = req.params.keyWord;

  return Word.find({ word: { $regex: keyWord, $options: "i" } })
    .then((word) => {
      return successRes({
        res,
        msg: "Get words successfully",
        data: word,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

const getWordByWordId = (req, res) => {
  const wordId = req.params.wordId;

  console.log({ wordId });

  return Word.findOne({ id: wordId })
    .then((word) => {
      return successRes({
        res,
        msg: "Get word successfully",
        data: word,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

const getWordsByVN = (req, res) => {
  const keyWord = req.params.keyWord;

  return Word.find({
    vnWords: {
      $elemMatch: { $regex: keyWord, $options: "i" },
    },
  })
    .then((word) => {
      return successRes({
        res,
        msg: "Get words successfully",
        data: word,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

export { createWord, getWords, getWordsByEN, getWordByWordId, getWordsByVN };
