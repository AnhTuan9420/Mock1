const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const IncorrectAnswer = db.define("IncorrectAnswer", {
    incorrect_answers_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = IncorrectAnswer;