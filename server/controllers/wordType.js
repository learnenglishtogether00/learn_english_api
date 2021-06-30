import WordType from "../models/wordType.js";
import { successRes, errRes } from "../../utils/server.js";

const createWordType = (req, res) => {
  const wordType = new WordType({
    name: req.body.name,
  });

  return wordType
    .save()
    .then((newWordType) => {
      return successRes({
        res,
        msg: "New wordType created successfully",
        data: newWordType,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

const getWordTypes = (req, res) => {
  return WordType.find()
    .then((wordTypes) => {
      return successRes({
        res,
        msg: "Get wordTypes successfully",
        data: wordTypes,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

export { createWordType, getWordTypes };
