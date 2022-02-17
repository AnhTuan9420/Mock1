const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const User = require("../models/userModel");
const ScoreBoard = require("../models/scoreModel");

exports.submit = async (user_id, totalScore) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: user_id
            }
        });
        const createScoreBoard = await ScoreBoard.create({
            score: totalScore,
            user_id: user.user_id,
        });
        return createScoreBoard;
    } catch (error) {
        console.log(error);
    }
};

exports.getScoreById = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: id
            },
            attributes: ["fullname", "email", "phone"],
            include: [
                {
                    model: ScoreBoard,
                    attributes: ["score"]
                },
            ]
        })
        return user;
    } catch (error) {
        console.log(error);
    }
};

exports.updateUserById = async (id, email, fullname, phone ) => {
    try {
        const updateInfo = await User.update({
            email: email,
            fullname: fullname,
            phone: phone
        }, {
            where: {
                user_id: id
            }
        });
        return updateInfo;
    } catch (error) {
        console.log(error);
    }
};

