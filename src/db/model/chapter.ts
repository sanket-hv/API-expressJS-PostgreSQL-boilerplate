import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { assignmentChapter, assignmentChapterId } from './assignmentChapter';
import type { chapterQuestion, chapterQuestionId } from './chapterQuestion';
import type { school, schoolId } from './school';

export interface chapterAttributes {
  id: number;
  subject: string;
  standard: number;
  name: string;
  thumbnail?: string;
  schoolCode: string;
}

export type chapterPk = "id";
export type chapterId = chapter[chapterPk];
export type chapterOptionalAttributes = "id" | "thumbnail";
export type chapterCreationAttributes = Optional<chapterAttributes, chapterOptionalAttributes>;

export class chapter extends Model<chapterAttributes, chapterCreationAttributes> implements chapterAttributes {
  id!: number;
  subject!: string;
  standard!: number;
  name!: string;
  thumbnail?: string;
  schoolCode!: string;

  // chapter hasMany assignmentChapter via chapterId
  assignmentChapters!: assignmentChapter[];
  getAssignmentChapters!: Sequelize.HasManyGetAssociationsMixin<assignmentChapter>;
  setAssignmentChapters!: Sequelize.HasManySetAssociationsMixin<assignmentChapter, assignmentChapterId>;
  addAssignmentChapter!: Sequelize.HasManyAddAssociationMixin<assignmentChapter, assignmentChapterId>;
  addAssignmentChapters!: Sequelize.HasManyAddAssociationsMixin<assignmentChapter, assignmentChapterId>;
  createAssignmentChapter!: Sequelize.HasManyCreateAssociationMixin<assignmentChapter>;
  removeAssignmentChapter!: Sequelize.HasManyRemoveAssociationMixin<assignmentChapter, assignmentChapterId>;
  removeAssignmentChapters!: Sequelize.HasManyRemoveAssociationsMixin<assignmentChapter, assignmentChapterId>;
  hasAssignmentChapter!: Sequelize.HasManyHasAssociationMixin<assignmentChapter, assignmentChapterId>;
  hasAssignmentChapters!: Sequelize.HasManyHasAssociationsMixin<assignmentChapter, assignmentChapterId>;
  countAssignmentChapters!: Sequelize.HasManyCountAssociationsMixin;
  // chapter hasMany chapterQuestion via chapterId
  chapterQuestions!: chapterQuestion[];
  getChapterQuestions!: Sequelize.HasManyGetAssociationsMixin<chapterQuestion>;
  setChapterQuestions!: Sequelize.HasManySetAssociationsMixin<chapterQuestion, chapterQuestionId>;
  addChapterQuestion!: Sequelize.HasManyAddAssociationMixin<chapterQuestion, chapterQuestionId>;
  addChapterQuestions!: Sequelize.HasManyAddAssociationsMixin<chapterQuestion, chapterQuestionId>;
  createChapterQuestion!: Sequelize.HasManyCreateAssociationMixin<chapterQuestion>;
  removeChapterQuestion!: Sequelize.HasManyRemoveAssociationMixin<chapterQuestion, chapterQuestionId>;
  removeChapterQuestions!: Sequelize.HasManyRemoveAssociationsMixin<chapterQuestion, chapterQuestionId>;
  hasChapterQuestion!: Sequelize.HasManyHasAssociationMixin<chapterQuestion, chapterQuestionId>;
  hasChapterQuestions!: Sequelize.HasManyHasAssociationsMixin<chapterQuestion, chapterQuestionId>;
  countChapterQuestions!: Sequelize.HasManyCountAssociationsMixin;
  // chapter belongsTo school via schoolCode
  schoolCode_school!: school;
  getSchoolCode_school!: Sequelize.BelongsToGetAssociationMixin<school>;
  setSchoolCode_school!: Sequelize.BelongsToSetAssociationMixin<school, schoolId>;
  createSchoolCode_school!: Sequelize.BelongsToCreateAssociationMixin<school>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chapter {
    chapter.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    standard: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    schoolCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'school',
        key: 'code'
      }
    }
  }, {
    sequelize,
    tableName: 'chapter',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chapter_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return chapter;
  }
}
