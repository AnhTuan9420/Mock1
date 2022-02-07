const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

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

module.exports = userAnswer;