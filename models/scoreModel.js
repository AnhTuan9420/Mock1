const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const Score = db.define('Score', {
    score_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    score: {
        type: DataTypes.INTEGER,
    },

});

module.exports = Score;