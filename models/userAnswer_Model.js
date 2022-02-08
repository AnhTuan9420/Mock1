const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Question = require("../models/questionsModel");
const User = require("../models/userModel");

const userAnswer = db.define('userAnswer', {
    user_answer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Question.hasMany(userAnswer, {
    targetKey: "question_id",
    foreignKey: "question_id",
  });

module.exports = userAnswer;