const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken_Model")
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.id;
        // req.email = decoded.email;
        // console.log(err, decoded);
        next();
    })
};

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if (!refreshToken) return res.sendStatus(401);
        // const userToken = await UserToken.findOne({
        //     where: {
        //         data_token
        //     }
        // });
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign({ userId: user.id, username: user.username, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
};
