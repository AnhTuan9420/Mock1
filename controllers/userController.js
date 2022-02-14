const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const ScoreBoard = require("../models/scoreModel");
const User = require("../models/userModel");
const { Sequelize } = require('sequelize');
// const { submit } = require("../service/userService");

exports.getRandomQuestions = async (req, res) => {
    try {
        const listOfQuestion = await Question.findAll({
            order: Sequelize.literal('random()')
            ,
            limit: 10,
            include: [
                {
                    model: CorrectAnswer,
                    attributes: ["question_id", "content"]
                },
                {
                    model: InCorrectAnswer,
                    attributes: ["question_id", "content"]
                },
            ]
        })
        return res.status(200).json(listOfQuestion);
    } catch (error) {
        console.log(error);
    }
};

exports.submitQuestion = async (req, res) => {
    const { answers } = req.body;
    const correct = [];
    const id = 2;
    try {
        const user = await User.findOne({
            where: {
                user_id: id
            }
        });
        const correctAnswer = await CorrectAnswer.findAll({
            attributes: ["question_id", "content"]
        });
        correctAnswer.filter((item) => {
            correct.push(item.dataValues);
        });

        const checkResult = correct.filter((a) =>
            answers.some((b) => {
                return a.question_id === b.question_id && a.content === b.content;
            }
        ));
        const totalScore = checkResult.length * 10;

        const createScoreBoard = await ScoreBoard.create({
            score: totalScore,
            user_id: user.user_id,
        });

        // const result = await submit(score, id);

        return res.status(200).json({ createScoreBoard, totalScore });
    } catch (error) {
        console.log(error);
    }
};

exports.getScoreBoard = async (req, res) => {
    const { id } = req.params;
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
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
};



