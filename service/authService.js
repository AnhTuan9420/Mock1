const User = require("../models/userModel");
const UserToken = require("../models/userToken_Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
dotenv.config();


exports.signToken = async (user) => {
    try {
        // sign token
        const accessToken = jwt.sign({ userId: user.user_id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = jwt.sign({ userId: user.user_id, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
};

exports.destroyToken = async (val) => {
    try {
        const token = await UserToken.findOne({
            where: {
                data_token: val
            }
        });
        if (token) {
            const result = await token.destroy({
                where: {
                    [Op.or]: [{ user_id: val }, { data_token: val }]
                },
            });
            return result;
        }
    } catch (error) {
        console.log(error);
    }
};

exports.createUser = async (username, email, password, fullname, phone) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPassword,
            fullname: fullname,
            phone: phone
        });
        return newUser;
    } catch (error) {
        console.log(error);
    }
};
