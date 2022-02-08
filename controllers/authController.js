const User = require("../models/userModel");
const UserToken = require("../models/userToken_Model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


exports.getUser = async (req, res) => {
    try {
        const user = await User.findAll({
            attributes: ['user_id', 'username','fullname', 'email']
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

exports.Register = async (req, res) => {
    // data = {
    //     'email': 'anhtuan@gmail.com',
    //     'username': "anhtuan",
    //     'password': 'anhtuan',
    //     'confPassword': 'anhtuan',
    //     'fullname': 'anhtuan',
    //     'phone': 99999999
    // };
    const { username, email, password, confPassword, fullname, phone } = data || req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const usr = await User.findOne({
            where: {
                username: username
            }
        });
        if (usr) {
            return res.status(400).json({ msg: "Username has already existed !" });
        } else if (password !== confPassword) {
            return res.status(400).json({ msg: "Confirm Password Error!" });
        } else {
            const newUser = await User.create({
                username: username,
                email: email,
                password: hashPassword,
                fullname: fullname,
                phone: phone
            });
            console.log(newUser);
        };
        res.status(200).json({ msg: "Register success!" });
    } catch (error) {
        console.log(error);
    };
}

exports.Login = async (req, res) => {
    try {
        // const { username, password } = data || req.body;
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(!user){
            return res.status(400).json({ msg: "The username does not exist or has been locked !!!" });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match){ 
            return res.status(400).json({ msg: "Wrong Password" });
        }
        const accessToken = jwt.sign({ userId: user.user_id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = jwt.sign({ userId: user.user_id, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const newToken = await UserToken.create({data_token: refreshToken, user_id: user.user_id});
        console.log(newToken);
        res.status(200).json({ msg: "Success!", accessToken, refreshToken });
    } catch (error) {
        res.status(404).json({ msg: "Error!" });
    }
}

exports.Logout = async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(204);
    const userToken = await UserToken.findAll({
        where: {
            data_token: refreshToken
        }
    });
    if (!userToken) return res.sendStatus(204);
    const token_id = userToken.id;
    await UserToken.update({ data_token: null }, {
        where: {
            id: token_id
        }
    });
    // res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

