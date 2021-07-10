import Word from "../models/word.js";
import WordType from "../models/wordType.js";
import { successRes, errRes } from "../../utils/server.js";

const createWord = (req, res) => {
  const bodyData = req.body;

  const word = new Word({
    word: bodyData.word,
    desc: bodyData.desc || "",
    wordTypeId: bodyData.wordTypeId,
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

const getWordsByEN = async (req, res) => {
  const keyWord = req.params.keyWord;

  const words = await Word.find({
    word: { $regex: keyWord, $options: "i" },
  }).lean();

  if (!words) {
    return errRes({
      res,
      err: {
        message: "Get Words By En Failed",
      },
    });
  }

  let data = [];

  for (const word of words) {
    const wordType = await WordType.findOne({ id: word.wordTypeId });
    data.push({
      ...word,
      wordType,
    });
  }

  return successRes({
    res,
    msg: "Get words successfully",
    data,
  });
};

const getWordByWordId = (req, res) => {
  const wordId = req.params.wordId;

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
