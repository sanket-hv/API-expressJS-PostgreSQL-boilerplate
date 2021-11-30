import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { assignmentChapter, assignmentChapterId } from './assignmentChapter';

export interface assignmentAttributes {
  id: number;
  difficulty: number;
  name: string;
}

export type assignmentPk = "id";
export type assignmentId = assignment[assignmentPk];
export type assignmentOptionalAttributes = "id";
export type assignmentCreationAttributes = Optional<assignmentAttributes, assignmentOptionalAttributes>;

export class assignment extends Model<assignmentAttributes, assignmentCreationAttributes> implements assignmentAttributes {
  id!: number;
  difficulty!: number;
  name!: string;

  // assignment hasMany assignmentChapter via assignmentId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof assignment {
    assignment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'assignment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "assignment_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return assignment;
  }
}
