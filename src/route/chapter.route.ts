import { Router } from "express";
import { getChapters, createChapter } from "../controller";

const router = Router();

// Get ALL Chapters
router.get("/", getChapters);

// Create Chapter
router.post("/", createChapter);

export default router;
