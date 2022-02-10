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

exports.deleteCA = async (id) => {
    try {
        const deleteCA = await CorrectAnswer.findOne({
            where: { correct_answers_id: id }
        });
        const result = await deleteCA.destroy();
        return result;
    } catch (error) {
        console.log(error);
    }
}

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

exports.deleteICA = async (id) => {
    try {
        const deleteICA = await InCorrectAnswer.findOne({
            where: { incorrect_answers_id: id }
        });
        const result = await deleteICA.destroy();
        return result;
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
        const correctAnswerUpdate = await CorrectAnswer.findOne({
            where: { question_id: question.question_id }
        });
        const resultCA = await correctAnswerUpdate.destroy();
        const inCorrectAnswerUpdate = await InCorrectAnswer.findOne({
            where: { question_id: question.question_id }
        });
        const resultICA = await inCorrectAnswerUpdate.destroy();
        return { result, resultCA, resultICA };
    } catch (error) {
        console.log(error);
    }
};

exports.detailQuestion = async (id) => {
    try {
        const listQuestion = await Question.findOne({
            where: { question_id: id }
        });
        const correctAnswerUpdate = await CorrectAnswer.findAll({ where: { question_id: listQuestion.question_id } });
        const inCorrectAnswerUpdate = await InCorrectAnswer.findAll({ where: { question_id: listQuestion.question_id } });
        return { listQuestion, correctAnswerUpdate, inCorrectAnswerUpdate };
    } catch (error) {
        console.log(error);
    }
};

exports.updateQ = async (id, content) => {
    try {
        const update = await Question.update({
            content: content
        }, {
            where: {
                question_id: id
            }
        });
        return update;
    } catch (error) {
        console.log(error);
    }
};

