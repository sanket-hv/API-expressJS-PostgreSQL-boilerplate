import { Request, Response } from "express";

import Services from "../db/services";

export const getChapters = async (req: Request, res: Response) => {
  try {
    const chapters = await Services.ChapterServices.getAllChapters({});
    return res
      .status(200)
      .json({ status: true, message: "Chapters Founded", data: chapters });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const createChapter = async (req: Request, res: Response) => {
  try {
    const chapter = await Services.ChapterServices.createChapter(req.body);
    return res
      .status(200)
      .json({ status: true, message: "Chapters Created", data: chapter });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
