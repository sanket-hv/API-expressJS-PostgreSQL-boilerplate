import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { assignment, assignmentId } from './assignment';
import type { chapter, chapterId } from './chapter';

export interface assignmentChapterAttributes {
  assignmentId: number;
  chapterId: number;
}

export type assignmentChapterCreationAttributes = assignmentChapterAttributes;

export class assignmentChapter extends Model<assignmentChapterAttributes, assignmentChapterCreationAttributes> implements assignmentChapterAttributes {
  assignmentId!: number;
  chapterId!: number;

  // assignmentChapter belongsTo assignment via assignmentId
  assignment!: assignment;
  getAssignment!: Sequelize.BelongsToGetAssociationMixin<assignment>;
  setAssignment!: Sequelize.BelongsToSetAssociationMixin<assignment, assignmentId>;
  createAssignment!: Sequelize.BelongsToCreateAssociationMixin<assignment>;
  // assignmentChapter belongsTo chapter via chapterId
  chapter!: chapter;
  getChapter!: Sequelize.BelongsToGetAssociationMixin<chapter>;
  setChapter!: Sequelize.BelongsToSetAssociationMixin<chapter, chapterId>;
  createChapter!: Sequelize.BelongsToCreateAssociationMixin<chapter>;

  static initModel(sequelize: Sequelize.Sequelize): typeof assignmentChapter {
    assignmentChapter.init({
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assignment',
        key: 'id'
      }
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapter',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'assignmentChapter',
    schema: 'public',
    timestamps: false
  });
  return assignmentChapter;
  }
}
