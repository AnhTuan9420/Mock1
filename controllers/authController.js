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
        const userId = user.user_id;
        const username = user.username;
        const email = user.email;
        const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
        });
        const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        // const userToken = await userToken.findAll({})
        // await userToken.update({ data_token: refreshToken }, {
        //     where: {
        //         id: userId
        //     }
        // });
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // });
        res.json({ accessToken });
        res.json({ refreshToken });
        res.status(200).json({ msg: "Success!" });
    } catch (error) {
        res.status(404).json({ msg: "Error!" });
    }
}

exports.Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

