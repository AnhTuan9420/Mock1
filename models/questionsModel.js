const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const IncorrectAnswer = require("./incorrectAnswer_Model");
const CorrectAnswer = require("./correctAnswer_Model");
const UserAnswer = require("../models/userAnswer_Model")

const Question = db.define("Question", {
  question_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    unique: {
      args: true,
      msg: 'Question already in use!'
    },
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
});
Question.hasMany(CorrectAnswer, {
  targetKey: "question_id",
  foreignKey: "question_id",
});
Question.hasMany(IncorrectAnswer, {
  targetKey: "question_id",
  foreignKey: "question_id",
});

module.exports = Question;