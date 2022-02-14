const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const User = require("../models/userModel");
const ScoreBoard = require("../models/scoreModel");


exports.submit = async (user_id, score) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: user_id
            }
        });
        const createScoreBoard = await ScoreBoard.create({
            score: score,
            user_id: user.user_id,
        });
        return { createScoreBoard };
    } catch (error) {
        console.log(error);
    }
};