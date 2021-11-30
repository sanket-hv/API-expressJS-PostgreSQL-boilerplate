import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { school, schoolId } from './school';
import type { student, studentId } from './student';

export interface classesAttributes {
  id: number;
  section: string;
  schoolCode: string;
  standard: number;
}

export type classesPk = "id";
export type classesId = classes[classesPk];
export type classesOptionalAttributes = "id";
export type classesCreationAttributes = Optional<classesAttributes, classesOptionalAttributes>;

export class classes extends Model<classesAttributes, classesCreationAttributes> implements classesAttributes {
  id!: number;
  section!: string;
  schoolCode!: string;
  standard!: number;

  // classes hasMany student via classId
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
  // classes belongsTo school via schoolCode
  schoolCode_school!: school;
  getSchoolCode_school!: Sequelize.BelongsToGetAssociationMixin<school>;
  setSchoolCode_school!: Sequelize.BelongsToSetAssociationMixin<school, schoolId>;
  createSchoolCode_school!: Sequelize.BelongsToCreateAssociationMixin<school>;

  static initModel(sequelize: Sequelize.Sequelize): typeof classes {
    classes.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schoolCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'school',
        key: 'code'
      }
    },
    standard: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'classes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "classes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return classes;
  }
}
