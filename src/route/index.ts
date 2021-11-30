import { Router } from "express";

import ChapterRoutes from "./chapter.route";

const router = Router();

router.use("/chapter", ChapterRoutes);

export default router;
