import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapter, chapterId } from './chapter';
import type { classes, classesId } from './classes';
import type { student, studentId } from './student';

export interface schoolAttributes {
  id: number;
  code: string;
  logo?: string;
  username: string;
  password: string;
}

export type schoolPk = "id";
export type schoolId = school[schoolPk];
export type schoolOptionalAttributes = "id" | "logo";
export type schoolCreationAttributes = Optional<schoolAttributes, schoolOptionalAttributes>;

export class school extends Model<schoolAttributes, schoolCreationAttributes> implements schoolAttributes {
  id!: number;
  code!: string;
  logo?: string;
  username!: string;
  password!: string;

  // school hasMany chapter via schoolCode
  chapters!: chapter[];
  getChapters!: Sequelize.HasManyGetAssociationsMixin<chapter>;
  setChapters!: Sequelize.HasManySetAssociationsMixin<chapter, chapterId>;
  addChapter!: Sequelize.HasManyAddAssociationMixin<chapter, chapterId>;
  addChapters!: Sequelize.HasManyAddAssociationsMixin<chapter, chapterId>;
  createChapter!: Sequelize.HasManyCreateAssociationMixin<chapter>;
  removeChapter!: Sequelize.HasManyRemoveAssociationMixin<chapter, chapterId>;
  removeChapters!: Sequelize.HasManyRemoveAssociationsMixin<chapter, chapterId>;
  hasChapter!: Sequelize.HasManyHasAssociationMixin<chapter, chapterId>;
  hasChapters!: Sequelize.HasManyHasAssociationsMixin<chapter, chapterId>;
  countChapters!: Sequelize.HasManyCountAssociationsMixin;
  // school hasMany classes via schoolCode
  classes!: classes[];
  getClasses!: Sequelize.HasManyGetAssociationsMixin<classes>;
  setClasses!: Sequelize.HasManySetAssociationsMixin<classes, classesId>;
  addClass!: Sequelize.HasManyAddAssociationMixin<classes, classesId>;
  addClasses!: Sequelize.HasManyAddAssociationsMixin<classes, classesId>;
  createClass!: Sequelize.HasManyCreateAssociationMixin<classes>;
  removeClass!: Sequelize.HasManyRemoveAssociationMixin<classes, classesId>;
  removeClasses!: Sequelize.HasManyRemoveAssociationsMixin<classes, classesId>;
  hasClass!: Sequelize.HasManyHasAssociationMixin<classes, classesId>;
  hasClasses!: Sequelize.HasManyHasAssociationsMixin<classes, classesId>;
  countClasses!: Sequelize.HasManyCountAssociationsMixin;
  // school hasMany student via schoolCode
  students!: student[];
  getStudents!: Sequelize.HasManyGetAssociationsMixin<student>;
  setStudents!: Sequelize.HasManySetAssociationsMixin<student, studentId>;
  addStudent!: Sequelize.HasManyAddAssociationMixin<student, studentId>;
  addStudents!: Sequelize.HasManyAddAssociationsMixin<student, studentId>;
  createStudent!: Sequelize.HasManyCreateAssociationMixin<student>;
  removeStudent!: Sequelize.HasManyRemoveAssociationMixin<student, studentId>;
  removeStudents!: Sequelize.HasManyRemoveAssociationsMixin<student, studentId>;
  hasStudent!: Sequelize.HasManyHasAssociationMixin<student, studentId>;
  hasStudents!: Sequelize.HasManyHasAssociationsMixin<student, studentId>;
  countStudents!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof school {
    school.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "school_code_key"
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "school_username_key"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'school',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "school_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "school_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "school_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  return school;
  }
}
