const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const { createQuestion, createCorrectAnswer, createInCorrectAnswer, deleteQ } = require("../service/adminService");

exports.newQuestion = async (req, res) => {
    const { content } = req.body;
    try {
        const Question = await createQuestion(content);
        return res.json({ msg: "Create question Success!", Question })
    } catch (error) {
        console.log(error);
    }
}

exports.newCorrectAnswer = async (req, res) => {
    const { content, question_id } = req.body;
    try {
        const correctAnswer = await createCorrectAnswer(content, question_id);
        return res.status(200).json({ msg: "Create Correct Answer success!!", correctAnswer });
    } catch (error) {
        console.log(error);
    }
};

exports.newInCorrectAnswer = async (req, res) => {
    const { content, question_id } = req.body;
    try {
        const inCorrectAnswer = await createInCorrectAnswer(content, question_id);
        return res.status(200).json({ msg: "Create In Correct Answer success!!", inCorrectAnswer });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await deleteQ(id);
        return res.status(200).json({ msg: "Delete success!!", result });
    } catch (error) {
        console.log(error);
    }
}

exports.getDetailQuestion = async (req, res) => {
    const { id } = data || req.params.id;
    try {
        const listQuestion = await Question.findOne({
            where: { question_id: id }
        });
        const correctAnswerUpdate = await CorrectAnswer.findAll({where: { question_id: listQuestion.question_id }});
        const inCorrectAnswerUpdate = await InCorrectAnswer.findAll({where: { question_id: listQuestion.question_id }});
        return res.json({listQuestion, correctAnswerUpdate, inCorrectAnswerUpdate});
    } catch (error) {
        console.log(error);
    }
};




