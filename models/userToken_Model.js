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
        type: DataTypes.ENUM(['refreshToken', 'expired']),
        defaultValue: 'refreshToken',
    },
    data_token: {
        type: DataTypes.TEXT
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// UserToken.associate = function (models) {
//     UserToken.belongsTo(models.User, {
//         as: 'user',
//         targetKey: 'id',
//         foreignKey: 'userId',
//     });
// };

module.exports = UserToken;
