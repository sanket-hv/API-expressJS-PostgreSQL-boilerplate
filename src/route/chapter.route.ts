import { Router } from "express";
import { createChapter, getChapters } from "../controller/chapter.controller";

const router = Router();

// Get ALL Chapters
router.get("/", getChapters);

// Create Chapter
router.post("/", createChapter);

export default router;
