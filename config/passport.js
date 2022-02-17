const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtOptions = {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verifyToken = async (payload, done) => {
    try {
        const user = await User.findOne({
            where: { user_id: payload.user_id }
        });
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

// const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) return res.sendStatus(403);
//         req.userId = decoded.id;
//         // req.email = decoded.email;
//         console.log(decoded);
//         next();
//     })
// };

const jwtStrategy = new JwtStrategy(jwtOptions, verifyToken);

module.exports = {
    jwtStrategy,
};
