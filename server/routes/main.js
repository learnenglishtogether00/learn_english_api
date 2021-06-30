import express from "express";
import { createWordType, getWordTypes } from "../controllers/wordType.js";
import { createUser, login } from "../controllers/user.js";

const router = express.Router();
//word type
router.post("/wordTypes", createWordType);
router.get("/wordTypes", getWordTypes);
//user
router.post("/register", createUser);
router.post("/login", login);

export default router;
