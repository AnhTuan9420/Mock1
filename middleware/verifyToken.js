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

