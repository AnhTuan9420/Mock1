const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const CorrectAnswer = db.define("CorrectAnswer", {
    correct_answers_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
    },
});

module.exports = CorrectAnswer;