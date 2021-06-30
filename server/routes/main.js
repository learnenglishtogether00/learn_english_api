import express from "express";
import { createWordType, getWordTypes } from "../controllers/wordType.js";

const router = express.Router();
router.post("/wordTypes", createWordType);
router.get("/wordTypes", getWordTypes);

export default router;
