import type { Sequelize } from "sequelize";
import { assignment } from "./assignment";
import type { assignmentAttributes, assignmentCreationAttributes } from "./assignment";
import { assignmentChapter } from "./assignmentChapter";
import type { assignmentChapterAttributes, assignmentChapterCreationAttributes } from "./assignmentChapter";
import { chapter } from "./chapter";
import type { chapterAttributes, chapterCreationAttributes } from "./chapter";
import { chapterQuestion } from "./chapterQuestion";
import type { chapterQuestionAttributes, chapterQuestionCreationAttributes } from "./chapterQuestion";
import { classes } from "./classes";
import type { classesAttributes, classesCreationAttributes } from "./classes";
import { question } from "./question";
import type { questionAttributes, questionCreationAttributes } from "./question";
import { school } from "./school";
import type { schoolAttributes, schoolCreationAttributes } from "./school";
import { student } from "./student";
import type { studentAttributes, studentCreationAttributes } from "./student";

export {
  assignment,
  assignmentChapter,
  chapter,
  chapterQuestion,
  classes,
  question,
  school,
  student,
};

export type {
  assignmentAttributes,
  assignmentCreationAttributes,
  assignmentChapterAttributes,
  assignmentChapterCreationAttributes,
  chapterAttributes,
  chapterCreationAttributes,
  chapterQuestionAttributes,
  chapterQuestionCreationAttributes,
  classesAttributes,
  classesCreationAttributes,
  questionAttributes,
  questionCreationAttributes,
  schoolAttributes,
  schoolCreationAttributes,
  studentAttributes,
  studentCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  assignment.initModel(sequelize);
  assignmentChapter.initModel(sequelize);
  chapter.initModel(sequelize);
  chapterQuestion.initModel(sequelize);
  classes.initModel(sequelize);
  question.initModel(sequelize);
  school.initModel(sequelize);
  student.initModel(sequelize);

  assignmentChapter.belongsTo(assignment, { as: "assignment", foreignKey: "assignmentId"});
  assignment.hasMany(assignmentChapter, { as: "assignmentChapters", foreignKey: "assignmentId"});
  assignmentChapter.belongsTo(chapter, { as: "chapter", foreignKey: "chapterId"});
  chapter.hasMany(assignmentChapter, { as: "assignmentChapters", foreignKey: "chapterId"});
  chapterQuestion.belongsTo(chapter, { as: "chapter", foreignKey: "chapterId"});
  chapter.hasMany(chapterQuestion, { as: "chapterQuestions", foreignKey: "chapterId"});
  student.belongsTo(classes, { as: "class", foreignKey: "classId"});
  classes.hasMany(student, { as: "students", foreignKey: "classId"});
  chapterQuestion.belongsTo(question, { as: "question", foreignKey: "questionId"});
  question.hasMany(chapterQuestion, { as: "chapterQuestions", foreignKey: "questionId"});
  chapter.belongsTo(school, { as: "schoolCode_school", foreignKey: "schoolCode"});
  school.hasMany(chapter, { as: "chapters", foreignKey: "schoolCode"});
  classes.belongsTo(school, { as: "schoolCode_school", foreignKey: "schoolCode"});
  school.hasMany(classes, { as: "classes", foreignKey: "schoolCode"});
  student.belongsTo(school, { as: "schoolCode_school", foreignKey: "schoolCode"});
  school.hasMany(student, { as: "students", foreignKey: "schoolCode"});

  return {
    assignment: assignment,
    assignmentChapter: assignmentChapter,
    chapter: chapter,
    chapterQuestion: chapterQuestion,
    classes: classes,
    question: question,
    school: school,
    student: student,
  };
}
