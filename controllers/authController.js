const User = require("../models/userModel");
const UserToken = require("../models/userToken_Model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { signToken, destroyToken, createUser } = require("../service/authService")
dotenv.config();


// exports.Signup = async (req, res) => {
//     const user = await User.create({
//       username: "admin",
//       password: "admin",
//       role: "admin",
//     });
//     await user.save();
//     console.log(user);
//     return res.json(user);
// };

exports.Register = async (req, res) => {
    // data = {
    //     "email": "tuan@gmail.com",
    //     "username": "anhtuan",
    //     "password": "anhtuan",
    //     "confPassword": "anhtuan",
    //     "fullname": "anhtuan",
    //     "phone": 99999999
    // };
    const { username, email, password, confPassword, fullname, phone } = req.body;
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
            const newUser = await createUser(username, email, password, fullname, phone);
            res.status(200).json({ msg: "Register success!",newUser });
        };
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
        return res.status(200).json({ msg: "Success!", accessToken, refreshToken });
    } catch (error) {
        res.status(404).json({ msg: "Error!" });
    }
}

exports.Logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const result = await destroyToken(refreshToken);
        return res.status(200).json({result});
    } catch (error) {
        console.log(error);
    }
}
