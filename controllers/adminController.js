const User = require("../models/userModel");
const Question = require("../models/questionsModel");
const IncorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");

exports.newQuestion = async (req, res) => {
    const { content } = data || req.body;
    try {
        const question = { content: content }
        const createQuestion = await Question.create(question);
        // const saveQuestion = await createQuestion.save();
        console.log(createQuestion);
    } catch (error) {
        console.log(error);
    }
}