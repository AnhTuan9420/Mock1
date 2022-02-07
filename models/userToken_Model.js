const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');

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
});

// UserToken.associate = function (models) {
//     UserToken.belongsTo(models.User, {
//         as: 'user',
//         targetKey: 'id',
//         foreignKey: 'userId',
//     });
// };

module.exports = UserToken;
