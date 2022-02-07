const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const User = require('../models/userModel')

const UserToken = db.define('UserToken', {
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM(['refreshToken', 'accessToken']),
        defaultValue: 'accessToken',
    },
    data_token: {
        type: DataTypes.TEXT
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// User.hasMany(UserToken, {
//     targetKey: "user_id",
//     foreignKey: "token_id",
// });

// UserToken.associate = function (models) {
//     UserToken.belongsTo(models.User, {
//         as: 'user',
//         targetKey: 'id',
//         foreignKey: 'userId',
//     });
// };

module.exports = UserToken;
