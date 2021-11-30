import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { classes, classesId } from './classes';
import type { school, schoolId } from './school';

export interface studentAttributes {
  id: number;
  uid: string;
  name: string;
  email?: string;
  schoolCode: string;
  classId: number;
}

export type studentPk = "id";
export type studentId = student[studentPk];
export type studentOptionalAttributes = "id" | "email";
export type studentCreationAttributes = Optional<studentAttributes, studentOptionalAttributes>;

export class student extends Model<studentAttributes, studentCreationAttributes> implements studentAttributes {
  id!: number;
  uid!: string;
  name!: string;
  email?: string;
  schoolCode!: string;
  classId!: number;

  // student belongsTo classes via classId
  class!: classes;
  getClass!: Sequelize.BelongsToGetAssociationMixin<classes>;
  setClass!: Sequelize.BelongsToSetAssociationMixin<classes, classesId>;
  createClass!: Sequelize.BelongsToCreateAssociationMixin<classes>;
  // student belongsTo school via schoolCode
  schoolCode_school!: school;
  getSchoolCode_school!: Sequelize.BelongsToGetAssociationMixin<school>;
  setSchoolCode_school!: Sequelize.BelongsToSetAssociationMixin<school, schoolId>;
  createSchoolCode_school!: Sequelize.BelongsToCreateAssociationMixin<school>;

  static initModel(sequelize: Sequelize.Sequelize): typeof student {
    student.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
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
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'classes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'student',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "student_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return student;
  }
}
