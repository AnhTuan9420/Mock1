const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const ScoreBoard = require("../models/scoreModel");
const { Sequelize } = require('sequelize');

exports.getRandomQuestions = async (req, res) => {
    try {
        const listOfQuestion = await Question.findAll({
            order: Sequelize.literal('random()')
            ,
            limit: 10
        })
        // console.log(listOfQuestion);
        return res.status(200).json(listOfQuestion);
    } catch (error) {
        console.log(error);
    }
};

