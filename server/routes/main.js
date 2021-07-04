import express from "express";
import { createWordType, getWordTypes } from "../controllers/wordType.js";
import { createUser, login } from "../controllers/user.js";
import {
  createWord,
  getWords,
  getWordsByEN,
  getWordByWordId,
  getWordsByVN,
} from "../controllers/word.js";

const router = express.Router();
//word type
router.post("/wordTypes", createWordType);
router.get("/wordTypes", getWordTypes);
//user
router.post("/register", createUser);
router.post("/login", login);
//word
router.post("/words", createWord);
router.get("/words", getWords);
router.get("/wordsByEN/:keyWord", getWordsByEN);
router.get("/wordsByWordId/:wordId", getWordByWordId);
router.get("/wordsByVN/:keyWord", getWordsByVN);

export default router;
