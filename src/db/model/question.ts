import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapterQuestion, chapterQuestionId } from './chapterQuestion';

export interface questionAttributes {
  id: number;
  difficulty: number;
  type: string;
  questionPoints: number;
  questionText: string;
  questionTextPhoneme: string;
  accuracyThreshold: number;
  speechMp3: string;
  glossaryWords: string[];
  exploreMore: string;
  ignoreWords: string[];
}

export type questionPk = "id";
export type questionId = question[questionPk];
export type questionOptionalAttributes = "id";
export type questionCreationAttributes = Optional<questionAttributes, questionOptionalAttributes>;

export class question extends Model<questionAttributes, questionCreationAttributes> implements questionAttributes {
  id!: number;
  difficulty!: number;
  type!: string;
  questionPoints!: number;
  questionText!: string;
  questionTextPhoneme!: string;
  accuracyThreshold!: number;
  speechMp3!: string;
  glossaryWords!: string[];
  exploreMore!: string;
  ignoreWords!: string[];

  // question hasMany chapterQuestion via questionId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof question {
    question.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionPoints: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionTextPhoneme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accuracyThreshold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speechMp3: {
      type: DataTypes.STRING,
      allowNull: false
    },
    glossaryWords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    exploreMore: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ignoreWords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'question',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "question_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return question;
  }
}
