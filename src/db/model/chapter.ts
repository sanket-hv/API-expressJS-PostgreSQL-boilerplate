import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface chapterAttributes {
  id: number;
  subject: string;
  standard: number;
  name: string;
  thumbnail?: string;
}

export type chapterPk = "id";
export type chapterId = chapter[chapterPk];
export type chapterOptionalAttributes = "id" | "thumbnail";
export type chapterCreationAttributes = Optional<
  chapterAttributes,
  chapterOptionalAttributes
>;

export class chapter
  extends Model<chapterAttributes, chapterCreationAttributes>
  implements chapterAttributes
{
  id!: number;
  subject!: string;
  standard!: number;
  name!: string;
  thumbnail?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof chapter {
    chapter.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        subject: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        standard: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        thumbnail: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "chapter",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "chapter_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return chapter;
  }
}
