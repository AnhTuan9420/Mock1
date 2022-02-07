const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const IncorrectAnswer = require("./incorrectAnswer_Model");
const CorrectAnswer = require("./correctAnswer_Model");

const Question = db.define("Question", {
  question_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
});
Question.hasMany(CorrectAnswer, {
  foreignKey: "correct_answers_id",
});
Question.hasMany(IncorrectAnswer, {
  foreignKey: "incorrect_answers_id",
});

module.exports = Question;