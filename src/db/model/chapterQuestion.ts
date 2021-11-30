import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapter, chapterId } from './chapter';
import type { question, questionId } from './question';

export interface chapterQuestionAttributes {
  chapterId: number;
  questionId: number;
}

export type chapterQuestionCreationAttributes = chapterQuestionAttributes;

export class chapterQuestion extends Model<chapterQuestionAttributes, chapterQuestionCreationAttributes> implements chapterQuestionAttributes {
  chapterId!: number;
  questionId!: number;

  // chapterQuestion belongsTo chapter via chapterId
  chapter!: chapter;
  getChapter!: Sequelize.BelongsToGetAssociationMixin<chapter>;
  setChapter!: Sequelize.BelongsToSetAssociationMixin<chapter, chapterId>;
  createChapter!: Sequelize.BelongsToCreateAssociationMixin<chapter>;
  // chapterQuestion belongsTo question via questionId
  question!: question;
  getQuestion!: Sequelize.BelongsToGetAssociationMixin<question>;
  setQuestion!: Sequelize.BelongsToSetAssociationMixin<question, questionId>;
  createQuestion!: Sequelize.BelongsToCreateAssociationMixin<question>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chapterQuestion {
    chapterQuestion.init({
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapter',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'question',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'chapterQuestion',
    schema: 'public',
    timestamps: false
  });
  return chapterQuestion;
  }
}
