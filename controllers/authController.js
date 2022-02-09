const User = require("../models/userModel");
const UserToken = require("../models/userToken_Model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { signToken, destroyToken, createUser } = require("../service/authService")
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
    //     'email': 'tuan@gmail.com',
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
            // const newUser = await createUser(usr);
            // return res.json({msg: "Create User succses!!" , newUser})
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
        const { accessToken, refreshToken } = await signToken(user);
        const newToken = await UserToken.create({data_token: refreshToken, user_id: user.user_id});
        return res.status(200).json({ msg: "Success!", accessToken, refreshToken , newToken });
    } catch (error) {
        res.status(404).json({ msg: "Error!" });
    }
}

exports.Logout = async (req, res) => {
    try {
        const refreshToken = data || req.body;
        const result = await destroyToken(refreshToken);
        return res.status(200).json({ msg: "Success!", result});
    } catch (error) {
        console.log(error);
    }
}
