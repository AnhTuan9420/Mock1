const Question = require("../models/questionsModel");
const InCorrectAnswer = require("../models/incorrectAnswer_Model");
const CorrectAnswer = require("../models/correctAnswer_Model");
const ScoreBoard = require("../models/scoreModel");
const User = require("../models/userModel");
const UserToken = require("../models/userToken_Model");
const { Sequelize } = require('sequelize');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { signToken } = require("../service/authService");
dotenv.config();
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

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) return res.sendStatus(401).json({ msg: "Error!" });;
        const user = await UserToken.findOne({
            where: {
                data_token: refreshToken
            }
        });
        if (!user) return res.sendStatus(403).json({ msg: "Token not found!" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            console.log("--------------------------------------------", decoded)
            if (err) return res.sendStatus(403).json({ msg: "Expired" });;

            // const { accessToken, refToken } = await signToken(user);
            // const newToken = await UserToken.update({ data_token: refToken, user_id: user.user_id});
            // return res.sendStatus(200).json({ msg: "Success!", accessToken, refreshToken });

            const accessToken = jwt.sign({ userId: decoded.user_id, username: decoded.username, email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1m'
            });
            const refreshToken = jwt.sign({ userId: decoded.user_id, username: decoded.username, email: decoded.email }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            console.log({ accessToken, refreshToken });
            const newToken = await UserToken.update({ data_token: refreshToken }, { where: { token_id: user.token_id } });
            res.json({ accessToken, refreshToken, newToken });
        });
    } catch (error) {
        console.log(error);
    }
};
