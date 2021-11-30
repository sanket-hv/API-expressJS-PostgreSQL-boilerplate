import { Includeable, WhereOptions } from "sequelize/types";

import dbClient from "../index";
import {
  chapterAttributes as chapterAttributes,
  chapterCreationAttributes as chapterCreationAttributes,
  chapter as Chapter,
} from "../model/init-models";

const createChapter = async (
  data: chapterCreationAttributes
): Promise<chapterAttributes> => {
  const transaction = await dbClient.transaction();
  try {
    const chapter = await Chapter.create(data, { transaction });
    await transaction.commit();
    return chapter;
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    throw error;
  }
};

const getAllChapters = async (
  filter: WhereOptions<Chapter>,
  include?: Includeable | Includeable[]
): Promise<Chapter[] | []> => {
  const chapterArray = await Chapter.findAll({
    where: filter,
    include,
  });
  return chapterArray;
};

export default {
  createChapter,
  getAllChapters,
};
