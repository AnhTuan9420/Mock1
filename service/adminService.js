const User = require("../models/userModel");
const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");


exports.createQuestion = async (content) => {
    try {
        const question = { content: content };
        const createQuestion = await Question.create(question);
        return createQuestion;
    } catch (error) {
        console.log(error);
    }
};

exports.createCorrectAnswer = async (content, question_id) => {
    try {
        const question = await Question.findOne({
            where: {
                question_id: question_id
            }
        });
        const createCA = await CorrectAnswer.create({
            content: content,
            question_id: question.question_id
        });
        return createCA;
    } catch (error) {
        console.log(error);
    }
};

exports.createInCorrectAnswer = async (content, question_id) => {
    try {
        const question = await Question.findOne({
            where: {
                question_id: question_id
            }
        });
        const createICA = await InCorrectAnswer.create({
            content: content,
            question_id: question.question_id
        });
        return createICA;
    } catch (error) {
        console.log(error);
    }
};

exports.deleteQ = async (id) => {
    try {
        const question = await Question.findOne({
            where: { question_id: id }
        });
        const result = await question.destroy();
        const correctAnswerUpdate = await CorrectAnswer.findOne({question_id: question.question_id}); 
        const resultCA = await correctAnswerUpdate.destroy();
        const inCorrectAnswerUpdate = await InCorrectAnswer.findOne({question_id: question.question_id});
        const resultICA = await inCorrectAnswerUpdate.destroy();
        return { result, resultCA, resultICA };
    } catch (error) {
        console.log(error);
    }
};



