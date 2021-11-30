import type { Sequelize } from "sequelize";
import { chapter } from "./chapter";
import type { chapterAttributes, chapterCreationAttributes } from "./chapter";

export { chapter };

export type { chapterAttributes, chapterCreationAttributes };

export function initModels(sequelize: Sequelize) {
  chapter.initModel(sequelize);

  return {
    chapter: chapter,
  };
}
